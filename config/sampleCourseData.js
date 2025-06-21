// Sample data for 5 courses, each with 5 topics, each topic with 2 questions (with explanation and xp)

export const sampleCourses = [
  {
    title: "JavaScript Programming",
    level: "Beginner",
    topics: [
      { title: "Variables and Data Types", quizId: null },
      { title: "Functions and Scope", quizId: null },
      { title: "DOM Manipulation", quizId: null },
      { title: "Arrays", quizId: null },
      { title: "Objects", quizId: null },
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
    title: "C Programming",
    level: "Beginner",
    topics: [
      { title: "Control Flow", quizId: null },
      { title: "Pointers", quizId: null },
      { title: "Structures", quizId: null },
      { title: "Arrays", quizId: null },
      { title: "Functions", quizId: null },
    ],
  },
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
    title: "C++ Programming",
    level: "Advanced",
    topics: [
      { title: "Classes and Objects", quizId: null },
      { title: "Inheritance and Polymorphism", quizId: null },
      { title: "STL (Standard Template Library)", quizId: null },
      { title: "Templates", quizId: null },
      { title: "Exception Handling", quizId: null },
    ],
  },
];

// Quiz questions for each topic (example for a few topics, you should expand for all 75 topics)
export const quizQuestions = {
  "Variables and Data Types": [
    {
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Undefined"],
      correctAnswer: 2,
      explanation:
        "Float is not a JavaScript data type; the correct type is Number.",
      xp: 10,
    },
    {
      question: "What is the output of typeof null in JavaScript?",
      options: ["object", "null", "undefined", "number"],
      correctAnswer: 0,
      explanation:
        "typeof null returns 'object' due to a historical bug in JavaScript.",
      xp: 10,
    },
  ],
  "Functions and Scope": [
    {
      question: "How do you define a function in JavaScript?",
      options: [
        "function myFunc() {}",
        "def myFunc() {}",
        "func myFunc() {}",
        "function:myFunc() {}",
      ],
      correctAnswer: 0,
      explanation:
        "JavaScript uses the 'function' keyword to define functions.",
      xp: 10,
    },
    {
      question:
        "What is the scope of a variable declared with 'let' inside a function?",
      options: ["Global", "Function", "Block", "Module"],
      correctAnswer: 2,
      explanation: "'let' variables are block scoped.",
      xp: 10,
    },
  ],
  "DOM Manipulation": [
    {
      question: "Which method is used to select an element by its ID?",
      options: [
        "getElementById",
        "querySelectorAll",
        "getElementsByClassName",
        "getElementByTagName",
      ],
      correctAnswer: 0,
      explanation: "getElementById is used to select an element by its ID.",
      xp: 10,
    },
    {
      question:
        "Which property is used to change the content of an HTML element in JavaScript?",
      options: ["innerHTML", "content", "value", "textContent"],
      correctAnswer: 0,
      explanation:
        "innerHTML is commonly used to change the content of an element.",
      xp: 10,
    },
  ],
  Arrays: [
    {
      question: "How do you create an array in JavaScript?",
      options: ["var arr = []", "var arr = {}", "var arr = ()", "var arr = <>"],
      correctAnswer: 0,
      explanation: "Square brackets are used to create arrays in JavaScript.",
      xp: 10,
    },
    {
      question: "Which method adds an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correctAnswer: 0,
      explanation: "push() adds an element to the end of an array.",
      xp: 10,
    },
  ],
  Objects: [
    {
      question: "How do you define an object in JavaScript?",
      options: ["var obj = {}", "var obj = []", "var obj = ()", "var obj = <>"],
      correctAnswer: 0,
      explanation: "Curly braces are used to define objects in JavaScript.",
      xp: 10,
    },
    {
      question: "How do you access a property of an object?",
      options: [
        "obj.property",
        "obj[property]",
        "Both A and B",
        "obj->property",
      ],
      correctAnswer: 2,
      explanation:
        "Both dot and bracket notation can be used to access object properties.",
      xp: 10,
    },
  ],
  "Lists and Tuples": [
    {
      question: "Which of these is mutable in Python?",
      options: ["List", "Tuple", "Both", "None"],
      correctAnswer: 0,
      explanation: "Lists are mutable, tuples are immutable in Python.",
      xp: 10,
    },
    {
      question: "How do you create a tuple in Python?",
      options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "tuple[1,2,3]"],
      correctAnswer: 0,
      explanation: "Parentheses are used to create tuples.",
      xp: 10,
    },
  ],
  "File Handling": [
    {
      question: "Which function is used to open a file in Python?",
      options: ["open()", "file()", "read()", "with()"],
      correctAnswer: 0,
      explanation: "open() is used to open files in Python.",
      xp: 10,
    },
    {
      question: "What does 'with open('file.txt') as f:' do?",
      options: [
        "Opens file and closes automatically",
        "Opens file only",
        "Closes file only",
        "Deletes file",
      ],
      correctAnswer: 0,
      explanation:
        "'with' context manager opens and closes the file automatically.",
      xp: 10,
    },
  ],
  "OOP in Python": [
    {
      question: "How do you define a class in Python?",
      options: [
        "class MyClass:",
        "def MyClass:",
        "MyClass = class()",
        "class: MyClass",
      ],
      correctAnswer: 0,
      explanation: "The 'class' keyword is used to define a class in Python.",
      xp: 10,
    },
    {
      question: "What is 'self' in Python classes?",
      options: [
        "A reference to the instance",
        "A reference to the class",
        "A global variable",
        "A decorator",
      ],
      correctAnswer: 0,
      explanation: "'self' refers to the instance of the class.",
      xp: 10,
    },
  ],
  Dictionaries: [
    {
      question: "How do you define a dictionary in Python?",
      options: ["{'a': 1}", "[1, 2, 3]", "(1, 2, 3)", "dict(1,2,3)"],
      correctAnswer: 0,
      explanation: "Curly braces with key-value pairs define a dictionary.",
      xp: 10,
    },
    {
      question: "How do you access a value in a dictionary?",
      options: ["dict['key']", "dict.key", "dict->key", "dict['value']"],
      correctAnswer: 0,
      explanation: "Use square brackets with the key to access a value.",
      xp: 10,
    },
  ],
  Functions: [
    {
      question: "How do you define a function in Python?",
      options: [
        "def my_func():",
        "function my_func()",
        "func my_func()",
        "def: my_func()",
      ],
      correctAnswer: 0,
      explanation: "The 'def' keyword is used to define functions in Python.",
      xp: 10,
    },
    {
      question:
        "What is the default return value of a function that doesn't return anything?",
      options: ["None", "0", "False", "Empty string"],
      correctAnswer: 0,
      explanation:
        "Python functions return None by default if no return statement is present.",
      xp: 10,
    },
  ],
  "Control Flow": [
    {
      question: "Which statement is used for decision making in C?",
      options: ["if", "for", "while", "switch"],
      correctAnswer: 0,
      explanation: "'if' is used for decision making in C.",
      xp: 10,
    },
    {
      question: "Which loop is used to repeat a block of code in C?",
      options: ["for", "if", "switch", "goto"],
      correctAnswer: 0,
      explanation: "'for' loop is commonly used for repetition.",
      xp: 10,
    },
  ],
  Pointers: [
    {
      question: "What does a pointer store?",
      options: ["Value", "Address", "Function", "None"],
      correctAnswer: 1,
      explanation: "Pointers store memory addresses.",
      xp: 10,
    },
    {
      question: "How do you declare a pointer in C?",
      options: ["int *p;", "int p*;", "int &p;", "pointer int p;"],
      correctAnswer: 0,
      explanation: "Use * to declare a pointer.",
      xp: 10,
    },
  ],
  Structures: [
    {
      question: "Which keyword is used to define a structure in C?",
      options: ["struct", "structure", "class", "define"],
      correctAnswer: 0,
      explanation: "'struct' is used to define structures.",
      xp: 10,
    },
    {
      question: "How do you access a member of a structure?",
      options: [
        "struct.member",
        "struct->member",
        "struct:member",
        "struct.member()",
      ],
      correctAnswer: 0,
      explanation: "Use dot operator to access structure members.",
      xp: 10,
    },
  ],
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
      question: "Which interface is not part of Java Collections Framework?",
      options: ["List", "Set", "Map", "Array"],
      correctAnswer: 3,
      explanation: "Array is not an interface in Java Collections Framework.",
      xp: 10,
    },
    {
      question: "Which class implements List interface?",
      options: ["ArrayList", "HashMap", "HashSet", "TreeMap"],
      correctAnswer: 0,
      explanation: "ArrayList implements the List interface.",
      xp: 10,
    },
  ],
  "Exception Handling": [
    {
      question: "Which keyword is used to handle exceptions in Java?",
      options: ["try", "catch", "throw", "All of the above"],
      correctAnswer: 3,
      explanation: "All these keywords are used in exception handling.",
      xp: 10,
    },
    {
      question: "What is the superclass of all exceptions in Java?",
      options: ["Throwable", "Exception", "Error", "RuntimeException"],
      correctAnswer: 0,
      explanation: "Throwable is the superclass of all exceptions.",
      xp: 10,
    },
  ],
  Threads: [
    {
      question: "Which method starts a thread in Java?",
      options: ["start()", "run()", "init()", "execute()"],
      correctAnswer: 0,
      explanation: "start() is used to begin thread execution.",
      xp: 10,
    },
    {
      question: "Which interface must be implemented to create a thread?",
      options: ["Runnable", "Threadable", "Callable", "Executor"],
      correctAnswer: 0,
      explanation: "Runnable interface must be implemented.",
      xp: 10,
    },
  ],
  "Classes and Objects": [
    {
      question: "What is an object in C++?",
      options: ["Instance of a class", "A function", "A variable", "A pointer"],
      correctAnswer: 0,
      explanation: "An object is an instance of a class.",
      xp: 10,
    },
    {
      question: "How do you define a class in C++?",
      options: [
        "class MyClass {}",
        "MyClass = class()",
        "def MyClass()",
        "class: MyClass",
      ],
      correctAnswer: 0,
      explanation: "Use 'class' keyword to define a class in C++.",
      xp: 10,
    },
  ],
  "Inheritance and Polymorphism": [
    {
      question: "Which type of inheritance is not supported in C++?",
      options: ["Multiple", "Multilevel", "Hierarchical", "Hybrid"],
      correctAnswer: 0,
      explanation:
        "C++ supports all types of inheritance, but some languages do not support multiple inheritance.",
      xp: 10,
    },
    {
      question: "What is polymorphism?",
      options: [
        "Ability to take many forms",
        "Data hiding",
        "Inheritance",
        "Encapsulation",
      ],
      correctAnswer: 0,
      explanation: "Polymorphism means the ability to take many forms.",
      xp: 10,
    },
  ],
  "STL (Standard Template Library)": [
    {
      question: "Which STL component is used for algorithms?",
      options: ["vector", "map", "algorithm", "set"],
      correctAnswer: 2,
      explanation: "'algorithm' is the STL component for algorithms.",
      xp: 10,
    },
    {
      question: "Which container is not part of STL?",
      options: ["vector", "list", "array", "stack"],
      correctAnswer: 2,
      explanation: "'array' is not a standard STL container in C++98.",
      xp: 10,
    },
  ],
  Templates: [
    {
      question: "What is a template in C++?",
      options: [
        "Blueprint for functions/classes",
        "A data type",
        "A variable",
        "A pointer",
      ],
      correctAnswer: 0,
      explanation:
        "Templates are blueprints for creating generic classes or functions.",
      xp: 10,
    },
    {
      question: "Which keyword is used to define a template?",
      options: ["template", "define", "class", "typename"],
      correctAnswer: 0,
      explanation: "'template' keyword is used to define templates.",
      xp: 10,
    },
  ],
  "Exception Handling": [
    {
      question: "Which keyword is used to handle exceptions in C++?",
      options: ["try", "catch", "throw", "All of the above"],
      correctAnswer: 3,
      explanation: "All these keywords are used in exception handling in C++.",
      xp: 10,
    },
    {
      question: "What is the base class for all exceptions in C++?",
      options: ["exception", "error", "throwable", "runtime_error"],
      correctAnswer: 0,
      explanation: "'exception' is the base class for all exceptions in C++.",
      xp: 10,
    },
  ],
  "File I/O": [
    {
      question: "Which function is used to open a file in C?",
      options: ["fopen()", "open()", "file()", "read()"],
      correctAnswer: 0,
      explanation: "fopen() is used to open files in C.",
      xp: 10,
    },
    {
      question: "Which mode is used to open a file for writing in C?",
      options: ["r", "w", "a", "rw"],
      correctAnswer: 1,
      explanation: "'w' mode opens a file for writing.",
      xp: 10,
    },
  ],
};
