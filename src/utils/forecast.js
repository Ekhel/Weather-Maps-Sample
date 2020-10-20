const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a209e746268b9cf964afc60c3a37c236&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'Cuaca Hari ini ' + body.current.weather_descriptions[0] + ' Temp Saat ini ' + body.current.temperature + ' C')
        }
    })
}


module.exports = forecast