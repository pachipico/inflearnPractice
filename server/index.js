const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");

const { User } = require("./models/User");
const config = require("./config/key");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log("mongodb Connected"))
	.catch((err) => console.log(err));

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.post("/api/users/register", (req, res) => {
	const user = new User(req.body);

	user.save((err, userInfo) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({ success: true });
	});
});

app.post("/api/users/login", (req, res) => {
	//find requested email in our database
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user) {
			return res.json({ success: false, message: "no requested email found" });
		}
		//if requested email exist, check password
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch)
				return res.json({ loginSuccess: false, message: "wrongpassword" });
			//if password right, create token

			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);

				res
					.cookie("x_auth", user.token)
					.status(200)
					.json({ loginSuccess: true, userId: user._id });
			});
		});
	});
});

app.get("/api/users/auth", auth, (req, res) => {
	res.status(200).json({
		_id: req.user_id,
		//normalUser = 0, admin = 1
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image: req.user.image,
	});
});

app.get("/api/users/logout", auth, (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
		if (err) return res.json({ success: false, err });
		console.log(req.user._id);

		return res.status(200).send({
			success: true,
		});
	});
});

app.get("/api/hello", (req, res) => {
	res.send("hello");
});
const port = 5000;
app.listen(port, () => {
	console.log("Server started on port 5000.");
});
