const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

const auth = require('./controllers/auth');
const election = require('./controllers/election');
const candidate = require('./controllers/candidate');

app.listen(5000, "localhost", () => {
    console.log("SERVER IS RUNNING");
});


app.use("/auth", auth);
app.use("/election", election);
app.use("/candidate", candidate);
