// s6.37 \\
// challenge
const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=177fb2c3cca1b61f2b789e04a00a3020&query=' + longitude + ',' + latitude + '&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + 
                '. It is currently ' + body.current.temperature + 
                '. It feels like ' + body.current.feelslike + 
                '. The humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast