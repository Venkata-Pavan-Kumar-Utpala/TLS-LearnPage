Beginner Questions

**1. JVM Memory Areas** Which of the following correctly lists the five major storage areas organised by the Java Virtual Machine (JVM) for memory management? 

A) Stack, Heap, Register, Cache, Buffer 

B) Method Area, Heap Area, Stack Area, Native Method Stack, Program Counter (PC) Register Area 

C) Program Stack, Data Heap, Code Cache, Metadata Store, Native Register 

D) Class Area, Object Area, Local Area, Global Area, Thread Area

**Correct Answer:** B **Explanation:** The JVM organises its memory into five major storage areas: Method Area, Heap Area, Stack Area, Native Method Stack, and Program Counter (PC) Register Area.

**2. Local Variables Storage** In which JVM memory area are local variables stored? 

A) Heap Area 

B) Method Area 

C) Stack Area 

D) Program Counter (PC) Register Area

**Correct Answer:** C **Explanation:** Local variables are stored in the Stack Area of the JVM.

**3. Heap Area Purpose** What is the primary purpose of the Heap Area in the JVM? 

A) To store metadata about classes and methods 

B) To store objects and instance (non-static) variables 

C) To store method call information and return addresses 

D) To store the address of the current instruction being executed by a thread

**Correct Answer:** B **Explanation:** The Heap Area is the largest memory segment in the JVM and is used to store objects and instance (non-static) variables.

Intermediate Questions

**4. Method Area Contents** Which of the following is *not* typically stored in the Method Area? 

A) Class-level data, such as the class name and parent class name 

B) Static variables (class variables) 

C) Instance fields of objects 

D) Constant pool information and compiled code of methods

**Correct Answer:** C **Explanation:** Instance fields of objects are stored in the Heap Area. The Method Area stores class-level data, static variables, constant pool information, and compiled code of methods.

**5. Static vs Instance Variable Lifetime** What is the key difference in lifetime between instance variables and class (static) variables? 

A) Instance variables exist as long as the method runs, while class variables exist as long as the object exists. 

B) Instance variables exist as long as the object exists, while class variables exist from the time the class is loaded until the JVM shuts down. 

C) Instance variables are destroyed once a method returns, while class variables are destroyed when the object is garbage collected. 

D) Instance variables are created when the class is loaded, while class variables are created when an object is instantiated.

**Correct Answer:** B **Explanation:** Instance variables exist as long as the object exists. Class variables exist from the time the class is loaded until the JVM shuts down.

**6. StackOverflowError** Which JVM memory area is prone to a StackOverflowError if a thread’s call stack grows beyond its allocated limit? 

A) Method Area 

B) Heap Area 

C) Stack Area 

D) Native Method Stack

**Correct Answer:** C **Explanation:** The Stack Area is prone to StackOverflowError if a thread’s call stack grows beyond its allocated limit (e.g., in infinite recursion).

Advanced Questions

**7. Static Method Restrictions** Why can't this or super keywords be used inside a static method in Java? 

A) Because static methods are loaded after objects are instantiated, so this and super would refer to undefined objects. 

B) Because this refers to the current object and super refers to the parent object, and static methods are not tied to any object. C) Because static methods operate on class-level data only, and this/super would attempt to access instance-level data. 

D) Because static methods are stored in the Method Area, while this/super relate to objects stored in the Heap Area, causing a memory conflict.

**Correct Answer:** B **Explanation:** this refers to the current object and super refers to the parent object. Since static methods are not tied to any object, this and super are meaningless in that context.

**8. Metaspace and PermGen** In newer JVM versions (Java 8+), where is the Method Area primarily located and how does it relate to PermGen? 

A) It is part of the Heap Area, replacing PermGen entirely. 

B) It is part of Metaspace, which resides in native memory, whereas in older versions it was part of PermGen. 

C) It is stored in the Program Counter (PC) Register, with PermGen being deprecated. 

D) It is an entirely new memory area called Metaspace, separate from both PermGen and the Heap.

**Correct Answer:** B **Explanation:** In older JVM versions, the Method Area was part of PermGen, but in newer versions (Java 8+), it is part of Metaspace, which resides in native memory and expands dynamically.

**9. Variable Initialization** Which type of variable in Java is *not* automatically initialized by default values and requires explicit assignment before use? 

A) Instance variables 

B) Class variables (Static variables) 

C) Local variables 

D) Both Instance and Class variables

**Correct Answer:** C **Explanation:** Java does not initialize local variables by default; you must assign a value before using them. Instance variables are automatically initialized with default values if not explicitly assigned, and class variables are also automatically initialized with default values if not assigned.

