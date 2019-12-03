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
// Create a route handler function on the path /sum that accepts
// two query parameters named a and b and find the sum of the two values. 
// Return a string in the format "The sum of a and b is c". Note that query 
// parameters are always strings so some thought should be given to 
// converting them to numbers.
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

// DRILL 2 -- Create an endpoint /cipher. The handler function should 
// accept a query parameter named text and one named shift. Encrypt the text 
// using a simple shift cipher also known as a Caesar Cipher. It is a simple 
// substitution cipher where each letter is shifted a certain number of places 
// down the alphabet. So if the shift was 1 then A would be replaced by B, and B 
// would be replaced by C and C would be replaced by D and so on until finally Z 
// would be replaced by A. using this scheme encrypt the text with the given shift 
// and return the result to the client. Hint - String.fromCharCode(65) is an uppercase A 
// and 'A'.charCodeAt(0) is the number 65. 65 is the integer value of uppercase A in UTF-16. 
// See the documentation for details.
app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = req.query.shift;

    // both values required. shift must be a number.
    if (!text) {
        return res.status(400).send('text is required.')
    }
    if (!shift) {
        return res.status(400).send('shift is required.');
    }

    const numShift = parseFloat(shift);
    if (isNaN(numShift)) {
        return res.status(400).send('shift must be a number.');
    }

    // hint: String.fromCharCode(65) is an uppercase A
    // 'A'.charCodeAt(0) is the number 65

    const start = 'A'.charCodeAt(0);

    // get the text, find each char code and check if it falls between A-Z
    const textArr = text.toUpperCase().split('');
    const cipher = textArr.map( char => {
        const code = char.charCodeAt(0);    // get the charcode
        // if not A-Z
        if (code < start || code > (start + 26)){
            return code
        }

        let diff = code - start;
        //apply the shift
        let shiftedDiff = diff + numShift;
        //if shiftedDiff is higher than Z
        shiftedDiff = shiftedDiff % 26;

        //find the character code  with the shiftedDiff and convert to String
        const shiftedChar = String.fromCharCode(start + shiftedDiff);
        
        return shiftedChar
    })
    .join("");
    //return response
    res.send(cipher);
})

// DRILL 3 - To send an array of values to the server via a query string simply 
// repeat the key with different values. For instance, the query string ?arr=1&arr=2&arr=3 results 
// in the query object { arr: [ '1', '2', '3' ] }. Create a new endpoint /lotto that accepts an 
// array of 6 distinct numbers between 1 and 20 named numbers. The function then randomly 
// generates 6 numbers between 1 and 20. Compare the numbers sent in the query with the randomly 
// generated numbers to determine how many match. If fewer than 4 numbers match respond with the 
// string "Sorry, you lose". If 4 numbers match respond with the string "Congratulations, you win 
// a free ticket", if 5 numbers match respond with "Congratulations! You win $100!". If all 6 numbers 
// match respond with "Wow! Unbelievable! You could have won the mega millions!".
app.get('/lotto', (req, res) => {
    const numbers = req.query.numbers;

    //check if numbers exist, if it is an array, and are 6 numbers between 1-20
    if (!numbers) {
        res.status(400).send('numbers required');
    }
    if (!Array.isArray(numbers)){
        res.status(400).send('numbers must be an array.');
    }

    const guesses = numbers
        .map(n => parseInt(n))
        .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20) );
    
    if ((guesses.length != 6) || (guesses.length !== new Set(guesses).size)) {
        console.log('not unique')
        return res.status(400).send('numbers must contain 6 unique integers between 1 and 20');
    }

    console.log(`guesses`, guesses)

    const winningNumbers = new Set;
    while (winningNumbers.size < 6)
    winningNumbers.add(Math.floor(Math.random() * 20) + 1 );

    console.log(`winning numbers: `, [...winningNumbers]);

    //compare guesses to winning numbers
    let notGuessed = [...winningNumbers].filter( num => !guesses.includes(num));
    console.log(`notGuessed`, notGuessed)

    let reponse;
    console.log(notGuessed.length)
    switch(notGuessed.length){
        case 0:
            response = "Wow! Unbelievable! You could have won the mega millions!"
            break;
        case 1:
            response = "Congratulations! You win $100!"
            break;
        case 2:
            response = "Congratulations! You win a free ticket."
            break;
        default:
            response = "Sorry, you lose."
    }

    res.send(response);
})








app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});