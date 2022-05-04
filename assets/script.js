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
var showsDataHolder = [];

userInput = {
    services: [],
    genre: [],
    type: [],
}

// API KEYS
var apiKeys = {
    chase: '0ec05b3931msh88228e405c88947p14f250jsn5fa8105f9f8a',
    tony: '0a6c780725msh1dabbdd8d99ac58p1adc10jsna65e0cb9d583',
    darryl: 'b1772a2b66msh8fe7f52298f657ep156885jsn20747bc84c72',
}

var allKeys = [apiKeys.chase, apiKeys.tony, apiKeys.darryl];


// Replace 'element here' with the html parents that have/will have class hidden
var forListeners = queryAll('section')

// Function that returns how many indexs there are. Could be useful if we end up adding more sections
function totalIndex() {
    return (forListeners[forListeners.length - 1]).dataset.index
}

// Loops over all nodes and returns the node that the user is currently on
function currentNode() {
    for (var i = 0; i < forListeners.length; i++) {
        // If the current node data-question value in the for loop matches index value
        if (forListeners[i].dataset.index === index.toString()) {
            return forListeners[i];
        } 
    }
};

// Function that hides all other noncurrent nodes and shows current node
function showCurrentNode() {
    // Loops over all nodes and adds class hidden
    for (var i = 0; i < forListeners.length; i++) {
        forListeners[i].setAttribute("id", "hidden");
    };
    // Remove class hidden from current index
    currentNode().removeAttribute("id");
};

function grabUserInput() {
    inputs = queryAll('input')

    // Looping through all input nodes
    for (var i = 0; i < inputs.length; i++) {
        // If the current has tag input and is checked
        if (inputs[i].checked) {
            // Check to see if inputs are checked.
            console.log('I was checked ' + inputs[i].id)

            // Now we store the user data in userInput
            // For services
            if (inputs[i].parentNode.matches('#services-btn-container')) {
                userInput.services.push(inputs[i].id)
            }
            // For genres
            if (inputs[i].parentNode.matches('#genres-btn-container')) {
                userInput.genre.push(inputs[i].id)
            }
            // For type
            if (inputs[i].parentNode.matches('#type-btn-container')) {
                userInput.type.push(inputs[i].id)
            }

            // Check to see if userInput has values pushed
            // console.log(userInput)
        }
    }
}

async function tryAgain(apiKey){
    console.log("CALLING TRY AGAIN...")
    var options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
            'X-RapidAPI-Key': apiKey
        }
    };

    var services = userInput.services.join('%2C%20')
    var genre = userInput.genre.join('%2C%20')
    var type = userInput.type.join('%2C%20')
    var apiUrl = 'https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=' + services + '&type=' + type + '&genre=' + genre + '&output_language=en&language=en'
    fetch(apiUrl, options)
    .then(response => {
        if(!response.ok){
            var currentKeyIndex = allKeys.indexOf(apiKey);
            if (currentKeyIndex !== -1 && allKeys[currentKeyIndex + 1]) {
                return tryAgain(allKeys[currentKeyIndex + 1])
            } else {
                return console.log("YOU RAN OUT OF USABLE API KEYS!!!")
            }
        }
        return response.json()
    })
}

// Main API function that grabs API data
async function userRequest() {
    var apiKey = allKeys[0];
    var options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
            'X-RapidAPI-Key': apiKey
        }
    };

    var services = userInput.services.join('%2C%20')
    var genre = userInput.genre.join('%2C%20')
    var type = userInput.type.join('%2C%20')
    var apiUrl = 'https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=' + services + '&type=' + type + '&genre=' + genre + '&output_language=en&language=en'

    // console.log(randomizedPageNumber)
    // We fetch to randomize the a page number based on total_pages
    fetch(apiUrl, options)
        .then(response => {
            if (response.ok) {
                console.log("GOT BACK RES ON FIRST CALL")
                return response.json()
            }

            var currentKeyIndex = allKeys.indexOf(apiKey);

            if (currentKeyIndex !== -1 && allKeys[currentKeyIndex + 1]) {
                return tryAgain(allKeys[currentKeyIndex + 1])
            } else {
                return console.log("YOU RAN OUT OF USABLE API KEYS!!!")
            }
        })
        .then(response => {
            console.log("THIS IS TONY ---- ", response)
            // Using math.floor to randomize page
            randomizedNumber = Math.floor((Math.random() * response.total_pages) + 1)
            return randomizedNumber.toString()
        })
        
    // We catch the returned promise and use it to dynamically change the URL
    .then(randomizedNumber => {
        // Console log the page number
        console.log('The user is on page: ' + randomizedNumber)

        return fetch('https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=' + services + '&type=' + type + '&genre=' + genre + '&page=' + randomizedNumber + '&output_language=en&language=en', options)
    })
        .then(response => {
            // We json the response
            return response.json()
        })
        .then(response => {
            console.log(response)
            // We display the shows passing the response object in
            displayShows(response)
        })
        .catch(err => console.error(err));
}

function displayShows(response) {
    var shows = []
    // Looping through the response object 3 times to grab 3 shows
    for (var i = 0; i < response.results.length; i++) {
        // We loop through response.results and assign it a variable
        var show = response.results[i]
        // We push that show into shows array
        shows.push(show)
    }
    // Check to see that shows has all results
    // console.log(shows)

    var showContainers = queryAll('.show-container')

    // Now we loop through containers and shows
    for (var i = 0; i < showContainers.length; i++) {
        // We grab a random show first
        show = shows[i]

        // Creating title tag, setting its id, and appending it to the page
        var title = document.createElement('h1')
        title.setAttribute('id', 'title')
        var titleContent = document.createTextNode(show.title)
        title.appendChild(titleContent)
        showContainers[i].appendChild(title)

        // We do the same for the year, cast, and overview
        var year = document.createElement('h2')
        year.setAttribute('id', 'title')
        var yearContent = document.createTextNode(show.year)
        year.appendChild(yearContent)
        showContainers[i].appendChild(year)

        // Cast
        var cast = document.createElement('h3')
        cast.setAttribute('id', 'title')
        var castContent = document.createTextNode(show.cast.join(', '))
        cast.appendChild(castContent)
        showContainers[i].appendChild(cast)

        // Overview
        var overview = document.createElement('p')
        overview.setAttribute('id', 'overview')
        var overviewContent = document.createTextNode(show.overview)
        overview.appendChild(overviewContent)
        showContainers[i].appendChild(overview)


    }
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
            showCurrentNode()
        }
    }

    // If the target also has the Id generate-shows
    if (targ.target && targ.target.matches('#generate-shows')) {
        // If the index is equal to the total amount of pages we have, we return
        if (index === parseInt(totalIndex())) {
            console.log('Cant go any further! Theres no more sections left!')
            return
        } else {
        // We increase the current number index and show the current index
            index++;
            showCurrentNode()
        }

        // We grab user input
        grabUserInput()

        // We do an API request for data.
        userRequest()

        console.log(userInput)
    }
})

var vid = document.getElementsByClassName("show-container");

function playVid() {
    vid.play();
}

function pauseVid() {
    vid.pause();
}

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
