// Utility Functions
var queryAll = element => document.querySelectorAll(element); // Returns a nodeList
var querySel = element => document.querySelector(element); // Returns a node
var getId = element => document.getElementById(element) // Returns an HTML element

// Make sure that queryAll returns a nodeList
// console.log(queryAll('section'))

// Global Variables
var index = 1;

// Replace 'element here' with the html parents that have/will have class hidden
var forListeners = queryAll('element here')

// Loops over all nodes and returns the node that the user is currently on
function currentIndex() {
    for (var i = 0; i < forListeners.length; i++) {
        // If the current node data-question value in the for loop matches index value
        if (forListeners[i].dataset.index === index.toString()) {
            return forListeners[i];
        } 
    }
};

// Function that hides all other noncurrent nodes and shows current node
function showCurrent() {
    // Loops over all nodes and adds class hidden
    for (var i = 0; i < forListeners.length; i++) {
        forListeners[i].setAttribute("class", "hidden");
    };
    // Remove class hidden from current index
    currentIndex().removeAttribute("class");
};

function getApi() {
    var requestUrl = '';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (var i = 0; data.length; i++) {
                console.log(data[i].length)
            }
        })
}

getApi()