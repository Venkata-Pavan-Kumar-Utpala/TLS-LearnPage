import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  Clock,
  Users,
  Star,
  Award,
  Smartphone,
  Trophy,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useAuthModalContext } from '../../context/AuthModalContext';
import { paymentAPI, courseAPI, progressAPI } from '../../services/api';

const CertificationPayment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, user } = useAuth();
  const { openLogin } = useAuthModalContext();
  
  const [certification, setCertification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [userXP, setUserXP] = useState(0);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    transactionId: ''
  });

  const courseId = searchParams.get('courseId');

  useEffect(() => {
    const fetchCertificationDetails = async () => {
      try {
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
              "Industry-recognized certificate",
              "Blockchain-verified authenticity",
              "LinkedIn credential integration",
              "Lifetime validity",
              "Downloadable PDF format",
              "Employer verification portal"
            ]
          });
        }

        // Fetch user XP if authenticated
        if (user) {
          try {
            const xpResponse = await progressAPI.getUserProgress();
            setUserXP(xpResponse.data.totalXP || 0);
          } catch (error) {
            console.error('Error fetching user XP:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching certification details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificationDetails();
  }, [courseId, user]);

  // Auto-populate form data when user is authenticated
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.firstName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleInitiatePayment = () => {
    if (!isAuthenticated) {
      openLogin();
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    if (selectedPaymentMethod === 'xp' && userXP < 1000) {
      alert('You do not have enough XP points to redeem this certification.');
      return;
    }

    // Show payment details (QR code and UPI ID)
    setShowPaymentDetails(true);
  };

  const handleSubmit = async () => {
    if (selectedPaymentMethod === 'upi' && !formData.transactionId) {
      alert('Please enter the transaction ID after completing the payment.');
      return;
    }

    setIsProcessing(true);

    try {
      if (selectedPaymentMethod === 'xp') {
        // Handle XP redemption
        const xpRedemptionData = {
          courseId: certification.id,
          courseName: certification.title,
          paymentType: 'certificate',
          redemptionType: 'xp',
          xpPointsUsed: 1000,
          userDetails: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          }
        };

        // For now, we'll use the existing payment API with a special flag
        const response = await paymentAPI.payCertificateFee({
          ...xpRedemptionData,
          transactionId: 'XP_REDEMPTION_' + Date.now()
        });

        alert('Certificate redeemed successfully with XP points! You will receive your certificate via email within 48 hours.');
        navigate('/learn/certification');
      } else {
        // Handle UPI payment
        const paymentData = {
          transactionId: formData.transactionId,
          paymentType: 'certificate',
          courseId: certification.id,
          courseName: certification.title,
          amount: certification.price,
          userDetails: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone
          }
        };

        await paymentAPI.payCertificateFee(paymentData);
        alert('Payment submitted successfully! Your payment is being processed and you will receive confirmation via email within 48 hours.');
        navigate('/learn/certification');
      }
    } catch (error) {
      console.error('Payment/Redemption error:', error);
      alert('An error occurred while processing your request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
        <div className="max-w-7xl mx-auto px-6">
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

  if (!certification) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Certification Not Found</h2>
            <button
              onClick={() => navigate('/learn/certification')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Certifications
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-[#daf0fa] via-[#bceaff] to-[#bceaff] dark:from-[#020b23] dark:via-[#001233] dark:to-[#0a1128]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate('/learn/certification')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Certifications</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Payment Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 font-poppins">Complete Your Enrollment</h2>

              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Choose Payment Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* UPI Payment */}
                  <div
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPaymentMethod === 'upi'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/30 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedPaymentMethod('upi')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">UPI Payment</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Secure payment with UPI</p>
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">₹{certification.price.toLocaleString()}</p>
                        </div>
                      </div>
                      {selectedPaymentMethod === 'upi' && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    {selectedPaymentMethod === 'upi' && (
                      <div className="absolute top-2 right-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Recommended</span>
                      </div>
                    )}
                  </div>

                  {/* XP Redemption */}
                  <div
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPaymentMethod === 'xp'
                        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10'
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/30 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedPaymentMethod('xp')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Redeem XP Points</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Use your earned XP points</p>
                          <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">1000 XP</p>
                        </div>
                      </div>
                      {selectedPaymentMethod === 'xp' && (
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Payment Details - Only show after user clicks "Proceed to Pay" */}
              {showPaymentDetails && selectedPaymentMethod === 'upi' && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Complete Your Payment</h3>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">UPI Payment</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                    <div className="text-center mb-6">
                      <div className="bg-white rounded-lg p-4 inline-block shadow-md mb-4">
                        <img src="/QR1.jpg" alt="Payment QR Code" className="w-48 h-48 mx-auto" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Scan QR code or pay to UPI ID: <strong className="text-gray-900 dark:text-white">9676663136@axl</strong>
                      </p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-2">
                        Amount: ₹{certification?.price?.toLocaleString()}
                      </p>
                    </div>

                    {/* Transaction ID Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Transaction ID *
                      </label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter transaction ID after payment"
                        required
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Enter the transaction ID you received after completing the UPI payment
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* XP Redemption Details */}
              {selectedPaymentMethod === 'xp' && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">XP Points Redemption</h3>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-700 dark:text-gray-300">Available XP Points:</span>
                      <span className="text-yellow-600 dark:text-yellow-400 font-bold">{userXP} XP</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-700 dark:text-gray-300">Required XP Points:</span>
                      <span className="text-gray-900 dark:text-white font-bold">1000 XP</span>
                    </div>
                    {userXP >= 1000 ? (
                      <div className="bg-green-50 dark:bg-green-500/20 border border-green-200 dark:border-green-500 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <span className="text-green-700 dark:text-green-400 font-medium">You have enough XP points!</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-50 dark:bg-red-500/20 border border-red-200 dark:border-red-500 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-red-700 dark:text-red-400 font-medium">
                            You need {1000 - userXP} more XP points to redeem this certification.
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              {!showPaymentDetails ? (
                <button
                  onClick={handleInitiatePayment}
                  disabled={selectedPaymentMethod === 'xp' && userXP < 1000}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  {selectedPaymentMethod === 'upi' ? 'Proceed to Pay' : 'Redeem with XP'}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing || (selectedPaymentMethod === 'upi' && !formData.transactionId)}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Confirm Payment
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>

          {/* Right Side - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-6 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{certification.title} Programming</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{certification.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{certification.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{certification.rating}</span>
                    </div>
                  </div>

                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Beginner</span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">What's Included:</h5>
                  <div className="space-y-2">
                    {certification.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Original Price:</span>
                    <span className="text-gray-600 dark:text-gray-400 line-through">₹{certification.originalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Discount:</span>
                    <span className="text-green-600 dark:text-green-400">-₹{(certification.originalPrice - certification.price).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-gray-900 dark:text-white">Total:</span>
                    <span className="text-gray-900 dark:text-white">₹{certification.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CertificationPayment;
