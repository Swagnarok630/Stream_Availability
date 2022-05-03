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
    genre: ['5'],
    type: ['movie'],
}

// API KEYS AND API AUTH
var apiKeys = {
    chase: '0ec05b3931msh88228e405c88947p14f250jsn5fa8105f9f8a',
    tony: '0a6c780725msh1dabbdd8d99ac58p1adc10jsna65e0cb9d583',
    darryl: 'b1772a2b66msh8fe7f52298f657ep156885jsn20747bc84c72',
    keysArr: [this.chase, this.tony, this.darryl]
}

var options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
        'X-RapidAPI-Key': apiKeys.tony
    }
};

// Replace 'element here' with the html parents that have/will have class hidden
var forListeners = queryAll('section')

// Function that returns how many indexs there are. Could be useful if we end up adding more sections
function totalIndex() {
    return (forListeners[forListeners.length - 1]).dataset.index
}

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
        forListeners[i].setAttribute("id", "hidden");
    };
    // Remove class hidden from current index
    currentIndex().removeAttribute("id");
};

// Main API function that grabs API data and manipulates it
function userRequest() {
    var services = userInput.services.join('%2C%20')
    var genre = userInput.genre.join('%2C%20')
    var type = userInput.type.join('%2C%20')
    
    var apiUrl = 'https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=' + services + '&type=' + type + '&genre=' + genre + '&output_language=en&language=en'

    // console.log(randomizedPageNumber)
    fetch(apiUrl, options)
        .then(response => {
            return response.json()
        })
        .then(response => {
            // We randomize the page based on how many pages there are on total_pages
            randomizedPageNumber.push(Math.floor((Math.random() * response.total_pages) + 1))
            // We return the data object for a second time to manipulate the data on the next .then
            return response
        })
        .then(response => {
            // Check to see if the data we're going to use is valid
            // console.log(response)
            // console.log(randomizedPageNumber)

            // Statements with what to do with data pulled by the user
            // Statement 1
        })
        .catch(err => console.error(err));
}

getId('entire-container').addEventListener('click', function(targ) {
    // if the target is also has id button
    if (targ.target && targ.target.matches('#btn')) {
        // If the index is equal to the total amount of pages we have, we return
        if (index === parseInt(totalIndex())) {
            console.log('Cant go any further! Theres no more sections left!')
            return
        } else {
        // We increase the current number index and show the current index
            index++;
            showCurrent()
        }
    }
})

// userRequest()

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

// Looping keys code
    // // Looping through apiKeys
    // for (var i = 0; i < apiKeys.length; i++) {
    //     // If the API data is good, we json() it.
    //     if (response === 400) {
    //         response.json()
    //         // We break the loop so it doesn't keep looping till apikeys.length
    //         break;

    //     // If the current API key is equal to the key we already have, continue aka skip current key
    //     } else if (apiKeys[i] === options.headers["X-RapidAPI-Key"] && response !== 400) {
    //         continue;

    //     // If the response comes out invalid
    //     } else if (response !== 400) {
    //         // Set the current iteration key equal to the options API key
    //         options.headers["X-RapidAPI-Key"] = apiKeys[i];
    //         // Fetch with current key
    //         fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=' + services + '&type=' + type + '&genre=' + genre + '&output_language=en&language=en', options)

    //     } else {
    //         console.log('KeyLoop is broken fix me')
    //     }
