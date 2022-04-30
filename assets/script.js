// Utility Functions
var queryAll = element => document.querySelectorAll(element); // Returns a nodeList
var querySel = element => document.querySelector(element); // Returns a node
var getId = element => document.getElementById(element) // Returns an HTML element
var getClass = element => document.getElementsByClassName(element)

// Make sure that queryAll returns a nodeList
// console.log(queryAll('section'))

// Global Variables
var index = 1;

userInput = {
    services: [],
    genre: [],
    type: [],
}

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


// netflix + hulu + kids + movie -> array

let services = userInput.services.join('%2C%20')
let genre = userInput.genre.join('%2C%20')
let type = userInput.type.join('%2C%20')

fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=' + services + '&type=' + type + '&genre=18&output_language=en&language=en')


// Unused Code

// function getGenres() {
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
    //             'X-RapidAPI-Key': '0a6c780725msh1dabbdd8d99ac58p1adc10jsna65e0cb9d583'
    //         }
    //     };
    
    //     fetch('https://streaming-availability.p.rapidapi.com/genres', options)
    //         .then(response => response.json())
    //         .then((response) => {
    //             var genresKeys = Object.keys(response)
    //             var genresValues = Object.values(response)
    //             var genresProps = response
    //             var btnGroups = getClass('btn-group');
    
    //             // Check tos ee that genres props are returned
    //             // console.log(genresProps)
    
    //             // Check to see that genres keys is returned
    //             // console.log(genresKeys)
    
    //             // Check to see that genres values is returned
    //             // console.log(genresValues)
    
    //             for (var i = 0; i < genresKeys.length; i++) {
    //                 // Create the input tag, setting attributes
    //                 var genreInput = document.createElement('input')
    //                 genreInput.setAttribute('type', 'checkbox')
    //                 genreInput.setAttribute('id', genresKeys[i])
    //                 btnGroups[1].appendChild(genreInput)
    
    //                 // Create the label tag, setting attributes
    //                 var genreLabel = document.createElement('label')
    //                 genreLabel.setAttribute('for', genresKeys[i])
    //                 genreLabel.textContent = genresValues[i];
    //                 btnGroups[1].appendChild(genreLabel)
    //             }
    //         })
    //         .catch(err => console.error(err));
// }