const express = require('express');
const router = express.Router();
const controller = require('../src/controllers/product.controller');
const multer = require('multer');
const path = require('path');
const Resize = require('../config/resize');

router.post('/api/addproducttocart', controller.addProductToCart);
router.get('/api/getproduct', controller.getProduct);
router.get('/api/getproductfromcart/:id', controller.getProductFromCart);
router.post('/api/update/:id', controller.updateProduct);
router.get('/api/getproductbyid/:id', controller.getProductById);
router.delete('/api/deleteproduct/:id', controller.deleteProduct);
router.delete('/api/removefromcart', controller.removeFromCart);
const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});
router.post('/post', upload.single('image'), async function (req, res) {
  const imagePath = path.join(__dirname, '../public/images/product');
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(401).json({ error: 'Please provide an image' });
  }
  const filename = await fileUpload.save(req.file.buffer);
  return res.status(200).json({ name: filename });
});
module.exports = router;
