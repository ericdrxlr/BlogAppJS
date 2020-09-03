1. make folder for your application
2. make app.js
3. in app.js npm init
4. npm express/ejs/body-parser/method-override/mongodb/mongoose
5. add require statements for all
6. make assets folder and views folder
7. inside view folder make index.ejs and partials folder with footer.ejs/header.js
8. this is the set up syntax:

					const express = require('express'),
						  mongoose = require('mongoose'),
						  bodyParser = require('body-parser'),
						  methodOverride = require('method-override'),
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
					app.use(methodOverride("_method"));
9. set up listening server 3000
10. test app.get and send a string
11. then render index and add an h1
12. open up mongodb and add an object with .insert() *later you'll .drop() the whole collection
13. make a schema in app.ejs to prepare js the format of the object in mongo
14. create object with mongoose, run node, and then run mongo and look for the object
15. make partials for header and footer
16. add semantic link and new stylesheet(dont forget / in the beg. and in folder 'public')
17. make menu and form from semantic
18. fix margin and icon
19. make get route for 'new' and post route to '/blogs'
