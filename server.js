const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const fs = require("fs");

// The extensions 'html' allows us to serve file without adding .html at the end
// i.e /my-cv will server /my-cv.html
app.use(express.static("public", { extensions: ["html"] }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let subheading = " My Happy Study";

app.get("/", (req, res) => {
  const filePath = __dirname + "/data/posts.json";
  const callbackFunction = (error, file) => {
    // we call .toString() to turn the file buffer to a String
    const fileData = file.toString();
    // we use JSON.parse to get an object out the String
    const postsJson = JSON.parse(fileData);
    // send the json to the Template to render
    res.render("index", {
      title: "Won Maung Thein Profile", // insert your name instead
      posts: postsJson
    });
  };
  fs.readFile(filePath, callbackFunction);
});

// app.get("/", function(req, res) {
//   const filePath = __dirname + "/data/posts.json";
//   const callbackFunction = function(error, file) {
//     // we call .toString() to turn the file buffer to a String
//     const fileData = file.toString();
//     // we use JSON.parse to get an object out the String
//     const postsJson = JSON.parse(fileData);
//     // send the json to the Template to render
//     res.render("index", {
//       title: "Won's Profile", // insert your name instead
//       posts: postsJson
//     });
//   };
//   fs.readFile(filePath, callbackFunction);
// });

app.get("/my-cv", function(req, res) {
  res.render("my-cv", {
    // title: title,
    subheading: "My Work Experience"
  });
});

app.get("/admin", function(req, res) {
  res.render("admin", {
    // title: title,
    subheading: subheading
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    title: "Contact me",
    subheading: subheading
  });
});

// Practicing part under
app.get("/testing", function(req, res, next) {
  res.send("This is testing");
});
app.get("/new", (req, res, next) => res.send("This is a new page exercise"));
app.get("/hello", (req, res, next) =>
  res.send("Hello World, Hello code your future")
);
app.get("/nasir", (req, res, next) => res.send("Hello Nasir how are you?"));
app.get("/something", (req, res, next) =>
  res.send(" I am getting something because I requested something")
);
app.get("/aboutme", (req, res, next) => res.send("This is page about me"));

// 1. Add three routes for / , my-CV, admin
// 2. Add one for Contact
// 3. Change link for COntact me to contact us

app.get("/my-CV", (req, res, next) => res.send("This is my CV page"));
app.get("/admin", (req, res, next) => res.send("This is my admin"));
app.get("/contact", (req, res, next) => res.send("This is my contact page"));
app.get("/hobbies", (req, res, next) => res.send("This is my hobbies page"));

app.get("/", (req, res) => res.render("index"));
app.get("/my-cv", (req, res) => res.render("my-cv"));
app.get("/admin", (req, res) => res.render("admin"));
app.get("/myportfolio", (req, res) => res.render("myportfolio"));
app.get("/myprojects", (req, res) => res.render("myprojects"));

// what does this line mean: process.env.PORT || 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
