# Stream_Availability
A Simple Web App that Generates Shows to Watch

Project Members:
Tony, Chase, Dennis, Darryl, Matt

Deployed Site:
https://swagnarok630.github.io/Stream_Availability/
[!Getting Started](deployed.jpg)

Stack: HTML, CSS (Bootstrap, CSS.GG), JavaScript
API: Streaming Availability API

Project Details:
HTML and CSS

1. Load the page that displays a landing page with from the HTML,
-This will have a Hello, let's find something to watch. This has a dark purple text and a light background color
2. Create an interactive button and instructions on what movies to pick from
-This will have an orange design and will be frozen and remain among each page we switch through
3. Click the button so that it brings you to the next hidden page
-This will have a forward and backward button that allows you to change pages
4. Hide the pages with a hidden display in the CSS
-This will be found in the CSS with the class called hidden and a transparent command
5. Ask the user what streaming service they use, and store that value
-This will have dark purple text and a light background with purple fill in
6. Click the button so that it can bring you to the next page
-This will be orange button with a forward and backward function
7. See what genre the user wants to pick from and store those values
-This will be ran inside the js and will have purple text with dark purple bubbles
8. Click the button so that it can bring you to the next page
-This will be orange button with a forward and backward function
9. Ask what Movie or Show the user would like to watch next
-This will have 2 choices with a dark purple bubble and purple text with a light background
10. Click the button so that it can bring you to the next page
-This will be orange button with a forward and backward function
11. Produce an out put from the stored values that allows the user to see what trailers they can watch 
-This will have a youtube page tied to a generate youtube page with purple borders

JavaScript

1. Download the web api and store the key so that the landing page is accessible and its interactive with the buttons
2. Loop through a variety of different videos from each page that are stream services, genres and types
3. Run a function that stores a set of variables with the apiKey to use that as a call back later on 
4. Use a fetching function that can fetch the keys from a series of True and false statements to see which statements a user clicks to produce stream services, genres and types
5. Add into the function that randomizes them 
6. Create a function that stores the data into a set variable that calls back later on
7. Loop through the displayed data 
8. Display the title, year, cast, over view, trailer and trailers image
9. Create an eventlistener that listens to see if someone doesn't pick a value from the stored values so that they cannot proceed further
10. Create a function that checks to see if someone clicks in the streaming services
11. Create a function that checks to see if someone clicks in the genres
12. Create a function that checks to see if someone clicks in the type of input (movies and shows)
13. Create an event listen and store functions for all 3 for a set of stored variables
14. Lastly  use a function that allows user to play and pause the video of the trailer