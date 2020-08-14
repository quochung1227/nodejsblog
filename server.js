const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/static")); //Serves resources from public folder
// Setup view engine
app.set('view engine', 'ejs');

//Connect to mongoose
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
    .then(response => {
        console.log('Mongodb connect sucessed!')
    }).catch(err => {
        console.log('Mongodb connect failed!');
    })
    //Routes
    // homepage 
app.get('/', (req, res) => {
    res.render("admin/dashboard");
});
app.get('/admin/posts', (req, res) => {
    res.render("admin/posts");
});
app.post("/do-post", (req, res) => {
    res.send(req.body);
})
app.listen(Port, () => console.log(`Example app listening at :${Port}`));