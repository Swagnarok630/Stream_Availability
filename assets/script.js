// Utility Functions
var queryAll = element => document.querySelectorAll(element); // Returns a nodeList
var querySel = element => document.querySelector(element); // Returns a node
var getId = element => document.getElementById(element) // Returns an HTML element

// Make sure that queryAll returns a nodeList
// console.log(queryAll('section'))

// Global Variables
var index = 0;

// Function that iterates over section nodeList and returns the current node the user is on.
// The current node is always the index variable value and not the other way around
// Loops over all nodes and adds class hidden // REPLACE queryAll('element here') WITH HTML ELEMENT TAG THAT NEEDS TO HAVE HIDDEN CLASS
function currentIndex() {
    for (var i = 0; i < queryAll('section').length; i++) {
        // If the current node data-question value in the for loop matches index value
        if (queryAll('section')[i].dataset.index === index.toString()) {
            return queryAll('section')[i];
        } 
    }
};

// Function that hides all other noncurrent nodes and shows current node
function posListener() {
    // Loops over all nodes and adds class hidden // REPLACE queryAll('element here') WITH HTML ELEMENT TAG THAT NEEDS TO HAVE HIDDEN CLASS
    for (var i = 0; i < queryAll('section').length; i++) {
        queryAll('section')[i].setAttribute("class", "hidden");
    };
    // Remove class hidden from current index
    currentIndex().removeAttribute("class");
};