// Logic for page
// api: 0ec05b3931msh88228e405c88947p14f250jsn5fa8105f9f8a

// Utility Functions
var queryAll = element => document.querySelectorAll(element); // Returns a nodeList
var querySel = element => document.querySelector(element); // Returns a node
var getId = element => document.getElementById(element) // Returns an HTML element

// Make sure that queryAll returns a nodeList
// console.log(queryAll('section'))

// Global Variables
var index = 1;

// Replace 'element here' with the html parents that have/will have class hidden
var forListeners = queryAll('#landing-page')

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

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
		'X-RapidAPI-Key': '0a6c780725msh1dabbdd8d99ac58p1adc10jsna65e0cb9d583'
	}
};

fetch('https://streaming-availability.p.rapidapi.com/genres', options)
	.then(response => response.json())
	.then((response) => {
        var genres = Object.values(response)
        // Check to see that genres is returned
        // console.log(genres)

        // fo
        var newBtn = document.createElement('button');
        var btnContent = document.textContent(genres)
        newBtn.appendChild(btnContent)

    })
	.catch(err => console.error(err));
