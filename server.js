const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const api = require('./routes/notes');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/notes', api);

app.use(express.static('public'));





app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
console.log('App listening at http://localhost:${PORT}')
);