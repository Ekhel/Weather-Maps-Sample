# Practical NodeJS an Express
---

## 2 Endpoint API Connect With one request (Weather and MapBox)
* Description :
  - the weather app use API from [MapBox](https://www.mapbox.com) and [Weather](https://weatherstack.com)
  - How to cycle method ??
  - first,. we take information about location from mapbox.. so mapbox can find the location and show the information
  - second,. from information obtained from the mapbox, we made some function to retrive the information.
  - third, and send information about location (name of location, Longitude and Latitude so on..) and then bring the information to weather stack to get the weather data for the location.
  - fourth, the weather stack can show u.. information about the location that has been taken from mapbox.

---

* Source API (Register to get token)
  - [Weather](https://weatherstack.com/)
  - [Mapbox](https://www.mapbox.com/)

* Module Installed
  - express
  - request
  - hbs
  - nodemon ( -global )

* UI (Template)
  - [Semantic UI](https://semantic-ui.com)

* Practical
  - Callback Function VS Arrow Function
  - Assign Arrow Function to Callback Function
  - Use the Parameter and Data in arrow Function
  - Undestand I/O Bloking and NonBlocking Code
  - Use NonBlocking Code to Arrow Function
  - Call Endpoin API with Module request (*npm i install request*)
  - Call Endpoint API with fetch 
  - Assign endpoint with Fetch to Arrow Function

* How to Use this project?
  - clone this Repo 
    ```
      https://github.com/Ekhel/Weather-Maps-Sample.git
    ```

  - Node Initialize
    ```javascript
    npm install
    ```

  - Change *ACCESS_TOKEN* from path : /src/utils/geocode.js (from Mapbox Account)
    ```JSX
        const geocode = (address, callback) => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.ACCESS_TOKEN&limit=1';

        request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to location services!', undefined)
            } else if (body.features.length === 0) {
                callback('Unable to find location. Try another search.', undefined)
            } else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })
    }
    ```

  - Change YOUR_ACCESS_KEY from path: /src/utils/forecast.js (from weather account)
    ```JSX
        const forecast = (latitude, longitude, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=YOUR_ACCESS_KEY&query=' + latitude + ',' + longitude

        request({ url, json: true }, (error, { body }) => {
            if (error){
                callback('Unable to connect to weather service!', undefined)
            } else if (body.error) {
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, 'Weather today ' + body.current.weather_descriptions[0] + ' Temp Right now ' + body.current.temperature + ' C')
            }
        })
    }
    ```

    - [Finnaly RUN the App (*nodemon src/app.js -e js,hbs*) couse the template use .hbs extension for manage the pages](https://expressjs.com/en/starter/generator.html)