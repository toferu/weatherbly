
# Weatherbly

This is my last *minute* attempt at developing a simple weather app using the openweathermap.org API.
I decided to build my react app with Vite as I've only ever used CRA. I began by focusing on developing the search functionality for the cities that were to be used for temperature comparison. Aside from some research I did on how to store state in the client's cache I did this section while really only checking the API docs. 

## Issues ##

I sunk a considerable amount of time in to a CORS error issue. I checked the Vite docs on it, and even altered the vite.config.ts file to ensure CORS was forced on. Turns out I had typed '/api/' instead of '/geo/' ...smh I should have tried my get request from Postman sooner.

After that was resolved I had issue with API calls. I developed under the impression I would be using the 'One Call' API based on the assessment instructions, but the key provided did not actually grant me access to that. I went with the 5 day forecast route as that seemed like the closest match (and worked on the free tier). 

Finally, I became completely stuck on how to extract the properties I needed once I had the data stored locally from the get request. This wasn't an issue for grabbing the 'lat' and 'lon' from the initial search by city name. As I've really only used TypeScript for one project before and that was for 3ish days, I feel my inexperience with TypeScript really hurt me here. I began researching a lot, and decided to re-arrange my code based on a video tutorial I found. Unfortunately, my code differed a little too much and I have run out of time to resolve the issues this new arrangement created. 

## Try It Out ##

In order to try a 'working' version I suggest taking from an early commit. Probably 3 or so back. You should be able to tell by the comments when things break lol.

To do that you'll first likely need to clone this repository (maybe fork it instead if that helps you fall back to an earlier commit I'm not sure), install dependencies, and run the local server (npm run dev). There's an Express directory I added around the beginning when I thought I'd actually have this production ready.

Lastly, you will need to create your own .env file for your API key. I believe for it to work with Vite you will need to format the environment variable like 'VITE_API_KEY' the 'VITE_' prefix being the important part.