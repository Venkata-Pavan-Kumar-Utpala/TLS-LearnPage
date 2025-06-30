Beginner Questions

1\.**What is multithreading in Java?** A) A feature that allows sequential execution of program parts. B) A feature that allows concurrent execution of two or more parts of a program for maximum CPU utilization. C) A method to run multiple separate programs on different machines [None]. D) A way to compile Java code into machine code faster [None]. **Correct Answer:** B

2\.**Which statement about threads within a single Java process is true?** A) Each thread has its own separate memory space [None]. B) Threads do not share any resources [None]. C) All threads within a process share the same memory space but execute independently. D) Threads can only communicate through network sockets [None]. **Correct Answer:** C

3\.**Which of the following is NOT a valid way to create a thread in Java?** A) Extending the Thread class. B) Implementing the Runnable interface. C) Extending the Object class [None]. D) Both A and B are valid ways. **Correct Answer:** C

4\.**What is the significance of the "main thread" in a Java program?** A) It is explicitly created by the developer for multitasking [None]. B) It is automatically created when the program starts and serves as the parent thread from which other threads are typically spawned. C) It is a low-priority daemon thread. D) It is only present in multithreaded applications. **Correct Answer:** B

5\.**What happens if you call the run() method directly on a Thread object instead of start()?** A) A new thread is started successfully [None]. B) An IllegalThreadStateException is thrown immediately [None]. C) The run() method executes in the current thread, like a regular method call, and no new thread is started. D) The program enters an infinite loop [None]. **Correct Answer:** C

Intermediate Questions

6\.**In the life cycle of a Java thread, what state does a thread enter after its start() method is invoked on a New/Born thread?** A) Running. B) Waiting. C) Dead/Terminated. D) Runnable. **Correct Answer:** D

7\.**What is the default priority assigned to a new Java thread?** A) MIN\_PRIORITY (1). B) MAX\_PRIORITY (10). C) NORM\_PRIORITY (5). D) It inherits the priority of the operating system's process [None]. **Correct Answer:** C

8\.**What is the primary effect of calling the join() method on a thread (e.g., threadX.join())?** A) It causes threadX to pause its execution [None]. B) It causes the current thread (the one calling join()) to pause its execution until threadX finishes. C) It merges threadX with the current thread into a single execution unit [None]. D) It checks if threadX is still running without pausing. **Correct Answer:** B

9\.**Which statement accurately describes the Thread.sleep() method?** A) It releases the monitor lock held by the current thread. B) It causes the current thread to pause execution for a specified number of milliseconds. C) It requires a synchronized block for its invocation. D) It can only be called on a thread that is in the Runnable state [None]. **Correct Answer:** B

10\.**If you try to call the start() method on a Thread object more than once, what will happen?** A) The thread will restart its execution from the beginning [None]. B) An IllegalThreadStateException will be thrown. C) The second call will be ignored [None]. D) The thread will enter a waiting state [None]. **Correct Answer:** B

Advanced / Tough Questions

11\.**Why is synchronization crucial when multiple threads access shared resources in Java?** A) To ensure that threads execute in a predetermined sequential order. B) To prevent deadlocks from ever occurring. C) To avoid data inconsistency and race conditions that can arise from concurrent modifications. D) To increase the number of threads that can run simultaneously 

[None]. **Correct Answer:** C

12\.**Consider a scenario where Thread-1 has acquired a lock on Resource-A and is waiting for Resource-B, while Thread-2 has acquired a lock on Resource-B and is waiting for Resource-A. What is this situation called?** A) Livelock [None]. B) Starvation [None]. C) Deadlock. D) Race Condition. **Correct Answer:** C

13\.**Which of the following is a recommended approach to prevent deadlocks?** A) Acquiring locks in a random order. B) Maximizing the use of nested synchronized blocks. C) Always acquiring locks in a fixed, consistent order. D) Avoiding the use of synchronized keywords entirely [None]. **Correct Answer:** C

14\.**Which characteristic accurately describes a Daemon thread in Java?** A) It has the highest priority and keeps the JVM alive. B) It runs in the background, providing services to user threads, and automatically terminates when all non-daemon (user) threads finish. C) It is the default type for all threads created in Java. D) It must be explicitly stopped by the developer. **Correct Answer:** B

15\.**What is a key difference between Object.wait() and Thread.sleep()?** A) Thread.sleep() releases the monitor lock, while Object.wait() does not. B) Object.wait() can be called anywhere in the code, whereas Thread.sleep() requires a synchronized block. C) Object.wait() must be called within a synchronized block/method and releases the monitor lock, allowing other threads to acquire it, while Thread.sleep() does not release the monitor lock. D) Thread.sleep() resumes execution only when notify() or notifyAll() is called on the object. **Correct Answer:** C

16\.**Why are wait(), notify(), and notifyAll() methods part of the Object class rather than the Thread class?** A) They are used for general object manipulation, not specifically for threads [None]. B) They allow threads to communicate and coordinate based on the state of a shared object's monitor (lock), which is associated with the object itself. C) They are inherited by all classes, ensuring that any object can be used for thread communication [None]. D) It's a design choice that has no functional significance [None]. **Correct Answer:** B

17\.**When implementing a thread by extending the Thread class, why can't you override the setName() and getName() methods?** A) They are declared static in the Thread class [None]. B) They are declared abstract in the Thread class [None]. C) They are declared final in the Thread class. D) They are implicitly overridden by the JVM [None]. **Correct Answer:** C

18\.**In the context of wait() and notify(), what happens if notify() is called before wait() on a given object?** A) The notify() call is remembered, and the next wait() call on that object will return immediately [None]. B) The notify() call is ignored, and the subsequent wait() call will cause the thread to wait indefinitely unless another notify() is called [None]. C) An IllegalMonitorStateException is immediately thrown [None]. D) The program enters a busy-waiting state [None]. **Correct Answer:** B.

20\.**In inter-thread communication using wait() and notify()/notifyAll(), what is the purpose of the notifyAll() method compared to notify()?** A) notifyAll() wakes up a randomly chosen thread waiting on the object, while notify() wakes up all threads. B) notifyAll() wakes up all threads currently waiting on the object's monitor, while notify() wakes up only one arbitrary thread waiting on that object. C) notifyAll() works only with daemon threads, while notify() works with user threads [None]. D) There is no functional difference between notify() and notifyAll() [None]. **Correct Answer:** B

21\.**When creating a thread by implementing the Runnable interface, how is the Runnable object associated with a Thread?** A) The Runnable object is directly started using its run() method. B) The Runnable object is passed as an argument to the constructor of a new Thread instance, which is then started. C) The Runnable object extends the Thread class internally D) The Runnable object is automatically detected by the thread scheduler **Correct Answer:** B

22\.**Referencing the example of inter-thread communication between CountryThread and CapitalThread what mechanism ensures that one country name is printed, then one capital, and so on, in an alternating fashion?** A) Thread priorities are set to ensure alternating execution [None]. B) The threads continuously check a shared boolean flag (isCountryTurn) and use wait() to pause and notify() to signal the other thread after completing their turn. C) The sleep() method is used to precisely time the output of each thread D) The operating system's thread scheduler guarantees this specific order [. **Correct Answer:** B

