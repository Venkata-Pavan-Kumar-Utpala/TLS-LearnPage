// Sample data for 5 courses, each with 5 topics, each topic with 2 questions (with explanation and xp)

export const sampleCourses = [
  {
    title: "Java Programming",
    level: "Intermediate",
    topics: [
      { title: "OOP Concepts", quizId: null },
      { title: "Collections Framework", quizId: null },
      { title: "Exception Handling", quizId: null },
      { title: "Threads", quizId: null },
      { title: "File I/O", quizId: null },
    ],
  },
  {
    title: "Python Programming",
    level: "Intermediate",
    topics: [
      { title: "Lists and Tuples", quizId: null },
      { title: "File Handling", quizId: null },
      { title: "OOP in Python", quizId: null },
      { title: "Dictionaries", quizId: null },
      { title: "Functions", quizId: null },
    ],
  },
  {
    title: "Data Structures & Algorithms",
    level: "Advanced",
    topics: [
      { title: "Arrays and Strings", quizId: null },
      { title: "Linked Lists", quizId: null },
      { title: "Stacks and Queues", quizId: null },
      { title: "Trees and Graphs", quizId: null },
      { title: "Sorting and Searching", quizId: null },
    ],
  },
  {
    title: "MySQL Database",
    level: "Beginner",
    topics: [
      { title: "Database Basics", quizId: null },
      { title: "SQL Queries", quizId: null },
      { title: "Joins and Relationships", quizId: null },
      { title: "Indexes and Optimization", quizId: null },
      { title: "Stored Procedures", quizId: null },
    ],
  },
];

