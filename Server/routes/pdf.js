const router = require("express").Router();
const pdfCtrl = require("../controllers/pdf");

router.get("/", async (req, res) => {
  res.json({ message: "Bonjour" });
});

router.get("/getpdf", async (req, res) => {
  try {
    pdfCtrl.createPDF(req, res);
  } catch (error) {
    console.log(error);
  }
});

console.log(pdfCtrl);

module.exports = router;
