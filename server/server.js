const { handler } = require("../netlify/functions/attachApiKey");
const express = require("express");

const app = express();
const port = 3002;

app.use(express.json());
app.post("/attachAPIkey", (req, res) => {
  handler(req, res);
});

app.listen(port, () => console.log(`listening on ${port}`));
