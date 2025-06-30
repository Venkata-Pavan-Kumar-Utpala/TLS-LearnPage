**Beginner Level MCQs**

1\.What was a primary goal for Java introducing the Collections Framework? 

A. To replace all existing array functionalities. 

B. To provide a unified and consistent system for managing groups of objects. 

C. To solely focus on thread-safe data structures. 

D. To introduce new primitive data types. 

Correct Answer: B

2\.Which of the following is NOT considered a core component of the Java Collections Framework? A. Interfaces B. Implementations (Classes) C. Algorithms D. Database Schemas Correct Answer: D

3\.Which interface represents an ordered collection of elements that allows duplicates? 

A. Set 

B. Map 

C. List 

D. Queue 

Correct Answer: C

4\.Which class is a resizable array implementation of the List interface and allows duplicate elements? 

A. HashSet 

B. TreeSet 

C. ArrayList 

D. HashMap 

Correct Answer: C

5\.What is the main benefit of using Generics with Java Collections, such as ArrayList<String>? 

A. It allows collections to store primitive types directly without autoboxing.

B. It enables the compiler to check for type mismatches at compile time, improving type safety and code clarity. 

C. It automatically sorts the elements in the collection in ascending order. 

D. It makes all collection operations run faster at runtime. 

Correct Answer: B

**Intermediate Level MCQs**

6\.Which statement accurately describes a key performance difference between ArrayList and LinkedList? 

A. ArrayList is generally faster for insertions and deletions in the middle of the list. 

B. LinkedList provides faster random access to elements by index. 

C. ArrayList offers fast random access, while LinkedList allows faster insertions and deletions (especially at the ends). 

D. Both ArrayList and LinkedList have similar performance characteristics for all operations. 

Correct Answer: C

7\.Which interface extends Iterator and allows for bidirectional traversal of a list, as well as modification of elements during iteration? 

A. Enumeration 

B. Comparator 

C. ListIterator 

D. Collection 

Correct Answer: C

8\.When attempting to add an element to a HashSet that is already present, what is the typical outcome? 

A. A RuntimeException is thrown, indicating a duplicate. 

B. The element is added again, creating a duplicate entry. 

C. The duplicate element is ignored and the HashSet remains unchanged. 

D. The existing element is replaced by the new (duplicate) one. 

Correct Answer: C

9\.Which Map implementation stores its entries in a sorted order based on the natural ordering of its keys or by a Comparator? 

A. HashMap 

B. LinkedHashMap 

C. TreeMap 

D. WeakHashMap 

Correct Answer: C

10\.What does 'Autoboxing' refer to in the context of Java Collections? 

A. The compiler's automatic conversion of a collection into an array. 

B. The automatic conversion between primitive types (like int) and their corresponding wrapper class objects (like Integer) when used with collections. 

C. The process of packaging Java collections into a deployable .jar file. 

D. The automatic serialization of collection objects for storage.

Correct Answer: B

**Advanced Level MCQs**

11\.You are creating a TreeSet<T> where T is a custom class. If T does not implement the Comparable interface, and you do not provide a Comparator to the TreeSet's constructor, what will happen when you try to add an object of type T to the TreeSet? 

A. The elements will be stored in the order they are inserted. 

B. A NullPointerException will be thrown if any element is null. 

C. A ClassCastException will be thrown at runtime when the first element is inserted. 

D. The TreeSet will default to ordering elements based on their hashCode(). 

Correct Answer: C

12\. Which statement accurately highlights a key difference between HashMap and Hashtable? 

A. HashMap is synchronized and Hashtable is not. 

B. Hashtable allows null keys and null values, but HashMap does not. 

C. Hashtable is synchronized and does not allow null keys or values, whereas HashMap is not synchronized and allows one null key and multiple null values. 

D. HashMap maintains insertion order, while Hashtable guarantees no specific order. 

Correct Answer: C

13\.The Collections utility class provides various algorithms. If an attempt is made to compare two incompatible types using a sorting algorithm provided by Collections, which exception is likely to be thrown? 

A. UnsupportedOperationException 

B. NullPointerException 

C. IllegalStateException 

D. ClassCastException 

Correct Answer: D

14\.How does IdentityHashMap fundamentally differ from HashMap in how it compares keys? 

A. IdentityHashMap uses the hashCode() and equals() methods for key comparison, similar to HashMap. 

B. IdentityHashMap compares keys using reference equality (==) instead of object equality (.equals()). 

C. IdentityHashMap allows only primitive types as keys, while HashMap allows objects. 

D. IdentityHashMap is a synchronized map, whereas HashMap is not. 

Correct Answer: B

15\.

The Properties class is a legacy class that extends Hashtable. What is its primary intended use case, differentiating it from a general-purpose HashMap or Hashtable? 

A. It is designed for high-performance, concurrent access in multi-threaded environments. 

B. It is specifically designed to store key-value pairs where both keys and values must be of String type, commonly used for configuration data. 

C. It provides automatic sorting of keys and values. 

D. It allows null keys and null values for flexible data storage. 

Correct Answer: B

16\.You have an ArrayList<String> named myList. To convert this ArrayList into a String[] array in a type-safe manner, which toArray() method signature is the most appropriate to prevent a ClassCastException at runtime for the elements? 

A. myList.toArray() 

B. myList.toArray(new Object) 

C. myList.toArray(new String) 

D. myList.toArray(String.class) 

Correct Answer: C

