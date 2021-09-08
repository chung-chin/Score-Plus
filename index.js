const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { render } = require('ejs');


app.use(express.static(path.join(__dirname, 'public')));

app.set ('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('score_plus', { pageName: "Score Plus" })
})

// app.get('/score_now', (req, res) => {
//     res.render('score_now', { pageName: "Score Now" })
// })

app.get('/ping_pong', (req, res) => {
    res.render('ping_pong', { pageName: "Ping Pong" })
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})