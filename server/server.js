const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

const auth = require('./routes/auth');
const election = require('./routes/election');
const candidate = require('./routes/candidate');

app.listen(5000, "localhost", () => {
    console.log("SERVER IS RUNNING");
});


app.use("/auth", auth);
app.use("/election", election);
app.use("/candidate", candidate);
