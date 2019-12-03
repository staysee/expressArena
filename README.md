# expressArena

practicing express

### Drill 1
Create a route handler function on the path `/sum` that accepts two query parameters named `a` and `b` and find the sum of the two values. Return a string in the format "The sum of a and b is c". Note that query parameters are always strings so some thought should be given to converting them to numbers.

### Drill 2
Create an endpoint `/cipher`. The handler function should accept a query parameter named `text` and one named `shift`. Encrypt the text using a simple shift cipher also known as a [Caesar Cipher](https://learncryptography.com/classical-encryption/caesar-cipher). It is a simple substitution cipher where each letter is shifted a certain number of places down the alphabet. So if the shift was 1 then A would be replaced by B, and B would be replaced by C and C would be replaced by D and so on until finally Z would be replaced by A. using this scheme encrypt the text with the given shift and return the result to the client. Hint - `String.fromCharCode(65)` is an uppercase A and `'A'.charCodeAt(0)` is the number 65. 65 is the integer value of uppercase A in UTF-16. See the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode) for details.

### Drill 3
To send an array of values to the server via a query string simply repeat the key with different values. For instance, the query string `?arr=1&arr=2&arr=3` results in the query object` { arr: [ '1', '2', '3' ] }`. Create a new endpoint `/lotto` that accepts an array of 6 distinct numbers between 1 and 20 named `numbers`. The function then randomly generates 6 numbers between 1 and 20. Compare the numbers sent in the query with the randomly generated numbers to determine how many match. If fewer than 4 numbers match respond with the string "Sorry, you lose". If 4 numbers match respond with the string "Congratulations, you win a free ticket", if 5 numbers match respond with "Congratulations! You win $100!". If all 6 numbers match respond with "Wow! Unbelievable! You could have won the mega millions!".

#### Solution
https://github.com/vramdhanie/express_drills
