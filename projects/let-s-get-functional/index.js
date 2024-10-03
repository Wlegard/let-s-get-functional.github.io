// #!/usr/bin/env node

'use strict';

const { result } = require('lodash');
var customers = require('./data/customers.json');
var _ = require('underbar');

/**
 * 1. Import your lodown module using the require() method,
 *    using the string 'lodown-<my-username>', or whatever
 *    name with which you published your npm lodown project.
 *
 * 2. Solve all problems as outlined in the README.
 *
 * 3. We started the first one for you as an example! Make the rest in that style.
 *
 * 4. To test your work, run the following command in your terminal:
 *
 *    npm start --prefix ./let-s-get-functional.github.io/projects/let-s-get-functional
 *
 *    IMPORTANT: Make sure you replace <YOUR_GITHUB_FOLDER with your actual github folder name that is in your workspace.
 */

/**
 npm start --prefix ./let-s-get-functional.github.io/projects/let-s-get-functional
 **/


/**I: takes in an array
 * O: number of males
 * 
 * 
 * */
var maleCount = function(array){
    let males = _.filter(array, function(customer){
        return customer.gender === 'male';
    })
    return males.length;
}

/**
 var maleCount = function(array) {
    var males = 0;
for (var i = 0; i < array.length; i++){
    
if(array[i].gender=== 'male'){ 
    males += 1
}
}
return males;
};
*/


var femaleCount = function(array){
    var females = 0;
    for (var i= 0; i < array.length; i++){
        if(array[i].gender === 'female'){
            females +=1
        }
    }
    return females
};

var oldestCustomer = function(array){
let oldest = _.reduce(array, function(accumulator, current){
        if (current.age > accumulator.age){
            return current
                        }else{
                        return accumulator
                        }
});
return oldest.name
};

var youngestCustomer = function(array){
    let youngest = _.reduce(array,function(accumulator, current){
        if(current.age > accumulator.age){
            return accumulator;
        }else{
            return current
        }
    })
    return youngest.name
    
};


/**
 _.reduce = function(array,func, seed){
  let output;
  //if seed did not provide value
  if(seed === undefined){
    // if seed is not given, seed value is the first item in array
    output = array[0]
    for(var i = 1; i < array.length; i++){
      output =  func(output, array[i], i)
                //result = seed/callback function
    }
  }else{
    output = seed;
    for(var i = 0; i < array.length; i++){
      output =  func(output, array[i], i)
                //result = seed/callback function
    }
 */
var averageBalance = function(array){
    var totalBalance = 0; // Initialize total balance
    var customerCount = 0; // Initialize customer count

    // Loop through the array of customers
    for (var i = 0; i < array.length; i++) {
        // Parse the balance as a float and accumulate it
        totalBalance += parseFloat(array[i].balance.replace(/[$,]/g, ''));
        customerCount++; // Increment customer count
    }

    // Calculate and return the average balance
    if (customerCount === 0) {
        return 0; // Return 0 if there are no customers
    } else {
        return totalBalance / customerCount; // Return the average
    }

};

var firstLetterCount = function(array, letter){
    var upperLetter = letter.toUpperCase();

    var count = 0
    for(var i = 0; i < array.length; i++){
        if(array[i].name[0].toUpperCase() === upperLetter){
            count ++
        }
    }
    return count;
};

var friendFirstLetterCount = function(array, customerName, letter){
    var customer = null; // Initialize to null

    // Step 1: Find the customer in the array
    for (var i = 0; i < array.length; i++) {
        if (array[i].name === customerName) {
            customer = array[i]; // Assign the found customer
            break; // Exit the loop once the customer is found
        }
    }

    // Step 2: If the customer is found, count friends' names starting with the letter
    if (customer) {
        var count = 0; // Initialize count
        // Convert letter to lowercase for case-insensitive comparison
        var lowerCaseLetter = letter.toLowerCase();
        for (var j = 0; j < customer.friends.length; j++) {
            // Check if the friend's name starts with the specified letter (case-insensitive)
            if (customer.friends[j].name.charAt(0).toLowerCase() === lowerCaseLetter) {
                count++; // Increment count
            }
        }
        return count; // Return the count
    }

    return 0; // Return 0 if the customer is not found
};


var friendsCount = function(array, targetName){
    var output = []; // Initialize an array to hold matching customer names

    // Iterate through the array of customers
    for (var i = 0; i < array.length; i++) {
        var friends = array[i].friends; // Get the current customer's friends list
        // Check if any friend in the list has the name we are looking for
        for (var j = 0; j < friends.length; j++) {
            if (friends[j].name === targetName) {
                output.push(array[i].name); // Add the customer's name to output
                break; // Exit the inner loop once we find a match
            }
        }
    }

    return output; // Return the array of matching customer names
};

var topThreeTags = function(array){
    var tagCount = {}; // Object to store the count of each tag

    // Step 1: Gather all tags
    for (var i = 0; i < array.length; i++) {
        var tags = array[i].tags; // Get the tags for the current customer
        for (var j = 0; j < tags.length; j++) {
            var tag = tags[j];
            // Count the occurrences of each tag
            tagCount[tag] = (tagCount[tag] || 0) + 1; // Increment count
        }
    }

    // Step 2: Find the top three tags
    var topTags = [];
    for (var k = 0; k < 3; k++) {
        var maxTag = null;
        var maxCount = 0;

        // Find the tag with the highest count
        for (var tag in tagCount) {
            if (tagCount[tag] > maxCount) {
                maxCount = tagCount[tag];
                maxTag = tag;
            }
        }

        // If a maxTag is found, add it to the topTags and delete from tagCount
        if (maxTag) {
            topTags.push(maxTag);
            delete tagCount[maxTag]; // Remove the tag to avoid counting it again
        }
    }

    return topTags
};



//function expression with parameter - customers: which is expected to be an array of objects, with gender property
var genderCount = function(customers){
    //reduce method on customers array
    //reduce takes in two arugements: callback function(accumulator) and seed
    return customers.reduce(function(accumulator,customer){
                    // Increment the count for the corresponding gender 
        //if gender exist at the current customer
        if(customer.gender){
            if (accumulator[customer.gender]) {
            //If the gender is already a key in the accumulator object (accumulator), the function increments the count for that gender by 1.
            accumulator[customer.gender] += 1 // Increment if already exists
            //If the gender does not exist in the accumulator yet, it initializes that gender's count to 1.
 
        }else{
            accumulator[customer.gender] = 1 // Initialize if it doesn't exist
        }
    }
        return accumulator
    },{ male: 0, female: 0, 'non-binary': 0}) // Seed with initial counts
};

//////////////////////////////////////////////////////////////////////
// DON'T REMOVE THIS CODE ////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// here, export any references you need for tests //
module.exports.maleCount = maleCount;
module.exports.femaleCount = femaleCount;
module.exports.oldestCustomer = oldestCustomer;
module.exports.youngestCustomer = youngestCustomer;
module.exports.averageBalance = averageBalance;
module.exports.firstLetterCount = firstLetterCount;
module.exports.friendFirstLetterCount = friendFirstLetterCount;
module.exports.friendsCount = friendsCount;
module.exports.topThreeTags = topThreeTags;
module.exports.genderCount = genderCount;
