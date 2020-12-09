var express = require("express");
var router = express.Router();
const controller = require("../src/controllers/user.controller");
const multer = require("multer");
const path = require("path");

const Resize = require("../config/resize");

// const authJwt = require("../verifyJwtToken");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("index from nodejs server");
});
router.post("/api/register", controller.register);
router.post("/api/resetpassword", controller.resetPassword);
router.post("/api/login", controller.login);
router.post("/api/loginadmin", controller.loginAdmin);
// router.get("/login", controller.checkLogin)
// router.post("/logout", function (req, res) {
//   controller.logout;
// });

// router.get("/test/user", [authJwt.verifyToken], controller.userContent);
// router.get(
//   "/test/pm",
//   [authJwt.verifyToken, authJwt.isPmOrAdmin],
//   controller.managementBoard
// );
// router.get(
//   "/test/admin",
//   [authJwt.verifyToken, authJwt.isAdmin],
//   controller.adminBoard
// );
router.post("/api/forgotpassword", controller.forgotPassword);
router.post("/api/resend", controller.reSend);
router.post("/api/verify/:id", controller.verify);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads');
//   },
//   filename: (req, file, cb) => {
//       console.log(file);
//       cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//       cb(null, true);
//   } else {
//       cb(null, false);
//   }
// }
// const upload = multer({ storage: storage, fileFilter: fileFilter });

// router.post('/post', upload.single('image'), async function (req, res) {
//   const imagePath = path.join(__dirname, '/public/images');
//   const fileUpload = new Resize(imagePath);
//   if (!req.file) {
//     res.status(401).json({error: 'Please provide an image'});
//   }
//   const filename = await fileUpload.save(req.file.buffer);
//   return res.status(200).json({ name: filename });
// });

module.exports = router;
