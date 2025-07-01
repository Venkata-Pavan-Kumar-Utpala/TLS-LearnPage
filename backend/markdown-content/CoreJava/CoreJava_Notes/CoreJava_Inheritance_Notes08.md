**CORE JAVA NOTES - 08**

**OOPS - INHERITANCE**

**Definition**

Inheritance is an object-oriented concept where a **child class** (subclass) inherits fields and methods from a **parent class** (superclass), promoting **code reuse** and **modularity**.

**Syntax**:

class Vehicle {

`    `void drive() { System.out.println("Driving..."); }}

class Car extends Vehicle {

`    `void honk() { System.out.println("Honking..."); }}

Java uses the extends keyword for inheritance.

**Why Use Inheritance?**

1. **Code Reusability** – Avoids duplication by allowing child classes to reuse methods and fields of the parent.
1. **Enhancement via Overriding** – Child classes can provide specialized behavior by overriding inherited methods.
1. ` `**Maintainability** – If logic is updated in the parent class, all child classes benefit from the change automatically.
1. ` `**IS-A Relationship** – Helps in modeling real-world hierarchies (e.g., a Dog **is-a** Animal).

Let’s understand it through a basic shape example:

class Shape {

`    `void display() {

`        `System.out.println("This is a shape.");}}

class Circle extends Shape {

`    `void draw() {

`        `System.out.println("Drawing a circle.");}}

class Rectangle extends Shape {

`    `void draw() {

`        `System.out.println("Drawing a rectangle.");}}

public class Main {

`    `public static void main(String[] args) {

`        `Circle c = new Circle();

`        `c.display();

`        `c.draw();

`        `Rectangle r = new Rectangle();

`        `r.display();

`        `r.draw();}}

**Real-Life Use Case in Code**

**Scenario:** Suppose you’re building a **Company Employee Management System**. There are different roles like Employee, Manager, Developer, and so on. All of them share common properties like name, id, and login(). But each might have different functionalities.

class Employee ‹

String name;

int id;

void login() {

System.out.println(name + " logged in.");}}

class Manager extends Employee ‹

void approveLeave() {

System.out.println(name + " approved leave.");｝}

class Developer extends Employee ‹

void writeCode) ‹

System.out println(name + " is writing code.");｝｝

public class Company ‹

public static void main(String[] args) {

Manager m = new Manager);

m.name = "Alice";

m. login();

m.approveLeave(); // Manager-specific

Developer d = new Developer ();

d. name = "Bob";

d. login();

d.writeCode ();

}}

**Method Overriding in Java**

**Definition**

**Method Overriding** is the process by which a **child class redefines a method** that it inherits from a **parent class**. The overridden method in the child class must have the **same name, return type, and parameters** as the method in the parent class.

**In simpler terms**: If a child doesn’t like the way its parent does something, it can override that behavior and provide its own.

**Purpose of Method Overriding**

- **Custom Behavior**: To provide a more specific or appropriate version of a method for the subclass.
- **Runtime Polymorphism**: Enables the program to decide at runtime which method to invoke (parent’s or child’s).
- **Enhancement**: To enhance or modify the logic of an inherited method.
- **Readability**: Keeps the hierarchy clean and readable while reusing the interface and changing implementation.

**Rules of Method Overriding**

To successfully override a method in Java, the following rules must be followed:

1. **Same method signature**:
   1. Method name must be identical.
   1. Parameter types, order, and count must be the same.
   1. Return type must be the same (or covariant in case of objects).
1. **Access modifier**:
   1. Can be same or **more accessible** (wider visibility).
   1. Example: from protected to public is allowed.
1. **Not static, final, or private**:
   1. These cannot be overridden.
   1. Static methods result in **method hiding**, not overriding.
1. **Exceptions**:
   1. If the parent method throws checked exceptions, the child can throw the same or **narrower** exceptions.
   1. Cannot throw broader or new checked exceptions.
1. **@Override annotation** (optional but recommended):
   1. Helps catch errors at compile time.
   1. Ensures the method is indeed overriding something.

