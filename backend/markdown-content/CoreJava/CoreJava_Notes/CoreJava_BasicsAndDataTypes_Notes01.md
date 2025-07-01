**CORE JAVA NOTES – 01**

**BASICS OF JAVA**

1. **Java Program Structure & Execution**

   Example: Contact.java

class Contact {

public static void main (String argsll) {

String first\_name = "Sunil";

String last\_name = "Kumar";

long mobile = 9676663136L; // 'L' denotes long literal

System.out-println("First Name: " + first\_name) ;

System.out.println("Last Name: " + last\_name);

System.out.println("Mobile Number: " + mobile);

}

}

1. **Compilation & Execution steps:**

**STEP 1: Open Command Prompt**

**STEP 2: Switch to the D: Drive**

**STEP 3: Navigate to the Folder crjv28**

**STEP 4: Compile the Java Program**

**STEP 5: Execute the Program**

`       `**3. Data Types in Java**

In Java, data types form the foundation of all variable declarations and memory operations. They define the nature of data a program can process, the memory required, and the kind of operations that can be performed on it. Java is a **strongly typed** and **statically typed** language, meaning each variable must be declared with a data type, and type-checking is enforced at compile time.

Java data types are broadly classified into two categories:

**1. Primitive Data Types**

**2. Reference (or Non-Primitive) Data Types**

**1. Primitive Data Types**

Java has **eight** primitive data types, and they are the simplest forms of data that directly hold values. They are designed to be **lightweight**, **efficient**, and **platform independent**. These data types are **predefined by the language**.

` `**Categories of Primitive Types:**


|||||
| :- | :- | :- | :- |

|**Category**|
| :-: |

|||||
| :- | :- | :- | :- |

|**Types**|
| :-: |

|||||
| :- | :- | :- | :- |

|**Size**|
| :-: |

||||**Example**|
| :- | :- | :- | :- |
|||||

|Integer Types|
| :- |

|||||
| :- | :- | :- | :- |

|byte, short, int, long||
| :- | :- |

|||1–8 bytes|int age = 25;|
| :- | :- | :- | :- |
|||||

|Floating Point|
| :- |

|||||
| :- | :- | :- | :- |

|float, double|
| :- |

|||||
| :- | :- | :- | :- |

|4–8 bytes||
| :- | :- |

||||double pi = 3.14;|
| :- | :- | :- | :- |
|Character|char|2 bytes|char grade = 'A';|
|Boolean|Boolean|1 bit|Boolean isJavaFun = true;|

**Integer Types:**

