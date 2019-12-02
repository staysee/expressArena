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
//checking out some properties from the request
app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
    `;
    res.send(responseText);
});

//examining the query
app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end(); //do not send any data back to the client
});

//we are interested in name and race of fantasy characters. both values required
app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
    //2. validate the values
    if (!name){
        //3. name was not provided
        return res.status(400).send('Please provide a name');
    }
    if (!race) {
        //3. race was not provided
        return res.status(400).send('Please provide a race');
    }
    //4. and 5. both name and race are valid so do the processing
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom`;
    //6. send the response
    res.send(greeting);
})

// -------------- ASSIGNMENT --------------//
// DRILL 1
app.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;

    if (!a){
        return res.status(400).send('Please provide a value `a`');
    }
    if (!b){
        return res.status(400).send('Please provide a value `b`');
    }

    //convert to numbers
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    //handle NaN
    if (isNaN(numA)) {
        return res.status(400).send('`a` must be a number. Try again.');
    }
    if (isNaN(numB)) {
        return res.status(400).send('`b` must be a number. Try again.');
    }

    //compute numbers
    const sum = `The sum of ${a} and ${b} is ${numA + numB}.`
    res.send(sum);
})


app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});