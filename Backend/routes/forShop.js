var nodemailer = require("nodemailer"); // khai báo sử dụng module nodemailer
const express = require("express");
const router = express.Router();
const controller = require("../src/controllers/product.controller");
const multer = require("multer");
const path = require("path");
const Resize = require("../config/resize");
const mail = require("../helper/mail");
const pdfController = require("../src/controllers/pdf");

router.post("/api/addproducttocart", controller.addProductToCart);
router.post("/api/addoneincart", controller.addOneInCart);
router.post("/api/suboneincart", controller.subOneInCart);
router.get("/api/getproduct", controller.getProduct);
router.get("/api/getproductfromcart/:id", controller.getProductFromCart);
router.post("/api/update/:id", controller.updateProduct);
router.get("/api/search/:keyword", controller.search);
router.get("/api/findbrand/:brand", controller.findBrand);
router.post("/api/addtocheckout", controller.addToCheckout);
router.post("/api/addtohistory", controller.addToHistory);
router.get("/api/getproductbyid/:id", controller.getProductById);
router.get("/api/getinfofromcheckout/:userid", controller.getInfoFromCheckout);
router.delete("/api/deleteproduct/:id", controller.deleteProduct);
router.delete("/api/removefromcart", controller.removeFromCart);
router.delete("/api/deletecartbyuserid", controller.deleteCartByUserid);
router.delete("/api/deletecheckoutbyuserid", controller.deleteCheckoutByUserid);
router.post("/pdf", pdfController.pdf);

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});
router.post("/post", upload.single("image"), async function (req, res) {
  const imagePath = path.join(__dirname, "../public/images/product");
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(401).json({ error: "Please provide an image" });
  }
  const filename = await fileUpload.save(req.file.buffer);
  return res.status(200).json({ name: filename });
});

router.post("/send", function (req, res, next) {
  mail.send(
    req.body.email,
    req.body.orderid,
    req.body.username,
    req.body.total
  );
  return res.status(200).json({ status: "success" });
});
router.get("/download/:pdfname", function (req, res) {
  var file = `${__dirname}/data/pdf/${req.params.pdfname}.pdf`;
  //  '/file-folder/salesReport.pdf';
  // return res.status(200).json({ file });
  res.download(file);
});

module.exports = router;
