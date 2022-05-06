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
    matt: '2553690d8bmsh3300dfff1c376abp18f357jsnc308ab21a73a',
}

var allKeys = [apiKeys.chase, apiKeys.tony, apiKeys.darryl, apiKeys.matt];

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
    var apiUrl = 'https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=' + services + '&type=' + type + '&genre=' + genre + '&output_language=en&language=en';

    // check to see if the request is valid
    // console.log(apiUrl)

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
    // Looping through the response results that has 8 object shows LIMIT and pushing them into shows array
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
        // We grab a random show
        show = shows[Math.floor((Math.random() * shows.length) + 0)]
        if (show === undefined || show === null) {
            return;
        }

        //Check to see current index show
        // console.log(show)

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

        // Video
        var video = document.createElement('iframe')
        video.setAttribute('width', '852px')
        video.setAttribute('height', '480px')
        video.style.flexShrink = '0';
        video.setAttribute('src', 'https://www.youtube.com/embed/' + show.video)
        var videoContent = document.createTextNode('trailer')
        video.appendChild(videoContent)
        showContainers[i].appendChild(video)
    }
}

getId('entire-container').addEventListener('click', function(targ) {
    // if the target is also has id button
    if (targ.target && targ.target.matches('.proceed')) {
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

    if (targ.target && targ.target.matches('.back')) {
        index--;
        showCurrentNode();
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

        // We go from the loading page to results page
        setTimeout(() => {
            loadingPage()
        }, 1700);
    }
})

function loadingPage() {
    if (currentNode().dataset.index == (parseInt(totalIndex()) - 1)) {
        index++;
        showCurrentNode();
    }
}

// Fucnction to ensure user selects a choice of platform
function grabServiceInput(platformclick) {
    // Variable for each radio input
    var platforms = document.getElementsByName("platform")
    // Variables for the modal alert and X button to close alert
    var servicemodal = document.getElementById("service-modal")
    var servicespan = document.getElementsByClassName("service")[0];
    // Created an empty array, so that if no option is picked it remains empty
    var checker = [];
    // Loop to iterate through all platforms and check if selected
    for (var i = 0; i < platforms.length; i++) {   
        if (platforms[i].checked) {
            // If an option is selected, it will push to array and continue to next page
            checker.push(platforms[i].value);
            // console.log(checker[0])
        }}
    // If the array remmains empty, modal alert will trigger
    if (checker.length === 0) {
            // stopPropagation used to prevent moving to the next screen and remain on current screen
            platformclick.stopPropagation();
            // Unhides the modal
            servicemodal.style.display = "block";
            // Allows user to click on X button to close modal
            servicespan.onclick = function() {
                servicemodal.style.display = "none";
            }
            // Allows user to click anywhere outside the modal window to close modal
            window.onclick = function(event) {
                if (event.target == servicemodal) {
                    servicemodal.style.display = "none";
                }
            }
        }
}

// Fucnction to ensure user selects a choice of genre
function grabGenreInput(genreclick) {
    // Variable for each radio input
    var genres = document.getElementsByName("genre")
    // Variables for the modal alert and X button to close alert
    var genremodal = document.getElementById("genre-modal")
    var genrespan = document.getElementsByClassName("genre")[0];
    // Created an empty array, so that if no option is picked it remains empty
    var checker = [];
    // Loop to iterate through all genres and check if selected
    for (var i = 0; i < genres.length; i++) {   
        if (genres[i].checked) {
            // If an option is selected, it will push to array and continue to next page
            checker.push(genres[i].value);
            // console.log(checker[0])
        }}
    // If the array remmains empty, modal alert will trigger
    if (checker.length === 0) {
            // stopPropagation used to prevent moving to the next screen and remain on current screen
            genreclick.stopPropagation();
            // Unhides the modal
            genremodal.style.display = "block";
            // Allows user to click on X button to close modal
            genrespan.onclick = function() {
                genremodal.style.display = "none";
            }
            // Allows user to click anywhere outside the modal window to close modal
            window.onclick = function(event) {
                if (event.target == genremodal) {
                    genremodal.style.display = "none";
                }
            }
        }
}

// Fucnction to ensure user selects a choice of movie or show
function grabTypeInput(typeclick) {
    // Variable for each radio input
    var type = document.getElementsByName("type")
    // Variables for the modal alert and X button to close alert
    var typemodal = document.getElementById("type-modal")
    var typespan = document.getElementsByClassName("type")[0];
    // Created an empty array, so that if no option is picked it remains empty
    var checker = [];
    // Loop to iterate through all types and check if selected
    for (var i = 0; i < type.length; i++) {   
        if (type[i].checked) {
            // If an option is selected, it will push to array and continue to next page
            checker.push(type[i].value);
            // console.log(checker[0])
        }}
    // If the array remmains empty, modal alert will trigger
    if (checker.length === 0) {
            // stopPropagation used to prevent moving to the next screen and remain on current screen
            typeclick.stopPropagation();
            // Unhides the modal
            typemodal.style.display = "block";
            // Allows user to click on X button to close modal
            typespan.onclick = function() {
                typemodal.style.display = "none";
            }
            // Allows user to click anywhere outside the modal window to close modal
            window.onclick = function(event) {
                if (event.target == typemodal) {
                    typemodal.style.display = "none";
                }
            }
        }
}

// Variable and event listener for button to validate user input at service platforms
var servicebutton = document.querySelector("#service-btn")
servicebutton.addEventListener("click", grabServiceInput)

// Variable and event listener for button to validate user input at genres
var genrebutton = document.querySelector("#genre-btn")
genrebutton.addEventListener("click", grabGenreInput)

// Variable and event listener for button to validate user input at types
var typebutton = document.querySelector("#generate-shows")
typebutton.addEventListener("click", grabTypeInput)


var vid = document.getElementsByClassName("show-container");

function playVid() {
    vid.play();
}

function pauseVid() {
    vid.pause();
}