CORE JAVA NOTES -04

ARRAYS

In Java, an **array** is a powerful data structure that allows developers to store multiple values of the same data type under a single variable name. Arrays are particularly useful when working with large volumes of data where the same kind of processing is applied to each element, such as storing grades, temperatures, or IDs.

**Definition and Characteristics**

An array is a fixed-size collection of elements of the same type (primitive or object), stored in contiguous memory. Once declared, its size cannot change.

**Understanding Arrays in Java with Real-Life Examples**

Arrays simplify managing multiple related values—like storing grocery items, weekly temperatures, or game scores—avoiding the need for multiple variables.

Let’s explore how arrays work in Java by breaking down key concepts and aligning them with **real-world scenarios**.
### <a name="_heading=h.29na4k5heuwj"></a>**1) Array Initialization in Java**
Arrays can be initialized in two ways:

- **a. Static Initialization**\
  Values are assigned at the time of declaration.

**int[] nums = {10, 20, 30};**

- **b. Dynamic Initialization**\
  Size is defined first; values are assigned later.

int[] nums = new int[3];

nums[0] = 10;

nums[1] = 20;

nums[2] = 30;

**2) Declaration Without Size in the Variable Section**

Int ar[]= new int[size];

**3) Placement of Brackets**

Both declarations are valid:

int[] nums;

int nums[];

**4) Arrays Are Index-Based (Starting from 0)**

Every array element is stored with an index, beginning from **0**.

int[] nums = {10, 20, 30};

System.out.println(nums[1]); // Outputs 20

**5) Using .length Attribute**

Java arrays come with a built-in property called .length that tells you the number of elements in the array.

System.out.println(ar.lenght)

**6) Accessing Individual Elements**

int[] scores = {90, 80, 70};

System.out.println(scores[0]); // Outputs 90

->To print the first element of the array:

System.out.println(ar[0]);

->To print the last element of the array:

System.out.println(ar[ar.length-1]);

->To print all the elements of the array in forward direction:

for(int i=0; i<ar.length ; i++)

System.out.println(ar[i]);

->To print the elements of the array in backward direction(last to first):

for(int i=0; i<ar.length ; i++)

->To find the sum of all the elements of the array:

int sum=0;

for(int i=0; i<ar.length ; i++)

sum+=ar[i];

System.out.println(“Sum of array elements is: “+sum);

->Find the max and min of an array.

int max,min;

//assume that the first value of the array itself as the min and max of all the elements of array.

max=min=ar[0];

//check if in remaining indexes has any value lesser than the current min or a higher value larger

than the current max, then update the min or max with that value.

**What is Bubble Sort?**

Bubble Sort is a simple sorting algorithm that repeatedly compares and swaps adjacent elements if they’re in the wrong order. With each pass, larger elements “bubble” to the end.

**Bubble Sort Code in Java**

public class BubbleSort {

`    `public static void main(String[] args) {

`        `int[] arr = {64, 25, 12, 22, 11};

`        `for (int i = 0; i < arr.length - 1; i++) {

`            `for (int j = 0; j < arr.length - 1 - i; j++) {

`                `if (arr[j] > arr[j + 1]) {

`                    `int temp = arr[j];

`                    `arr[j] = arr[j + 1];

`                    `arr[j + 1] = temp; } }}

`        `for (int num : arr) {

`            `System.out.print(num + " ");

`        `}}}
## What is Linear Search?
**Linear Search** (also known as Sequential Search) 

**Linear Search** is a simple searching algorithm that checks each element in a list one by one until the target element is found or the list ends.

public class LinearSearch {

`    `public static void main(String[] args) {

`        `int[] arr = {10, 25, 30, 45, 50};

`        `int target = 30;

`        `boolean found = false;

`        `for (int i = 0; i < arr.length; i++) {

`            `if (arr[i] == target) {

`                `System.out.println("Element found at index: " + i);

`                `found = true;

`                `break;

`            `}}

`        `if (!found) {

`            `System.out.println("Element not found.");

`        `}}}

## 

### 
### Enhanced and Real-Life Inspired Programming Questions
1. **Find the second highest scorer in a list of exam scores.**
   1. ➤ *Scenario:* You’re developing a leaderboard feature in an online quiz app to display the top two scorers.
1. **Convert an integer into its 32-bit binary format and store it in an array.**
   1. ➤ *Scenario:* You’re building a low-level debugging tool that shows how numbers are stored in memory.
1. **Sort an array of prices using Selection Sort.**
   1. ➤ *Scenario:* A store app wants to list prices from lowest to highest using a basic selection sort algorithm.

1. Simulate a countdown timer using arrays (e.g., 10 to 0)

1. Search for a customer ID using linear search in a database array.

1. Rotate the elements of an array to simulate a queue system (e.g., in a hospital or amusement park).

1. Find the average temperature of a week using an array.

1. Count how many students passed or failed using an array of marks**.**