Imagine a general instruction manual written for all employees of a company. Now, let’s say managers require a special version of the manual with added sections specific to leadership responsibilities. Instead of rewriting the entire manual, we override only the necessary parts. This is what method overriding does in Java.

class Employee {

`    `void manual() {

`        `System.out.println("General instruction manual for all employees.");}}

class Manager extends Employee {

`    `void manual() {

`        `System.out.println("General instruction manual with added leadership responsibilities for managers.");}}

public class Company {

`    `public static void main(String[] args) {

`        `Employee emp = new Employee();

`        `emp.manual();

`        `Manager mgr = new Manager();

`        `mgr.manual();

`        `Employee ref = new Manager();

`        `ref.manual();}}

**2. Rules for Method Overriding**

**a) Method Name Must Be the Same** The method name in the child class must be **identical** to that in the parent class.

**b) Return Type Must Be the Same** The return type must be **exactly the same** (or **covariant** – i.e., a subclass of the original return type, allowed in some cases).

**c) Parameter List Must Be the Same**

- Number, **types**, and **order** of parameters must match exactly.
- Otherwise, it’s not overriding — it’s method overloading.

**d) Only the Method Body Changes**

Everything else stays the same — you only change the **code inside** the method to suit the child class.

**e) Access Specifier Can Be Same or Wider**

The overridden method **cannot have a more restrictive access** than the parent method.

**Access Modifier Hierarchy (Widest to Weakest)**:

public > protected > default (package-private) > private

**f) Method Overriding with  throws Clause**

When a parent method includes a throws clause, the overriding method in the child class can:

- Use the **same** throws clause.
- **Avoid** using any throws clause (i.e., handle internally).
- **Not add broader or new checked exceptions**.

**g) Methods That Cannot Be Overridden**

**1. Static Methods → Not Overridden (They Are Hidden)**

If a static method is defined in both the parent and child classes with the same signature, the child’s version **hides** the parent’s.

**2. Private Methods → Not Inherited, Not Overridden**

Private methods belong only to their class. Even if a child defines a method with the same name, it’s **a new method**, not overriding or hiding.