// Quiz questions for each topic (example for a few topics, you should expand for all topics)
export const quizQuestions = {
  // Java Programming Topics
  "OOP Concepts": [
    {
      question: "Which is not a pillar of OOP?",
      options: ["Encapsulation", "Polymorphism", "Abstraction", "Compilation"],
      correctAnswer: 3,
      explanation: "Compilation is not a pillar of OOP.",
      xp: 10,
    },
    {
      question: "What is inheritance in OOP?",
      options: [
        "Acquiring properties from another class",
        "Hiding data",
        "Overloading functions",
        "None",
      ],
      correctAnswer: 0,
      explanation:
        "Inheritance allows a class to acquire properties of another class.",
      xp: 10,
    },
  ],
  "Collections Framework": [
    {
      question: "Which interface is implemented by ArrayList in Java?",
      options: ["Set", "List", "Map", "Queue"],
      correctAnswer: 1,
      explanation: "ArrayList implements the List interface.",
      xp: 10,
    },
    {
      question: "What is the default capacity of ArrayList in Java?",
      options: ["5", "10", "15", "20"],
      correctAnswer: 1,
      explanation: "The default capacity of ArrayList is 10.",
      xp: 10,
    },
  ],
  "Exception Handling": [
    {
      question: "Which keyword is used to handle exceptions in Java?",
      options: ["try", "catch", "finally", "All of the above"],
      correctAnswer: 3,
      explanation: "All three keywords are used in exception handling.",
      xp: 10,
    },
    {
      question: "What is the parent class of all exceptions in Java?",
      options: ["Exception", "Throwable", "Error", "RuntimeException"],
      correctAnswer: 1,
      explanation: "Throwable is the parent class of all exceptions.",
      xp: 10,
    },
  ],
  Threads: [
    {
      question: "Which method is used to start a thread in Java?",
      options: ["run()", "start()", "execute()", "begin()"],
      correctAnswer: 1,
      explanation: "start() method is used to start a thread.",
      xp: 10,
    },
    {
      question: "What is synchronization in Java?",
      options: [
        "Running threads simultaneously",
        "Controlling access to shared resources",
        "Creating multiple threads",
        "Stopping threads",
      ],
      correctAnswer: 1,
      explanation: "Synchronization controls access to shared resources.",
      xp: 10,
    },
  ],
  "File I/O": [
    {
      question: "Which class is used to read files in Java?",
      options: ["FileReader", "BufferedReader", "Scanner", "All of the above"],
      correctAnswer: 3,
      explanation: "All these classes can be used to read files.",
      xp: 10,
    },
    {
      question: "What does the flush() method do?",
      options: [
        "Closes the file",
        "Forces buffered output to be written",
        "Reads the file",
        "Deletes the file",
      ],
      correctAnswer: 1,
      explanation: "flush() forces buffered output to be written.",
      xp: 10,
    },
  ],

  // Python Programming Topics
  "Lists and Tuples": [
    {
      question: "Which of the following is mutable in Python?",
      options: ["List", "Tuple", "String", "Integer"],
      correctAnswer: 0,
      explanation: "Lists are mutable in Python, while tuples are immutable.",
      xp: 10,
    },
    {
      question: "How do you create a tuple with one element in Python?",
      options: ["(1)", "(1,)", "[1]", "{1}"],
      correctAnswer: 1,
      explanation: "A comma is needed to create a single-element tuple.",
      xp: 10,
    },
  ],
  "File Handling": [
    {
      question: "Which function is used to open a file in Python?",
      options: ["open()", "file()", "read()", "load()"],
      correctAnswer: 0,
      explanation: "open() function is used to open files in Python.",
      xp: 10,
    },
    {
      question: "What mode is used to open a file for writing in Python?",
      options: ["'r'", "'w'", "'a'", "'x'"],
      correctAnswer: 1,
      explanation: "'w' mode opens a file for writing.",
      xp: 10,
    },
  ],
  "OOP in Python": [
    {
      question: "Which keyword is used to create a class in Python?",
      options: ["class", "def", "function", "object"],
      correctAnswer: 0,
      explanation: "The 'class' keyword is used to create a class in Python.",
      xp: 10,
    },
    {
      question: "What is the purpose of the __init__ method in Python?",
      options: [
        "To delete an object",
        "To initialize an object",
        "To copy an object",
        "To print an object",
      ],
      correctAnswer: 1,
      explanation:
        "The __init__ method is used to initialize an object when it's created.",
      xp: 10,
    },
  ],
  Dictionaries: [
    {
      question: "How do you create an empty dictionary in Python?",
      options: ["{}", "[]", "()", "dict()"],
      correctAnswer: 0,
      explanation: "An empty dictionary is created using {} or dict().",
      xp: 10,
    },
    {
      question: "Which method is used to get all keys from a dictionary?",
      options: ["keys()", "values()", "items()", "get()"],
      correctAnswer: 0,
      explanation: "The keys() method returns all keys from a dictionary.",
      xp: 10,
    },
  ],
  Functions: [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "func", "define"],
      correctAnswer: 1,
      explanation: "The 'def' keyword is used to define a function in Python.",
      xp: 10,
    },
    {
      question: "What does the return statement do in a function?",
      options: [
        "Ends the function",
        "Returns a value",
        "Both A and B",
        "None of the above",
      ],
      correctAnswer: 2,
      explanation:
        "The return statement both ends the function and returns a value.",
      xp: 10,
    },
  ],
  "OOP in Python": [
    {
      question: "Which method is called when an object is created in Python?",
      options: ["__init__", "__new__", "__create__", "__start__"],
      correctAnswer: 0,
      explanation: "__init__ is the constructor method in Python.",
      xp: 10,
    },
    {
      question: "What is self in Python?",
      options: [
        "A keyword",
        "A reference to the current instance",
        "A built-in function",
        "A data type",
      ],
      correctAnswer: 1,
      explanation: "self refers to the current instance of the class.",
      xp: 10,
    },
  ],
  Dictionaries: [
    {
      question: "How do you create an empty dictionary in Python?",
      options: ["{}", "[]", "()", "dict()"],
      correctAnswer: 0,
      explanation: "Empty curly braces {} create an empty dictionary.",
      xp: 10,
    },
    {
      question: "Which method is used to get all keys from a dictionary?",
      options: ["keys()", "values()", "items()", "get()"],
      correctAnswer: 0,
      explanation: "keys() method returns all keys from a dictionary.",
      xp: 10,
    },
  ],
  Functions: [
    {
      question: "How do you define a function in Python?",
      options: ["def func():", "function func():", "func():", "define func():"],
      correctAnswer: 0,
      explanation: "def keyword is used to define functions in Python.",
      xp: 10,
    },
    {
      question: "What is a lambda function in Python?",
      options: [
        "A named function",
        "An anonymous function",
        "A built-in function",
        "A class method",
      ],
      correctAnswer: 1,
      explanation: "Lambda functions are anonymous functions in Python.",
      xp: 10,
    },
  ],

  // Data Structures & Algorithms Topics
  "Arrays and Strings": [
    {
      question:
        "What is the time complexity of accessing an element in an array?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correctAnswer: 0,
      explanation: "Array access by index is constant time O(1).",
      xp: 10,
    },
    {
      question: "Which algorithm is used to reverse a string in-place?",
      options: ["Two pointers", "Binary search", "Merge sort", "DFS"],
      correctAnswer: 0,
      explanation:
        "Two pointers technique is commonly used to reverse strings.",
      xp: 10,
    },
  ],
  "Linked Lists": [
    {
      question:
        "What is the time complexity of inserting at the beginning of a linked list?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      correctAnswer: 0,
      explanation: "Insertion at the beginning of a linked list is O(1).",
      xp: 10,
    },
    {
      question: "What is a circular linked list?",
      options: [
        "A list where last node points to first node",
        "A list with no nodes",
        "A list with one node",
        "A list with duplicate values",
      ],
      correctAnswer: 0,
      explanation:
        "In circular linked list, the last node points to the first node.",
      xp: 10,
    },
  ],
  "Stacks and Queues": [
    {
      question: "What principle does a stack follow?",
      options: ["LIFO", "FIFO", "Random", "Priority"],
      correctAnswer: 0,
      explanation: "Stack follows Last In First Out (LIFO) principle.",
      xp: 10,
    },
    {
      question: "What principle does a queue follow?",
      options: ["LIFO", "FIFO", "Random", "Priority"],
      correctAnswer: 1,
      explanation: "Queue follows First In First Out (FIFO) principle.",
      xp: 10,
    },
  ],
  "Trees and Graphs": [
    {
      question:
        "What is the maximum number of children a binary tree node can have?",
      options: ["1", "2", "3", "Unlimited"],
      correctAnswer: 1,
      explanation: "A binary tree node can have at most 2 children.",
      xp: 10,
    },
    {
      question: "Which traversal visits the root node first?",
      options: ["Inorder", "Preorder", "Postorder", "Level order"],
      correctAnswer: 1,
      explanation: "Preorder traversal visits the root node first.",
      xp: 10,
    },
  ],
  "Sorting and Searching": [
    {
      question: "What is the time complexity of binary search?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 1,
      explanation: "Binary search has O(log n) time complexity.",
      xp: 10,
    },
    {
      question:
        "Which sorting algorithm has the best average case time complexity?",
      options: [
        "Bubble sort",
        "Quick sort",
        "Selection sort",
        "Insertion sort",
      ],
      correctAnswer: 1,
      explanation: "Quick sort has O(n log n) average case time complexity.",
      xp: 10,
    },
  ],

  // MySQL Database Topics
  "Database Basics": [
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Standard Query Language",
        "System Query Language",
      ],
      correctAnswer: 0,
      explanation: "SQL stands for Structured Query Language.",
      xp: 10,
    },
    {
      question: "Which command is used to create a new database?",
      options: [
        "CREATE DATABASE",
        "NEW DATABASE",
        "MAKE DATABASE",
        "ADD DATABASE",
      ],
      correctAnswer: 0,
      explanation: "CREATE DATABASE command is used to create a new database.",
      xp: 10,
    },
  ],
  "SQL Queries": [
    {
      question: "Which command is used to retrieve data from a database?",
      options: ["SELECT", "GET", "FETCH", "RETRIEVE"],
      correctAnswer: 0,
      explanation: "SELECT command is used to retrieve data from a database.",
      xp: 10,
    },
    {
      question: "Which clause is used to filter records in SQL?",
      options: ["WHERE", "FILTER", "HAVING", "CONDITION"],
      correctAnswer: 0,
      explanation: "WHERE clause is used to filter records in SQL.",
      xp: 10,
    },
  ],
  "Joins and Relationships": [
    {
      question: "Which join returns all records from both tables?",
      options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
      correctAnswer: 3,
      explanation: "FULL OUTER JOIN returns all records from both tables.",
      xp: 10,
    },
    {
      question: "What is a foreign key?",
      options: [
        "A key from another table",
        "A primary key",
        "An index",
        "A constraint",
      ],
      correctAnswer: 0,
      explanation:
        "A foreign key is a key that references the primary key of another table.",
      xp: 10,
    },
  ],
  "Indexes and Optimization": [
    {
      question: "What is the purpose of an index in a database?",
      options: [
        "To speed up queries",
        "To store data",
        "To create tables",
        "To delete records",
      ],
      correctAnswer: 0,
      explanation: "Indexes are used to speed up database queries.",
      xp: 10,
    },
    {
      question: "Which command is used to create an index?",
      options: ["CREATE INDEX", "ADD INDEX", "NEW INDEX", "MAKE INDEX"],
      correctAnswer: 0,
      explanation: "CREATE INDEX command is used to create an index.",
      xp: 10,
    },
  ],
  "Stored Procedures": [
    {
      question: "What is a stored procedure?",
      options: ["A precompiled SQL code", "A table", "An index", "A database"],
      correctAnswer: 0,
      explanation:
        "A stored procedure is precompiled SQL code stored in the database.",
      xp: 10,
    },
    {
      question: "Which command is used to execute a stored procedure?",
      options: ["CALL", "EXECUTE", "RUN", "START"],
      correctAnswer: 0,
      explanation: "CALL command is used to execute a stored procedure.",
      xp: 10,
    },
  ],
};