- **byte (1 byte**
- **short (2 bytes):** 
- **int (4 bytes):** 
- **long (8 bytes):** 

**Floating Point Types:**

- **float (4 bytes):** 
- **double (8 bytes):** 

**char**

**Boolean**

**2. Reference (Non-Primitive) Data Types**

Unlike primitive types, **reference data types of** store **addresses** that point to actual objects in **heap memory**. They are more powerful and flexible because they allow the representation of more complex data structures.

` `**Common Reference Types:**

|**Type**|**Description**|**Example**|
| :- | :- | :- |
|String|Represents a sequence of characters|String name = "Alex";|
|Array|Holds multiple values of the same type|int[] numbers = {1, 2, 3};|
|Class|Blueprint for creating objects|Contact obj = new Contact();|
|Interface|Similar to classes, but only method declarations allowed|Used in abstraction and design|

**Key Differences Between Primitive and Reference Types:**

|**Feature**|**Primitive Type**|**Reference Type**|
| :- | :- | :- |
|Storage|Stores **actual value**|Stores **memory address** (pointer)|
|Memory Location|Stack memory|Reference in Stack → Object in Heap|
|Performance|Faster (lightweight)|Slower due to heap access|
|Examples|int, double, char, Boolean|String, Array, Object, Class|
|Default Values|0, false, ‘\u0000’|null|
|Mutability|Immutable|Mutable (except String)|

**Strings in Java: Immutable Reference Type**

In Java, the String class is one of the most used reference types. Unlike primitive types, a string does not store its actual content directly in the variable. Instead, it stores a reference (or memory address) pointing to the object located in **heap memory**. This makes strings a **reference data type**.

**String Creation in Java**

There are two primary ways to create a string in Java:

**1. Static (String Literal – Stored in String Pool)**

**String s1 = "Hello";**

**2. Dynamic (Using the new Keyword – Stored in Heap)**

**String s2 = new String("Hello");**

**String Immutability in Java**

**Immutability** means that once a string is created, **its content cannot be changed**. Any operation that seems to modify a string creates a **new string object** in memory.

**Why Strings Are Immutable:**

- **Security**
- **Thread Safety**
- **Memory Optimization**

**Common String Methods and Usage**

|**Method**|**Purpose**|**Example**|**Result**|
| :- | :- | :- | :- |
|length()|Gets the number of characters|"Java".length()|4|
|equals()|Compares strings (case-sensitive)|"Java".equals("java")|false|
|charAt(int index)|Gets character at specific index|"Java".charAt(0)|'J'|
|indexOf(char ch)|Returns index of first occurrence|"Java".indexOf('a')|1|
|concat(String str)|Joins two strings|"Hello".concat(" World")|"Hello World"|
|contains(CharSequence)|Checks if string contains substring|"Java".contains("av")|true|
|toLowerCase()|Converts string to lowercase|"JAVA".toLowerCase()|"java"|
|toUpperCase()|Converts string to uppercase|"java".toUpperCase()|"JAVA"|
|isEmpty()|Checks if string is empty (length == 0)|"".isEmpty()|true|
|equalsIgnoreCase()|Case-insensitive comparison|"Java".equalsIgnoreCase("JAVA")|true|

**length() :**  is used to find the length of the string (no of characters in a string)

->Write a program to check if the given password is of min length 8 and above or not.

System.out.println("Length of string s1= "+s1.length());

System.out.println(Length of Techlearn = "+TechLearn.length());

**equals():** is used to compare 2 string information(case-sensitive) and return a boolean value true/false.

System.out.println(Tech.equals(“tech));   //comparing the direct  string constants

->Check if the given usn and psw matches with the actual username and password.

String username = "techlearnsolutions@gmail.com";

String password = "tls@2014";

String entered\_usn="techlearnsolutions";

String entered\_psw="tls@2014";

System.out.println("User Login :  "+username.equals(entered\_usn) &&  password.equals(entered\_psw));

**charAt():**  is used to get the n<sup>th</sup> character of a string by giving n-1 index.

->Display the first letter of a given string.

String s1 = "TechLearn";

System.out.println(“Third character in string s1 is: “+s1.charAt(2));

**indexOf():**  is used to find the index position of the given character in a given string.

->  Find the position of character ‘+’ in a given string with a mathematical expression 

String expr = "123+5678";

System.out.println("Indec of character + in string s1 is: "+s1.indexOf(‘+’));

**concat():** is used to create a new string with the combination of the given 2 strings.

-> Create a full name if the first\_name and the last name is given.

String s1 = "TechLearn";

String s2 = "Solutions";

String s3 = s1.concat(s2);

System.out.println("s3 after adding s1 with s2 using concat function returns: "+s3);

**contains():**  is used to check if a string has a given string info or not and returns a Boolean value(true/false)

->  Check if the given String "techlearnsolutions"  has "learn" in it or not.

String s1 = "TechLearn Solutions";

System.out.println("Learn is found s1" + s1.contains("Learn"));

**toLowerCase():**  is used to return the given String into lowercase.

->  Convert the given String "TECHLEARN" into lowercase.

String s1 = "TECH";

String s2 = s1.toLowerCase();

System.out.println("s1 in lowercase is: "+s2);

**toUpperCase():**  is used to return the given String into uppercase.

-> Convert the given String "techlearn" into uppercase.

String s1 = "tech";

String s2 = s1.toUpperCase();

System.out.println("s1 in uppercase is: "+s2);

**isEmpty():**  used to check if the given String has any information or is empty.

-> Check if the username and password entered are not empty.

String s1 = "  ";

System.out.println("s1 is empty: "+s1.isEmpty());

**equalsIgnoreCase():**  used to compare 2 string by ignoring the cases and just compares the text based on the alphabets.

**->** Check if the given String given\_email  =  "<techlearnsolutions@gmail.com>" matches with the email id of the institute,  

String email = "techlearnsolutions.com";

System.out.println("Email Matches:  "+given\_email.equalIgnoreCase(email));

**Arrays:  Collection of similar type of data.**

**Length:** Array is has an in-built attribute length, which gives the total count of the elements in an array.

1. Array is filled by default with 0’s.
1. Each element of the array is accessed with their indexes which start from 0 onwards.

   First Element  is at 0<sup>th</sup> index.

   Last Element is at ar.length – 1 index.

   class Test {

   `    `public static void main(String[] args) {

   int ar[] = {1, 4, 5, 6, 7, 8};

   System.out.println("First number is: "+ar[0]);

   System.out.println("Last number is: "+ar[ar.length-1]);

   System.out.println("Second last number is: "+ar[ar.length-2]);

   }

`                         `}

**O/P:**

First number is: 1

Last number is: 8 

Second last number is: 7

1. To fill the array with user choice of values, use inbuilt library java.util.Arrays classes fill().

   import java.util.Arrays;

   class Test {

   `    `public static void main(String[] args) {

   `        `int ar[]=new int[5];

   `        `Arrays.fill(ar,-1);

   `        `System.out.println(ar[0] + " , "+ar[1]+ " , " + ar[2]);

   `     `}

   }

   **O/P:**

   -1 , -1 , -1