class Employee {

private void changePassword () {

System.out.println("Employee password changed.");}

void login () {

System.out.println("Employee login success"); changePassword(); // Calls employee's own method}}

class Manager extends Employee {

private void changePassword() {

System.out.println("Manager password changed.");}

void login () {

System.out.println("Manager login success"); changePassword(); // Calls manager's own method}}

**3. Final Methods → Cannot Be Overridden**

Final methods are **locked** in the parent class. Attempting to override results in a **compile-time error**.

**Role of super in Constructor Chaining**

When a child object is created, Java internally ensures the parent’s constructor is called **first** before the child’s.

**super() Must Be the First Statement in Child Constructor**

**Case 1: Parent Has Default Constructor**

**Case 2: Parent Has Only Parameterized Constructor**

` `**Case 3: Parent Has Both Constructors (Overloaded)**

Child can choose which constructor to invoke.

class Shape {

Shape () ‹}

Shape (int d1) {}

System.out.println("Shape constructed with default");

System.out.println("Shape constructed with argument");

Class Square extends Shape {

Square () {

System.out.println("Square constructed with default");}

Square (int d1) ‹

super(d1);

**The super Keyword in Java**

### Introduction to Super in Java

In Java, super is a special keyword used within a subclass to refer to its immediate **parent class**. It helps in accessing:

- Parent class fields and methods
- Parent class constructors

This is particularly useful when there’s **overlapping or overridden members** between parent and child classes.

### Definition of  Super

### super is a reference variable automatically available in every subclass. It stores the reference to the **parent portion** of the current object and allows interaction with the parent class’s features.

### Object Creation Flow Using super

When a child class object is created:

1. The parent constructor is invoked first (using super() implicitly or explicitly).
1. Parent class variables and methods are initialized.
1. Then, the child constructor runs.
1. Internally, two references exist:
   1. this: refers to the child object.
   1. super: refers to the parent part of the object.

**Rule 1: super() Must Be the First Statement in Child Constructor**

Java automatically inserts a call to super() if the parent class has a default constructor. But if the parent only has a parameterized constructor, then super(arguments) **must be called explicitly**.\*\*

**Rule 2: super Can Only Be Used in Child Class Constructors and Non-Static Methods**

You **cannot use super inside static blocks or static methods**, because it refers to an object context (which static members don’t have).

**Rule 3: super Can Be Used to Access Parent Class Members**

The child class can use super to refer to **instance variables or methods** defined in the parent class — especially if they are **hidden by redefinition** in the child.

**Example: Calling Parent Method Using super**

class BankNotification {

`    `void sendNotification() {

`        `System.out.println("Dear customer, your bank account has been updated.");}}

class SMSNotification extends BankNotification {

`    `@Override

`    `void sendNotification() {

`        `super.sendNotification(); // Call parent method

`        `System.out.println("SMS Sent: Check your latest transaction in the mobile app.");}}

public class Main {

`    `public static void main(String[] args) {

`        `SMSNotification sms = new SMSNotification();

`        `sms.sendNotification();}}

**Real-Life Analogy**

Think of a company hierarchy. A junior employee (child class) may need to:

- Call their manager (parent class) for instructions → like using super.method().
- Inherit base responsibilities (work hours, rules) → like inheriting fields/methods.
- Refer to company rules set by the manager → like using super for clarity and respect of hierarchy.

**Use Cases of super in Summary**

| **Use Case**                                 | **Example**             |
| :------------------------------------------- | :---------------------- |
| Call parent constructor                      | super(); or super(arg); |
| Access parent method                         | super.methodName();     |
| Access parent variable (if shadowed)         | super.variableName      |
| Used only in child class, non-static context | Yes                     |

**When to Use super**

- When **child overrides a method** but still needs to call the parent’s version.
- When **child constructor must pass arguments to parent constructor**.
- When **variable or method name conflicts** between parent and child.

## ` `**Practical Questions**

**Basic Understanding & Conceptual Questions**

1. In Java inheritance, why is the super() constructor call required to be the first statement in a child class constructor? What could go wrong if it isn’t?
1. How does the super keyword help in differentiating between the parent and child class methods or variables when they have the same name?
1. What would happen if the parent class has only a parameterized constructor, and you forget to use super(parameters) in the child class? Will the code compile?
1. Can the super keyword be used inside a static context? If not, why is it restricted to instance-level contexts?
1. Explain how Java internally creates references like this and super in a child object during runtime. What purpose do these references serve?

### Application-Based & Real-Life Scenario Questions

6. Imagine you’re designing an Employee Management System where all employees inherit from a base Employee class. How would you use super in constructors when a Manager class has additional fields like teamSize?
7. In a real-world GUI application, suppose there’s a base class Component with a method draw(), and subclasses like Button and TextField override it. When and why might you call super.draw() from within the overridden method?
8. In a banking application, both SavingsAccount and CurrentAccount extend Account. How can super help you in reusing validation logic in methods like deposit() or withdraw()?
9. Consider a situation where a subclass method must do extra work **in addition to** what the parent class already does. How does super make this extension easier and cleaner?
10. You’re working on a game where Character is a superclass, and Warrior is a subclass. How could super help in reusing base health initialization logic in the child constructor?

### Edge Case & Behavior Questions

11. If both parent and child classes have a method named display() and a variable named name, how do you use super to access the parent’s name and display() inside the child?
12. What would happen if you accidentally override a method in the child class but forget to call super.methodName() even though it is essential for core logic defined in the parent?
13. If a method is marked as final in the parent class, can you still use super to call it in the child class? Justify your answer.
14. If a child class constructor doesn’t explicitly call super(), and the parent has no default constructor, what will be the outcome during compilation?
15. How does using super impact the readability and maintainability of a codebase that heavily relies on inheritance?
