CORE JAVA NOTES - 09

ABSTRACT CLASS & INTERFACES

Types of Classes:

1. Concrete Class

   A class that contains fully defined methods (with complete method bodies). It can be:

   1. Instantiated directly
   1. Used as a parent class via inheritance

In inheritance, the child class automatically inherits all methods from the parent class. The child can either:

1. Use the same behavior, or
1. Override methods to provide new behavior (method overriding, a form of polymorphism)

However, if the base class’s method body is rarely used and mostly overridden, it’s better to leave out the method body. This leads to the use of an Abstract Class.

1. Abstract Class

   A class that may contain both:

   1. Concrete methods (with body)
   1. Abstract methods (without body, declared with a semicolon)

An abstract class:

1. Cannot be instantiated directly
1. Is used as a blueprint for subclasses
1. Must be extended by a subclass that provides implementations for all abstract methods

In essence, an abstract class defines a common structure while allowing subclasses to define specific behaviors.

So, we can say an Abstract class is a class which consists of at least one abstract method, but rarely with no abstract method.

abstract class abs{

public void fun()      //concrete method

{  …   }

abstract public void fun();      // abstract method}

1. **Declaration:**

   Must be declared using the abstract keyword; otherwise, the compiler expects all methods to have bodies.

1. **Methods:**

   Can contain both:

   1. **Abstract methods** (no body, must use abstract keyword)
   1. **Concrete methods** (with body)
1. **Access Specifiers:**

   Can have members with any access modifier (default, public, protected, private). By default, members use **package-private** (default).

1. **Instantiation:**

   Cannot be instantiated directly; must be **extended** by subclasses.

1. **Inheritance:**

   Any subclass must implement all abstract methods, or it too must be declared abstract.

1. **Members:**

   Can include:

   1. **Instance and static members**
   1. **Static final variables** (support both early and late initialization)
1. **Constructors:**

   Can have constructors, which are called via the subclass constructor.

   Cannot have only a **private constructor** unless other constructors are defined.

1. **Inner Classes:**

   Can include both **static** and **non-static** (member) inner classes.

1. **Modifiers Restrictions:**

   Cannot be declared final (as final classes can’t be extended).

10. **Purpose of Abstract Class:**
- Prevents direct object creation—enforces **usage via inheritance**.
- Provides **common behavior** (concrete methods) and enforces **custom behavior** (abstract methods) for all child classes.
- Helps in creating a consistent structure and behavior across related classes.
- abstract class Figure { 

double dim1; \
double dim2; \
Figure(double a, double b) { \
dim1 = a; \
dim2 = b; } \
abstract double area(); }

class Rectangle extends Figure { \
Rectangle(double a, double b) { \
super(a, b); } \
double area() { 

System.out.println("Inside Area for Rectangle."); \
return dim1 \* dim2; } }

class Triangle extends Figure { \
Triangle(double a, double b) { \
super(a, b); } \
double area() { \
System.out.println("Inside Area for Triangle."); \
return dim1 \* dim2 / 2; }}

class AbstractAreas { \
public static void main(String args[]) { \
Rectangle r = new Rectangle(9, 5); \
Triangle t = new Triangle(10, 8); \
Figure figref; figref = r; \
System.out.println("Area is " + figref.area()); \
figref = t; \
System.out.println("Area is " + figref.area()); }}

**Questions**

**1. Beginner Level – Abstract Appliance**

**Scenario:** You’re building a smart home system. Different appliances (like Fans, Lights) can be turned on or off, but how they operate differs.

**2. Beginner–Intermediate – Payment System**

**Scenario:** A shopping website supports multiple payment methods: Credit Card and UPI. Each payment type has different steps to process.

**3. Intermediate – Animal Sounds**

**Scenario:** A zoo simulation game has different animals that make different sounds, but all animals eat in a common way.

**4. Intermeiate–Advanced – Abstract Notifications**

**Scenario:** A mobile app sends notifications via Email, SMS, and Push. Each notification behaves differently, but logs are saved in the same way.

**5. Advanced – Employee Hierarchy with Shared Behavior**

**Scenario:** An organization has different types of employees: Manager, Developer, Intern. All employees have calculateSalary() logic, but it differs based on the role. Some share default behavior like checkIn().




**INTERFACES**

1. **Definition:**

   An **interface** defines a contract or protocol with **only abstract methods** (until Java 7). It is like a blueprint, not a class.

1. **Declaration:**

   Declared using the interface keyword (not class).

1. **Method Characteristics:**
   1. All methods are **implicitly public and abstract** (no need to specify).
   1. **Static abstract methods are not allowed.**
   1. No method can have a body (except in Java 8+ with default/static methods, not covered here).
1. **Variable Rules:**
   1. Only **public static final** constants allowed.
   1. Must be initialized at the time of declaration (**early initialization**).
   1. **No instance variables** allowed.
1. **Instantiation:**

   Interfaces **cannot be instantiated** directly.

1. **Implementation:**
   1. A class **implements** an interface using the implements keyword.
   1. Must override **all interface methods** or be declared abstract.
   1. Overridden methods must be marked public.
1. **Multiple Inheritance:**
   1. A class can implement **multiple interfaces**—allowing Java to achieve multiple inheritance.
   1. A class can also **extend a class and implement interfaces** at the same time.

      Format: class Child extends Parent implements Interface1, Interface2 {}

1. **Polymorphism & Design:**
   1. Interfaces enable **polymorphism**: same method names, different implementations across classes.
   1. Promotes **loose coupling**—no inheritance link needed between interface and implementing class.
   1. Classes implementing the same interface **follow a common protocol** but have different behaviors.
1. **Interface Inheritance:**
   1. Interfaces can **extend other interfaces**, helping to build modular and extendable designs.

Example

interface PaymentMethod {

`    `void pay(double amount);}

class CreditCard implements PaymentMethod {

`    `public void pay(double amount) {

`        `System.out.println("Paid ₹" + amount + " using Credit Card");}}

class UPI implements PaymentMethod {

`    `public void pay(double amount) {

`        `System.out.println("Paid ₹" + amount + " using UPI");}}

public class Main {

`    `public static void main(String[] args) {

`        `PaymentMethod p1 = new CreditCard();

`        `PaymentMethod p2 = new UPI();

`        `p1.pay(500);

`        `p2.pay(200);}}

**QUESTIONS**

**1. Beginner – Interface for Basic Payment System**

**Scenario:** An e-commerce app supports multiple payment methods (e.g., UPI, Debit Card, Wallet).

**2. Beginner–Intermediate – Smart Device Control**

**Scenario:** A smart home controller manages devices like Lights and Fans. All devices can be switched on/off.

**3. Intermediate – Online Content Platform**

**Scenario:** A learning platform has different content types: Videos, PDFs, and Quizzes. Each has a display behavior.

**4. Intermediate–Advanced – Employee Bonus System**

**Scenario:** A company calculates bonuses differently for Developers and Managers, but all employees receive a bonus.

**5. Advanced – Interface + Class Inheritance + Multiple Interfaces**

**Scenario:** A media player supports both audio and video playback, but they share some basic player functionality.

