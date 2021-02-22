// s7.43 \\
// s7.45 \\

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// s7.47 \\

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Eren Jaeger'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Eren Jaeger'
    })
})

// challenge
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'HELP! I need Somebody! Not just Anybody! You know I need someone! Heeeeeelp!',
        title: 'Help',
        name: 'John Lennon'
    })
})

// app.get('', (req, res) => {
//     // s7.44 \\
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{name: 'Eren'}, {name: 'Mikasa'}])
// })

// // challenge
// app.get('/about', (req, res) => {
//     // challenge
//     res.send('<h1>About</h1>')
// })

// challenge
app.get('/weather', (req, res) => {
    // challenge
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) { 
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'It is sunny',
    //     location: 'Paradis Island',
    //     address: req.query.address
    // })
})

// s8.54 \\

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

// s7.50 \\

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Eren Jaeger',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Eren Jaeger',
        errorMessage: 'Page not found'
    })
})

// s9.67 \\

app.listen(port, () => {
    console.log(`Starting server on port ${port}...`)
})