const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { render } = require('ejs');

const makeData = require('./models/MakeData');

mongoose.connect('mongodb://localhost:27017/scoreplus', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongo connection open !!")
    })
    .catch(err => {
        console.log(err)
    })

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.get('/score_now', (req, res) => {
//     res.render('score_now', { pageName: "Score Now" })
// })

app.get('/scoreplus', (req, res) => {
    const { q } = req.query;
    if (q) {
        // console.log(q)
        const pName = q.replace("_", " ")
        // console.log(pName)
        res.render(q, { pageName: pName})
    } else {
        res.render('score_plus', { pageName: "Score Plus"})
    }
})

app.post('/scoreplus', (req, res) => {
    const data = req.body;
    let response = {}
    //console.log(data);
    const data2 = new makeData(req.body);
    data2.save(function(err, result) {
        if(err) {
            response = { error: true, message: 'Error! Please try again.'}
        } else {
            response = { error: false, message: 'Data added.'}
        }
        res.json(response);
    });
})

app.get('/scoreplus/results', async (req, res) => {
    const { search_query } = req.query;

    // console.log(search_query)

    // if(search_query) {
    //     //console.log(typeof(search_query))
    //     console.log(search_query)
    // } else {
    //     console.log('search_all')
    // }
    // res.end();
    if (search_query) {
        const results = await makeData.find({ 'teams.members':{$regex: search_query} })
        // console.log(results)
        res.render('results', { pageName: 'Results', results, search_query })
    } else {
        const results = await makeData.find({})
        res.render('results', { pageName: 'Results', results, search_query: '' })
    }
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})