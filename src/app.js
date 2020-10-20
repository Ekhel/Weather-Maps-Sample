const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecash = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

const public = path.join(__dirname, '../public/');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(public));

app.get('', (req, res) => {
    res.render('weather', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.render('weather', {
            error: 'Provide search term'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecash(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                title: 'Search Weather',
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'Error Search!!Try ANother'
        });
    }

    console.log(req.query.search)
    res.send({
        products: []
    })   
})

app.get('/help/*', (req, res) => {
    res.render('help', {
        title: 'Nataours | Help Page',
        name: 'Michael'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Nataours | about Page',
        name: 'Michael'
    });
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404 Not Found',
    });
})

app.listen(port, () => {
  console.log(`App Running on Port ${port}...`);
});