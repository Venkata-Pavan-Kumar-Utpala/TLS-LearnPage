Beginner Level Questions

**Question 1:** What is the primary purpose of inheritance in Object-Oriented Programming (OOP) according to the sources? 

a) To restrict access to class members

b) To allow a new class to acquire properties and behaviors of an existing class, promoting code reusability 

c) To define multiple methods with the same name in a single class 

d) To convert an object from one type to another

**Correct Answer:** b) To allow a new class to acquire properties and behaviors of an existing class, promoting code reusability

**Question 2:** Which keyword is used in Java to implement inheritance, signifying that one class acquires properties and behaviors from another? 

a) implements 

b) inherits 

c) extends 

d) inheritsFrom 

**Correct Answer:** c) extends

**Question 3:** In the context of inheritance, what kind of relationship does it help to model? 

a) HAS-A relationship 

b) IS-A relationship 

c) PART-OF relationship 

d) USES-A relationship 

**Correct Answer:** b) IS-A relationship

**Question 4:** What happens to non-private members of a parent class when a child class extends it? 

a) They are ignored by the child class 

b) They are inherited by the child class 

c) They become private in the child class 

d) They are automatically overridden by the child class 

**Correct Answer:** b) They are inherited by the child class

Intermediate Level Questions

**Question 5:** Which of the following is a key rule for method overriding in Java? 

a) The method name must be different in the child class 

b) The return type must be different in the child class 

c) The access modifier in the child class can be the same or more accessible than in the parent class 

d) The overridden method can throw broader or new checked exceptions

**Correct Answer:** c) The access modifier in the child class can be the same or more accessible than in the parent class

**Question 6:** What is the primary purpose of method overriding, as described in the sources? 

a) To hide the parent's method completely 

b) To prevent the child class from using the parent's method 

c) To allow a subclass to provide its own specific implementation of a method defined in its superclass 

d) To create a new method that is entirely unrelated to the parent's method 

**Correct Answer:** c) To allow a subclass to provide its own specific implementation of a method defined in its superclass

**Question 7:** What is the purpose of the @Override annotation, even though it's optional? 

a) It makes the method run faster 

b) It ensures the method is indeed overriding something and helps catch errors at compile time 

c) It changes the method's access level to public  

d) It automatically calls the parent's version of the method

**Correct Answer:** b) It ensures the method is indeed overriding something and helps catch errors at compile time

**Question 8:** When can the super keyword be used? 

a) Only inside static methods [Not in sources] 

b) Only to access private members of the parent class 

c) Inside a child class's constructors and non-static methods 

d) To declare a new parent class 

**Correct Answer:** c) Inside a child class's constructors and non-static methods

Advanced Level Questions

**Question 9:** Why is super() required to be the first statement in a child class constructor, if explicitly called? 

a) To ensure proper memory allocation for the child object before the parent is initialized [Not in sources] 

b) To ensure that the parent’s constructor is called first, initialising parent's instance variables and methods before the child's constructor executes 

c) To prevent method overloading issues

d) It's a syntactic rule without a specific functional reason

**Correct Answer:** b) To ensure that the parent’s constructor is called first, initialising parent's instance variables and methods before the child's constructor executes

**Question 10:** Which types of methods cannot be overridden in Java, and why? 

a) public methods, because they are globally accessible 

b) static, final, or private methods; static methods result in hiding, private methods are not inherited, and final methods are locked 

c) Methods with a void return type, as they don't return a value

d) Methods that throw checked exceptions, to avoid runtime errors 

**Correct Answer:** b) static, final, or private methods; static methods result in hiding, private methods are not inherited, and final methods are locked

**Question 11:** If a parent class has only a parameterized constructor, and a child class's constructor does not explicitly call super(parameters), what will be the outcome during compilation? 

a) The code will compile successfully, and Java will automatically call the default parent constructor 

b) A compile-time error will occur because the parent's parameterized constructor must be explicitly invoked 

c) A runtime error will occur when creating an object of the child class 

d) The child class will inherit the parent's parameterized constructor automatically 

**Correct Answer:** b) A compile-time error will occur because the parent's parameterized constructor must be explicitly invoked

**Question 12:** During object creation of a child class, Java internally creates two reference variables: this and super. What specific purpose does the super reference serve? 

a) It refers to the current object (child) 

b) It refers to the parent's part of the object, providing access to parent’s properties, methods, and constructors 

c) It's used for creating static instances of the parent class 

d) It's used to define new methods in the parent class from the child class 

**Correct Answer:** b) It refers to the parent's part of the object, providing access to parent’s properties, methods, and constructors

