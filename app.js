const express = require('express'),
	  mongoose = require('mongoose'),
	  bodyParser = require('body-parser'),
	  methodOverride = require('method-override'),
	  expressSanitizer = require('express-sanitizer'),
	  app = express();

mongoose.connect("mongodb://localhost/blog_app2", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false})
.then(() => console.log("Connected 2 DB"))
.catch(error => console.log(error.message));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
	shul: String,
	rabbi: String, 
	image: String
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	shul: "beachwood",
// 	rabbi: "katz"
// });

// 'GET' ALL ROUTE
app.get("/blogs", (req, res) => {
	Blog.find({}, (err, blogs) => {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});

// 'GET' NEW ROUTE
app.get("/blogs/new", (req, res) => {
	res.render("new");
});

// 'POST' ROUTE
app.post("/blogs", (req, res) => {
	//req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.create(req.body.blog, (err, newBlog) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/blogs");
		}
	});
});

// 'GET' SHOW SPECIFIC ONE ROUTE
app.get("/blogs/:id", (req, res) => {
	Blog.findById(req.params.id, (err, foundBlog) => {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});

// 'GET' EDIT ROUTE
app.get("/blogs/:id/edit", (req, res) => {
	Blog.findById(req.params.id, (err, editBlog) => {
		if(err) {
			console.log(err);
		} else {
			res.render("edit", {blog: editBlog});
		}
	});	
});

// 'PUT' UPDATE ROUTE
app.put("/blogs/:id", (req, res) => {
		//req.body.blog.body = req.sanitize(req.body.blog.body)
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

app.delete("/blogs/:id", (req, res) => {
	Blog.findByIdAndRemove(req.params.id, (err, deletedBlog) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/blogs");
		}
	});
});


app.listen(3000, () => {
	console.log("blogapp2 server running");
});









