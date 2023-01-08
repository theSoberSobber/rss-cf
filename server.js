const express = require("express");
const app = express();

app.listen(process.env.PORT || 7000);

// _____________________________________
let xml_res;
(async () => {xml_res = await require('./parser.js')();/*console.log(xml_res);*/})();

// _____________________________________

app.get("/", async (req, res) => {
    res.redirect("https://github.com/theSoberSobber/rss-cf");
});

app.get("/rss", async (req, res) => {
    res.set('Content-Type', 'application/xml');
    res.send(xml_res);
});