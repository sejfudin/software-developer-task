

const searchingFunction = (term, isMovie) => {

    let isNumber;

    //Checking if a user has entered a number
    isNumber = parseInt(term);

    //If number is entered, user wants search by year
    let query = {};
    if (!isNaN(isNumber) && isNumber > 9) {
        query = { "year": isNumber, "isMovie": isMovie }
    }

    //Cases is a user did not enter a number
    else {
        let condition;

        //If user enter a word "star" that means he wants search by rating
        if (term.includes("star")) {

            //If user enter words "more than" that means he wants movies with greatest rating than he entered
            if (term.includes("more than")) {
                condition = term.slice(10, 11);
                query = { "ratingValue": { $gt: condition }, "isMovie": isMovie }
            }

            //If user enter words "less than" that means he wants movies with lower rating than he entered
            else if (term.includes("less than")) {
                condition = term.slice(10, 11);
                query = { "ratingValue": { $lt: condition }, "isMovie": isMovie }
            }

            //If user enter words "at least" that means he wants movies with greatest or equal rating than he entered
            else if (term.includes("at least")) {
                condition = term.slice(9, 10);
                query = { "ratingValue": { $gte: condition }, "isMovie": isMovie }
            }

            //If user enter number of stars that means he wants movies with exact stars
            else {
                condition = term.slice(0, 2);
                query = { "ratingValue": { $eq: condition }, "isMovie": isMovie }
            }
        } else {
            //If user enter a word "after" that means he wants a results after entered year
            if (term.includes("after")) {
                condition = term.slice(5);
                query = { "year": { $gt: condition }, "isMovie": isMovie }
            }

            //If user enter a word "before" that means he wants a results before entered year
            else if (term.includes("before")) {
                condition = term.slice(6);
                query = { "year": { $lt: condition }, "isMovie": isMovie }
            }

            //If user enter a word "older than" that means he wants movies older than number of years he entered
            else if (term.includes("older than")) {
                condition = term.slice(11, 13);
                query = { "year": { $lt: 2021 - condition }, "isMovie": isMovie }
            }

            //If user enter a word "younger than" that means he wants movies younger than number of years he entered
            else if (term.includes("younger than")) {
                condition = term.slice(13, 15);
                query = { "year": { $gt: 2021 - condition }, "isMovie": isMovie }
            }

            //User has enterr just a word
            else {
                query = { $or: [{ "title": { "$regex": term, "$options": "i" } }, { "crew": { "$regex": term, "$options": "i" } }], "isMovie": isMovie }
            }
        }
    }
    return query;
}

exports.searchingFunction = searchingFunction;