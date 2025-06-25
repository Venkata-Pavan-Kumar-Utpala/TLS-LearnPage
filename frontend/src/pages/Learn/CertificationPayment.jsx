import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Shield, 
  CreditCard, 
  CheckCircle, 
  Clock,
  Users,
  Star,
  Award,
  Lock,
  Smartphone,
  Wallet,
  Building
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAuthModalContext } from '../../context/AuthModalContext';
import { paymentAPI, progressAPI, courseAPI } from '../../services/api';

const CertificationPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user } = useAuth();
  const { openLogin } = useAuthModalContext();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [eligibilityData, setEligibilityData] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const [certification, setCertification] = useState(null);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: '',
    name: user?.firstName || ''
  });

  const certificationId = searchParams.get('id');
  const courseId = searchParams.get('courseId') || certificationId;

  // Calculate user XP from progress data
  const userXP = userProgress ? (userProgress.totalCourseXP + userProgress.totalExerciseXP) : 0;

  // Fetch eligibility, user progress, and certification data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch certification details
        if (courseId) {
          const courseData = await courseAPI.getCourse(courseId);
          setCertification({
            id: courseData._id,
            title: courseData.title,
            description: courseData.description || "Master the fundamentals and advanced concepts",
            duration: "12 weeks",
            level: courseData.level || "Intermediate",
            price: 4999,
            originalPrice: 7999,
            rating: 4.8,
            studentsEnrolled: Math.floor(Math.random() * 2000) + 1000,
            features: [
              "Live project-based learning",
              "Industry mentor guidance",
              "Portfolio development",
              "Job placement assistance",
              "Lifetime access to materials",
              "Certificate of completion",
              "24/7 community support"
            ]
          });
        }

        if (isAuthenticated && user?._id && courseId) {
          // Fetch user progress
          const progressData = await progressAPI.getUserProgress(user._id);
          setUserProgress(progressData);

          // Fetch eligibility data
          const eligibility = await paymentAPI.checkEligibility(user._id, courseId);
          setEligibilityData(eligibility);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user, courseId]);

  // Default certification data for fallback
  const defaultCertification = {
    id: 1,
    title: "Certification Program",
    description: "Complete the course requirements to earn your certification",
    duration: "12 weeks",
    level: "Intermediate",
    price: 4999,
    originalPrice: 7999,
    rating: 4.8,
    studentsEnrolled: 2847,
    features: [
      "Live project-based learning",
      "Industry mentor guidance",
      "Portfolio development",
      "Job placement assistance",
      "Lifetime access to materials",
      "Certificate of completion",
      "24/7 community support"
    ]
  };

  const currentCertification = certification || defaultCertification;

  const paymentOptions = [
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Secure payment with UPI',
      price: currentCertification.price,
      icon: Smartphone,
      color: 'blue',
      recommended: true
    },
    {
      id: 'xp',
      name: 'Redeem XP Points',
      description: 'Use your earned experience points',
      price: 1000, // XP points required
      icon: Star,
      color: 'orange',
      available: userXP >= 1000,
      suffix: 'XP'
    }
  ];

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Google Pay, PhonePe, Paytm, BHIM'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async () => {
    if (!isAuthenticated) {
      openLogin();
      return;
    }

    // Check if user is eligible for certification
    if (eligibilityData && !eligibilityData.eligible) {
      alert('You need to complete all course requirements before purchasing certification.');
      return;
    }

    setIsProcessing(true);

    try {
      if (selectedPaymentMethod === 'xp') {
        // Handle XP redemption
        if (userXP < 1000) {
          alert('Insufficient XP points. You need 1000 XP to redeem certification.');
          setIsProcessing(false);
          return;
        }

        // Submit XP payment
        const paymentData = {
          transactionId: `XP_${Date.now()}_${user._id}`,
          paymentType: 'xp_redemption'
        };

        await paymentAPI.payCertificateFee(paymentData);
        alert('Certification purchased successfully using XP points!');
        navigate('/learn');

      } else {
        // Handle UPI payment
        // Generate a mock transaction ID for UPI payment
        const transactionId = `UPI_${Date.now()}_${user._id}`;

        const paymentData = {
          transactionId,
          paymentType: 'upi'
        };

        // Submit payment to backend
        await paymentAPI.payCertificateFee(paymentData);

        alert('Payment submitted successfully! Your payment is being processed and you will receive confirmation via email.');
        navigate('/learn');
      }

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Show loading state while fetching data
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading certification details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate('/learn/certification')}
          className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Certifications</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 mb-6"
            >
              <h2 className="font-poppins text-2xl md:text-3xl font-medium brand-heading-primary mb-6 tracking-wider">
                Complete Your Enrollment
              </h2>

              {/* Eligibility Status */}
              {eligibilityData && (
                <div className={`mb-6 p-4 rounded-xl border ${
                  eligibilityData.eligible
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                    : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    {eligibilityData.eligible ? (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    )}
                    <h3 className={`font-semibold ${
                      eligibilityData.eligible
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {eligibilityData.eligible ? 'Eligible for Certification' : 'Complete Requirements First'}
                    </h3>
                  </div>
                  <p className={`text-sm ${
                    eligibilityData.eligible
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-yellow-700 dark:text-yellow-300'
                  }`}>
                    {eligibilityData.eligible
                      ? 'You have completed all course requirements and are eligible for certification.'
                      : `Progress: ${eligibilityData.userTotalXP}/${eligibilityData.totalPossibleXP} XP. Complete all topics and exercises to become eligible.`
                    }
                  </p>
                </div>
              )}

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Choose Payment Method */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Choose Payment Method
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedPaymentMethod === option.id;
                    const isDisabled = option.id === 'xp' && !option.available;

                    return (
                      <button
                        key={option.id}
                        onClick={() => !isDisabled && setSelectedPaymentMethod(option.id)}
                        disabled={isDisabled}
                        className={`relative p-6 border-2 rounded-xl transition-all duration-300 text-left ${
                          isSelected
                            ? `border-${option.color}-500 bg-${option.color}-50 dark:bg-${option.color}-900/20`
                            : isDisabled
                            ? 'border-gray-200 dark:border-gray-600 opacity-50 cursor-not-allowed'
                            : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                        }`}
                      >
                        {option.recommended && (
                          <div className="absolute -top-2 left-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                            Recommended
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-${option.color}-100 dark:bg-${option.color}-900/30 flex items-center justify-center`}>
                              <Icon className={`w-4 h-4 text-${option.color}-600 dark:text-${option.color}-400`} />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {option.name}
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {option.description}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className={`text-2xl font-bold ${
                              option.id === 'xp' ? 'text-orange-600 dark:text-orange-400' : 'text-blue-600 dark:text-blue-400'
                            }`}>
                              {option.suffix === 'XP' ? `${option.price} XP` : `₹${option.price.toLocaleString()}`}
                            </div>
                            {option.id === 'xp' && (
                              <div className="text-xs text-gray-500">
                                Available: {userXP} XP
                              </div>
                            )}
                          </div>
                        </div>

                        {isSelected && (
                          <div className={`w-4 h-4 rounded-full bg-${option.color}-600 absolute top-4 right-4 flex items-center justify-center`}>
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Methods (only show for UPI payment) */}
              {selectedPaymentMethod === 'upi' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    UPI Payment Method
                  </h3>
                  <div className="flex justify-center">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <div
                          key={method.id}
                          className="p-6 border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center max-w-xs"
                        >
                          <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                          <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {method.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {method.description}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-green-800 dark:text-green-400">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Secure Payment</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  Your payment information is encrypted and secure. We use industry-standard security measures.
                </p>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing || !formData.name || !formData.email || !formData.phone || (selectedPaymentMethod === 'xp' && userXP < 1000)}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-xl transition-all duration-300 disabled:cursor-not-allowed ${
                  selectedPaymentMethod === 'xp'
                    ? 'bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : selectedPaymentMethod === 'xp' ? (
                  <>
                    <Star className="w-5 h-5" />
                    <span>Redeem 1000 XP</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-5 h-5" />
                    <span>Pay ₹{currentCertification.price.toLocaleString()} via UPI</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 sticky top-24"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h3>

              {/* Certification Details */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {currentCertification.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {currentCertification.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{certification.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{certification.rating}</span>
                  </div>
                </div>

                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-sm font-medium">
                  {certification.level}
                </span>
              </div>

              {/* What's Included */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  What's Included:
                </h4>
                <ul className="space-y-2">
                  {currentCertification.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Original Price:</span>
                  <span className="text-gray-500 line-through">₹{currentCertification.originalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Discount:</span>
                  <span className="text-green-600 dark:text-green-400">
                    -₹{(currentCertification.originalPrice - currentCertification.price).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total:</span>
                  <span>₹{currentCertification.price.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationPayment;
