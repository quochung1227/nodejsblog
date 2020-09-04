// Goi cac module can thiet
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ObjectId = require("mongodb").ObjectId;
const Port = 3000;
const formidable = require("formidable");
const fs = require('fs');
const { response } = require('express');
// Parse du lieu 
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
// Thiet lap duong dan static
app.use("/static", express.static(__dirname + "/static")); //Serves resources from public folder
// Setup view engine
app.set('view engine', 'ejs');
//Connect to mongo
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true }, function(error, client) {
    const blog = client.db("blog");
    console.log("Database connected !");
    //Homepage
    app.get('/', (req, res) => {
        blog.collection("posts").find().sort({ "_id": 1 }).toArray(function(error, posts) {
            posts = posts.reverse();
            res.render("user/home", { posts: posts });
        })
    });
    // ADMIN DASHBOARD PAGE req.body
    app.get('/admin/dashboard', (req, res) => {
        res.render("admin/dashboard");
    });
    // ADMIN POST PAGE
    app.get('/admin/posts', (req, res) => {
        res.render("admin/posts");
    });
    // FUNCTION MAKE POST FORM
    app.post('/do-post', (req, res) => {
        blog.collection("posts").insertOne(req.body, (error, document) => {
            res.send("Posted succcessfully");
        });
    });
    // Mo detail post
    app.get('/posts/:title', (req, res) => {
        const myid = req.params.title;
        blog.collection("posts").findOne({
                'title': myid
            },
            (error, post) => {
                res.render("user/post", { post: post });
                //res.send(post);
            });
    });
    //do-comment
    app.post("/do-comment", function(req, res) {
        const mytitle = req.body.post_title;
        blog.collection("posts").updateOne({
                "title": mytitle
            }, {
                $push: {
                    "comments": { username: req.body.username, comment: req.body.comment }
                }
            },
            function(error, post) {
                res.send("Comment sucessful");
            });
    });
    //do-upload-image
    app.post("/do-upload-image", function(req, res) {
        const formData = new formidable.IncomingForm();
        formData.parse(req, function(error, fields, files) {
            const oldPath = files.file.path;
            //res.send(oldPath);
            const newPath = "static/images/" + files.file.name;
            fs.rename(oldPath, newPath, function(err) {
                res.send("/" + newPath);
            })
        })
    })
});

app.listen(Port, () => console.log(`Example app listening at :${Port}`));