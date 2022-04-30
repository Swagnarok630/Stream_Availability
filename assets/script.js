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

// Incomplete logic for populating the genres buttons. Need CSS::before/after code to be done so I know how to target it
function getGenres() {
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
            var genreBtns = queryAll('btn element for the genres here')

            // Check to see that genres is returned
            // console.log(genres)

            // Check to see that genreBtns is a nodeList
            // console.log(genreBtns)

            // ONCE CSS BUTTON CODE HAS BEEN WORKED OUT EDIT CODE TO POPULATE AS INTENDED
            for (var i = 0; i < genres.length; i++) {
                genreBtns[i].value = genres[i];
            }

        })
        .catch(err => console.error(err));
}

// Incomplete logic for pulling services data. Need to set up css/html for the buttons first
function getServices() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
            'X-RapidAPI-Key': '0a6c780725msh1dabbdd8d99ac58p1adc10jsna65e0cb9d583'
        }
    };

    fetch('https://streaming-availability.p.rapidapi.com/countries', options)
        .then(response => response.json())
        .then((response) => {
            var services = Object.keys(response)
            
            // Check to see that services is an array of only the streaming services
            // console.log(services)

            // Looping through the services array
        })
        .catch(err => console.error(err));
}