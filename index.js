const express = require("express");
const mongoose = require("mongoose");
const route = require("./src/routes/route");
const app = express();
const keysData = require("./config/keys");
console.log("DBURL", keysData);

app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://kuljitriar476:BJ6BVtr4kin1qpk5@cluster0.i6ej52l.mongodb.net/',
    // "mongodb+srv://kuljitriar476:gD2d8s9rqisLyFYN@cluster0.dlxxflm.mongodb.net/test",
    // "mongodb+srv://kuljitriar476:BJ6BVtr4kin1qpk5@cluster0.i6ej52l.mongodb.net/",
    {
      UseNewUrlParser: true,
    }
  )

  .then(() => console.log("mongoDB is  connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT, function () {
  console.log("server app listening on port " + (process.env.PORT || 5000));
});
