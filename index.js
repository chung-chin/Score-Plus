const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { render } = require('ejs');

mongoose.connect('mongodb://localhost:27017/games', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Mongo connection open !!")
    })
    .catch(err => {
        console.log(err)
    })

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true}));

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

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})