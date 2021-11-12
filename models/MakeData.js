const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    date: {
        type: Object,
        required: true
    },
    sport: {
        type: String,
        required: true
    },
    maxGame: {
        type: Number,
        required: true,
        min: 0
    },
    maxScore: {
        type: Number,
        required: true,
        min: 0
    },
    owners: {
        type: Array,
        required: true
    },
    winner: {
        type: String,
        required: true
    },
    teams: {
        type: Array,
        required: true,
        name: {
            type: String,
            required: true
        },
        scores: {
            type: Array,
            required: true
        },
        members: {
            type: Array,
            required: true
        }
    }
})

const makeData = mongoose.model('Scores', scoreSchema);

module.exports = makeData;