const express = require("express");
const pdfroute = require("./routes/pdf");

const corsHeaders = require("./middleware/cors");

const app = express();

app.options("*", corsHeaders);
app.use(corsHeaders);

app.use(express.json());

app.use("/api/pdf", pdfroute);

app.listen(8080, () => console.log("Le Serveur écoute au port 8080"));

module.exports = app;
