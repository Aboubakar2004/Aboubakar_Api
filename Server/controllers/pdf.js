const puppeteer = require("puppeteer");
const Fs = require("fs");
const Path = require("path");
const Util = require("util");
const ReadFile = Util.promisify(Fs.readFile);

async function html() {
  try {
    const htmlPath = Path.join("../sample.html");
    const content = await ReadFile(htmlPath, "utf8");
    return content;
  } catch (error) {
    console.log("Le fichier html ne peut pas être lu");
  }
}

async function createPDF(req, res) {
  html().then(async (data) => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const convertPage = await browser.newPage();

    await convertPage.setContent(data);

    const pdfbuffer = await convertPage.pdf({
      format: "A4",
      printBackground: true,
    });
    res.contentType("application/pdf");
    res.send(pdfbuffer);
  });
}

module.exports.createPDF = createPDF;
