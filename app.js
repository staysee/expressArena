const express = require('express');
const morgan = require('morgan');

const app = express();

//this is middleware that requests pass through
//on their way to the final handler
app.use(morgan('dev'));

//this is the final request handler
app.get('/', (req, res) => {
    console.log('The root path was called');
    res.send('Hello Express!');
})
app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
})
app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
})
app.get('/pizza/pineapple', (req, res) => {
    res.send('We don\'t serve that here. Never call again!');
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
    `;
    res.send(responseText);
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});