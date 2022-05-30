const notes = require('express').Router();
const {v4: uuidv4} = require('uuid');
const express = require('express');
const app = express();
const notesArray = require('../db/db.json')

const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/Utils');
const { json } = require('express');

notes.get('/', (req, res) => {
    readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)));
})

notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0 
        ? res.json(result)
        : res.json('no note with that ID!');
    });
});

notes.delete('/:id', (req, res) => {
    console.log(req.params)
    const noteId = req.params.id;
    readFromFile('./db/bd.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = notesArray.filter((note) => note.id !== noteId);

    writeToFile('./db/db.json', result);
    res.json(`Item ${noteId} has been deleted`);
    });
});

notes.post('/', (req, res) => {
    console.log(req.body)
    const {title, text} = req.body;
    if(req.body) {
        const newNote = {
            title,
            text,
            id : uuidv4(),
        };
        readAndAppend(newNote, './db/db.json');
        res.json('note added succesfully');
    } else {
        res.error('error adding note');
    }
})

module.exports = notes;
