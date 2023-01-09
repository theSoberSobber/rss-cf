import express from "npm:express@4.18.2";
import { make } from "./parser.js"
const app = express();

app.listen(7000);

// _____________________________________
let xml_res;
(async () => {xml_res = await make();/*console.log(xml_res);*/})();

// _____________________________________

app.get("/", async (req, res) => {
    res.redirect("https://github.com/theSoberSobber/rss-cf");
});

app.get("/rss", async (req, res) => {
    res.set('Content-Type', 'application/xml');
    res.send(xml_res);
});