// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the book model
let book = require("../models/books");

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render("books/details", { title: "Add Book", books: {} });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  // Create a new book object
  const newBook = new book({
    Title: req.body.title,
    Description: "",
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  });

  // Save new book object
  newBook
    .save()
    .then(() => {
      res.redirect("/books");
    })
    .catch((err) => {
      res.render("error", { error: err, message: err });
    });
});

// GET the Book Details page in order to edit an existing Book
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  // Search for book by _id
  book
    .findOne({ _id: req.params.id })
    .then((book) => {
      res.render("books/details", { title: "Details", books: book });
    })
    .catch((err) => {
      res.render("error", { error: err, message: err });
    });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  // Create a new book object using form properties
  const bookProps = {
    Title: req.body.title,
    Description: "",
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  };

  // Update the book using the _id param
  book
    .updateOne(
      { _id: req.params.id },
      {
        $set: bookProps,
      }
    )
    .then(() => {
      console.log("Update complete.");
      res.redirect("/books");
    })
    .catch((err) => {
      res.render("error", { error: err, message: err });
    });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  // Delete book using the _id property
  book
    .deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/books");
    })
    .catch((err) => {
      res.render("error", { error: err, message: err });
    });
});

module.exports = router;
