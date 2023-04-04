
# Weatherbly

This is my last *minute* attempt at developing a simple weather app using the openweathermap.org API.
I decided to build my react app with Vite as I've only ever used CRA. I began by focusing on developing the search functionality for the cities that were to be used for temperature comparison. Aside from some research I did on how to store state in the client's cache I did this section while really only checking the API docs. 

## Wireframe ##

![](src/assets/Screen%20Shot%202023-04-04%20at%2012.58.30%20PM.png)

You can't really tell from this image, but the 'Current Temperature' and 'Forecast' blocks are intended to be more of a Guassian blur effect over the background than a different color. The background would have more details: a cloud motif and a gradient effect, preferably animated.

The "Current Temperature" section would be toggleable to show chart data instead for the cities. The "Extended Forecast" section would show data for the highlighted/selected city shown the default table view. Ideally a 'favorites' style component would be added to allow users to sort the city list order.

## Try It Out ##

Clone the repository
Install dependencies
Run the local server -- npm run dev

Lastly, you will need to create your own .env file for your API key. I believe for it to work with Vite you will need to format the environment variable like 'VITE_API_KEY' the 'VITE_' prefix being the important part.