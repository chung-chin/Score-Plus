const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const { render } = require('ejs');

// const defaultUrl = "http://localhost:3000/";

app.use(express.static(path.join(__dirname, 'public')));

app.set ('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/score_plus', (req, res) => {
    const pageName = "Score Plus"
    res.render('score_plus', { pageName })
})

app.get('/score_now', (req, res) => {
    const pageName = "Score Now"
    res.render('score_now', { pageName })
})

app.get('/ping_pong', (req, res) => {
    const pageName = "Ping Pong"
    res.render('ping_pong', { pageName })
})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})