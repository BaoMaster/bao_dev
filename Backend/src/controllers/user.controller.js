const db = require('../../config/db.config');
const User = db.user;

const Permission = db.permission;
const Op = db.Sequelize.Op;
const multer = require('multer');

const mail = require('../../helper/mailForRegister');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const shortId = require('shortid');
const jwt_decode = require('jwt-decode');
// const mail = require("../helper/mail");
// const user = require("../models/user");
shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
// const { Op } = require("sequelize/types");

// function sendcode(email) {
//   // const code = shortId.generate();
//   // const verify = await Verify.create({
//   //   user: user._id,
//   //   code
//   // });

//   mail.send(
//     email,
//     "This is the first email",
//     "this is what i want to tell you"
//   );
// }
// const validateRegisterInput = require("../Validation/register");
// const validateLoginInput = require("../Validation/login");
// const validateVerifyInput = require("../Validation/verify");
// const validateForgotInput = require("../Validation/forgot");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

// router.post('/post', upload.single('image'), async function (req, res) {
//   const imagePath = path.join(__dirname, '/public/images');
//   const fileUpload = new Resize(imagePath);
//   if (!req.file) {
//     res.status(401).json({error: 'Please provide an image'});
//   }
//   const filename = await fileUpload.save(req.file.buffer);
//   return res.status(200).json({ name: filename });
// });

function sendCode(email, username) {
  mail.send(email, username);
}

exports.reSend = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      const code = shortId.generate();
      sendCode(user.email, code);
      user.update({ codeforverify: code });
      return res.send('resend success');
    })
    .catch((err) => {
      return res.send('ERR: ' + err);
    });
};

exports.getAll = (req, res) => {
  User.findAll().then((data) => {
    res.send(data);
  });
};

exports.getOne = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    res.send(data);
  });
};

exports.register = (req, res) => {
  // Form validation

  // const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  console.log('Register is starting');

  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      // if (user.username == req.body.username) {
      //   return res.status(400).json({ name: "UserName already exit" });
      // }
      if (user) {
        return res.status(401).json({ name: 'Username already exit' });
      }
      User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((users) => {
        if (users) {
          return res.status(401).json({ email: 'Email already exit' });
        } else {
          User.create({
            // codenv: req.body.codenv,
            // fullname: req.body.fullname,
            username: req.body.username,
            // dayofbirth: req.body.dayofbirth,
            // phonenumber: req.body.phonenumber,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            dayOfBirth: req.body.dayOfBirth,
            role: req.body.role,
            avatar: req.body.avatar,
            // address: req.body.address,
            password: bcrypt.hashSync(req.body.password, 8),

            // isverify: req.body.isverify,
            // roles:req.body.roles
          })
            .then((user) => {
              // const code = shortId.generate();
              // console.log('CODE:' + code);
              // console.log('username:' + user);
              // console.log('role:' + req.body.role);
              console.log('register successfully test git continue bao main', user.username);
              console.log('register successfully test git continue bao mainss', user.email);
              sendCode(user.email, user.username);
              // user.update({ codeforverify: code });

              res.status(200).send({ status: 'success' });
            })
            .catch((err) => {
              res.status(500).send('Fail, Error=>' + err);
            });
        }
      });
    })
    .catch((err) => {
      return res.send({ messErr: err });
    });
};

exports.forgotPassword = (req, res) => {
  const { errors, isValid } = validateForgotInput(req.body);
  const shortpass = shortId.generate();
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((users) => {
      if (!users) {
        return res.status(400).json({ name: 'User or email not found' });
      }
      // if (user.email != req.body.email) {
      //   return res.status(400).json({ email: "Email or User not found" });
      // }
      const newPass = bcrypt.hashSync(shortpass, 8);
      users.update({ password: newPass });
      // sendCode(user.email, newPass);
      res.status(200).send({
        forgotPassword: shortpass,
        status: 'Your new password is sended to your email',
      });
    })
    .catch((err) => {
      return res.status(501).send({ mess: err });
    });
};

function generateAccessToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: 200,
  });
}

exports.login = (req, res) => {
  console.log('Sign-In');
  // const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  findPermission = (role) => {};
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ status: 'error', message: 'User Not Found.' });
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({
          status: 'error',
          message: 'Password incorrect',
        });
      }
      if (user.idverify == false) {
        return res.status(400).json({ status: 'error', message: 'Please verify your account !' });
      }
      //   user.update({
      //     islogin: true
      //   })
      // user.islogin = true
      // User.update(islogin = true, {
      //   where: {
      //     username: req.body.username
      //   }
      // })
      var token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h', // expires in 24 hours
        }
      );
      const accessToken = generateAccessToken(user.id, user.role);

      var decode = jwt_decode(token);
      res.status(200).send({
        auth: true,
        status: 'success',
        message: 'Login successfully !',
        username: user.username,
        access_token: token,
        refresh_token: token,
        permission: user.permission,
        decode: decode,
        idverify: user.idverify,
      });
    })
    .catch((err) => {
      res.status(500).send('Error -> ' + err);
    });
};

exports.refreshToken = (req, res) => {
  var token = jwt.sign(
    {
      id: req.id,
      role: req.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 30, // expires in 24 hours
    }
  );
  res.send('refrshToken:', token);
};

exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          status: 'success',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        msg: err,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          status: 'success',
        });
      }
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });
};

exports.verify = (req, res) => {
  // const code = req.body.code;
  // const email = req.body.email;
  User.findOne({
    where: {
      username: req.params.id,
    },
  })
    .then((user) => {
      // return res.json(user);
      if (user.idverify === false) {
        user.update({ idverify: true });
        return res.json({ status: 'success', message: 'Your account has been successfully verified' });
      } else {
        return res.json({ status: 'fail', message: 'Your account has been verified' });
      }
      // if (!user) {
      //   return res.status(401).json({
      //     message: 'email is not correct',
      //   });
      // } else {
      //   if (code == user.codeforverify) {
      //     user.update({ idverify: true });
      //     return res.send('your account is verified');
      //   } else {
      //     return res.send('Your verify code is not correct');
      //   }
      // }
    })
    .catch((err) => {
      return res.send({ ERR: err.message });
    });
};

exports.getUserById = (req, res) => {
  User.findOne({ where: { id: req.params.id } }).then((data) => {
    return res.json({ status: 'success', data: data });
  });
};

exports.determinePermissions = (req, res) => {
  const role = req.body.role;

  Role.findOne({
    where: { role },
  }).then((data) => {
    return res.json({ status: 200, data: data });
  });
};
