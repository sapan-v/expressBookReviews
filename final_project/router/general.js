const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
//Write your code here
const username = req.query.username;
const password = req.query.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

// Get the book list available in the shop
public_users.get('/',function (req, res) {
   //Write your code here
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
    });

get_books.then(() => console.log("Promise for Task 10 resolved"));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn
    const get_books_by_isbn = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify((books[isbn]), null, 4)));
    });

get_books_by_isbn.then(() => console.log("Promise for Task 11 resolved"));
});
  
public_users.get('/books/author/:author', function (req, res) {
  const get_books_author = new Promise((resolve, reject) => {
    let booksbyauthor = [];
    let isbns = Object.keys(books);

    isbns.forEach((isbn) => {
      if (books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({
          "isbn": isbn,
          "title": books[isbn]["title"],
          "reviews": books[isbn]["reviews"]
        });
      }
    });

    if (booksbyauthor.length > 0) {
      resolve(res.send(JSON.stringify({ booksbyauthor }, null, 4)));
    } else {
      reject(res.send("The mentioned author does not exist"));
    }
  });

  get_books_author
    .then(function () {
      console.log("Promise for task 12 is resolved");
    })
    .catch(function () {
      console.log('The mentioned author does not exist');
    });
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {

const get_books_title = new Promise((resolve, reject) => {
    let booksbytitle = [];
    let isbns = Object.keys(books);

    isbns.forEach((isbn) => {
        if (books[isbn]["title"] === req.params.title) {
        booksbytitle.push({
            "isbn": isbn,
            "title": books[isbn]["title"],
            "reviews": books[isbn]["reviews"]
        });
        }
    });

    if (booksbytitle.length > 0) {
        resolve(res.send(JSON.stringify({ booksbytitle }, null, 4)));
    } else {
        reject(res.send("The mentioned title does not exist"));
    }
    });

    get_books_title
    .then(function () {
        console.log("Promise for task 13 is resolved");
    })
    .catch(function () {
        console.log('The mentioned title does not exist');
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let booksreview = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(isbn === req.params.isbn) {
      booksreview.push({"isbn":isbn,
                          "title":books[isbn]["title"],
                          "reviews":books[isbn]["reviews"]});
    }
  });
  res.send(JSON.stringify({booksreview}, null, 4));
});

module.exports.general = public_users;
