// Utility Functions
var queryAll = element => document.querySelectorAll(element); // Returns a nodeList
var querySel = element => document.querySelector(element); // Returns a node
var getId = element => document.getElementById(element) // Returns an HTML element
var getClass = element => document.getElementsByClassName(element)

// Make sure that queryAll returns a nodeList
// console.log(queryAll('section'))

// Global Variables
var index = 1;
var randomizedPageNumber = [];

userInput = {
    services: ['netflix'],
    genre: ['4'],
    type: ['movie'],
}

// API KEYS
var chase = '0ec05b3931msh88228e405c88947p14f250jsn5fa8105f9f8a'
var tony = '0a6c780725msh1dabbdd8d99ac58p1adc10jsna65e0cb9d583'
var darryl = 'b1772a2b66msh8fe7f52298f657ep156885jsn20747bc84c72'

var apiKeys = [chase, tony, darryl]

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

function randomizePage() {
    var options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
            'X-RapidAPI-Key': ''
        }
    };

// Is this still needed? I thought we got rid of dynamic genre population due to key usage
//     fetch('https://streaming-availability.p.rapidapi.com/genres', options)
//         .then(response => response.json())
//         .then((response) => {
//             var genres = Object.values(response)
//             var genreBtns = queryAll('btn element for the genres here')

//             // Check to see that genres is returned
//             // console.log(genres)

//             // Check to see that genreBtns is a nodeList
//             // console.log(genreBtns)
            
//             // ONCE CSS BUTTON CODE HAS BEEN WORKED OUT EDIT CODE TO POPULATE AS INTENDED
//             for (var i = 0; i < genres.length; i++) {
//                 genreBtns[i].value = genres[i];

    var services = userInput.services.join('%2C%20')
    var genre = userInput.genre.join('%2C%20')
    var type = userInput.type.join('%2C%20')

    fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=' + services + '&type=' + type + '&genre=' + genre + '&output_language=en&language=en', options)
        .then(response => {
            // Looping through apiKeys
            for (var i = 0; i < apiKeys.length; i++) {
                // If the current API key is equal to the key we already have, continue aka skip current key
                if (apiKeys[i] === options.headers["X-RapidAPI-Key"]) {
                    continue;
                // If the response comes out invalid
                } else if (!response.ok) {
                    // Set the current iteration key equal to the options API key
                    options.headers["X-RapidAPI-Key"] = apiKeys[i];
                    // Fetch with current key
                    fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=' + services + '&type=' + type + '&genre=' + genre + '&output_language=en&language=en', options)
                } else {
                    // Once the fetch request is valid, we will json that data
                    response.json()
                    // We will also break the loop so it doesn't keep trying to loop until apiKeys.length
                    break;
                }
            }
        })
        .then((response) => {
            randomizedPageNumber.push(Math.floor((Math.random() * response.total_pages) + 1))
        })
        .catch(err => console.error(err));
}

randomizePage();

function userRequest() {
    var options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
            'X-RapidAPI-Key': darryl
        }
    };

    var services = userInput.services.join('%2C%20')
    var genre = userInput.genre.join('%2C%20')
    var type = userInput.type.join('%2C%20')

    console.log(randomizedPageNumber)
    fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=' + services + '&type=' + type + '&genre=' + genre + '&page=' + randomizedPageNumber + '&output_language=en&language=en', options)
        .then(response => response.json())
        
        .then((response) => {

            var services = Object.keys(response)
            
            // Check to see that services is an array of only the streaming services
            // console.log(services)

            // Looping through the services array
        this.getServices(response)
        })
        .catch(err => console.error(err));
    
    // function search() {
    //     this.getServices(document.querySelector(".btn-group"))
    // }
}

// document.querySelector(".btn-group").addEventListener("click", function () {
//     getServices().search()
// })

            // Statements with what to do with data pulled by the user
            console.log(response)
        })
        .catch(err => console.error(err));
}

setTimeout( () => {
    userRequest();
} , 5000
);


