# Calculator

This calculator is a simplified clone of the Samsung calculator. It uses vanilla Javascript, HTML, and CSS.


#### Unique features:

 * Shows commas on larger numbers
 * Shows answer as problem is being typed or backspaced
 * Deals with percentages, squares, and negative/positive numbers
 * Accepts clicking/pressing on interface and keyboard input


This project gave me more experience dealing with query selectors and event listeners.


#### Lessons:

* CSS - got more experience with flexbox
* Number and operator buttons - got more experience with adding keydown listeners
* Multiple variables for each step - needed to have variables for the original value, the formatted number, the answer of squared and percentaged numbers, whether that number was currently being worked on, which operator was being used, if there was more than one operator, etc. It was a lot to keep track of.
* toLocaleString - got experience using this to format numbers with commas to render on the screen. However, it introduced more complications because I had to keep track of both the formatted and unformatted number since the unformatted number was the one used in operations.
* Backspace function - gave me more experience keeping track of my boolean values (determining which number or operation was being erased). This function was so difficult because I was determined to show the new working answer as each digit was erased, just like a real calculator does.
* Adding @media only for desktop - learned from the last project that it's easier to code for mobile and adjust after for desktop, and doing that for this project made it a lot easier


The backspace function gave me the most grief, simply because I wanted to show the current answer as it was being erased. For now, it can only do three numbers. After the third is erased, it splits up the previous two numbers and operates on them again. I debated using arrays to store all the numbers and answers, and I think doing this may make it possible to backspace four or more numbers. It would also make it possible to have a history button like Samsung's calculator, which would show all previous operations.

I also wanted to allow order of operations. For now, it only solves the problem sequentially, but it would be fun to add more accuracy with order of operations. Storing values in arrays may make this easier.


#### Possible Future Features:

* Ability to backspace four or more numbers
* Button to show history of previous operations
* Order of operations

