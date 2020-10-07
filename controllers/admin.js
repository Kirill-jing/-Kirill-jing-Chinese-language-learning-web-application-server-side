const Exercise = require("../models/Exercise");
const Cart = require("../models/Cart");
const User = require("../models/User");
exports.adminPost = (req, res, next) => {
  let name = req.body.name;
  let nameTr = req.body.nameTr;
  let pinin = req.body.pinin;
  let example = req.body.example;
  let exampleTr = req.body.exampleTr;
  let examplePinin = req.body.examplePinin;
  let type = req.body.type;
  let nameType = req.body.nameType;
  let image = req.files["image"][0].path;
  let audio = req.files["audio"][0].path;
  let exercise = new Exercise({
    name: name,
    nameTr: nameTr,
    pinin: pinin,
    image: image,
    example: example,
    exampleTr: exampleTr,
    type: type,
    nameType: nameType,
    examplePinin: examplePinin,
    audio: audio,
  });
  exercise.save().then((ex) => {
    res.json(ex);
  });
};

exports.getWord = (req, res, next) => {
  Exercise.find().then((words) => {
    res.json({ words: words });
  });
};

// exports.adminCart = (req, res, next) => {
//   let id = req.params.id;
//   let creator;
//   return Exercise.findById(id)
//     .then((res) => {
//       let cart = new Cart({
//         name: res.name,
//         nameTr: res.nameTr,
//         pinin: res.pinin,
//         image: res.image,
//         example: res.example,
//         exampleTr: res.exampleTr,
//         type: res.type,
//         nameType: res.nameType,
//         examplePinin: res.examplePinin,
//         audio: res.audio,
//         creator: req.userId,
//       });
//       cart
//         .save()
//         .then((word) => {
//           return User.findById(req.userId);
//         })
//         .then((user) => {
//           creator = user;
//           user.yourwords.push(cart);
//           return user.save();
//         });
//     })
//     .then((resul) => {
//       res.status(200).json({
//         message: "added",
//       });
//     });
// };
exports.adminCart = (req, res, nex) => {
  let id = req.params.id;
  Exercise.findById(id)
    .then((exercise) => {
      return User.findById(req.userId).then((user) => {
        user.yourwords.add(exercise);
        return user.save();
      });
    })
    .then((resul) => {
      console.log(resul);
      res.status(200).json({
        message: "added",
      });
    });
};

exports.postMultiple = (req, res, next) => {
  let cartArr = req.body.checkedArr;
  Exercise.find()
    .then((exers) => {
      return exers.filter((el) => {
        for (let i = 0; i <= cartArr.length; i++) {
          if (cartArr[i] == el._id) {
            return true;
          }
        }
      });
    })
    .then((finalEx) =>
      User.findById(req.userId).then((user) => {
        finalEx.map((elem) => {
          if (
            user.yourwords.every((el) => el.toString() !== elem._id.toString())
          ) {
            user.yourwords.push(elem);
          } else {
            console.log("already have");
            return;
          }
        });
        return user.save();
      })
    )
    .then((resul) => res.status(200).json({ message: "referer" }));
};

exports.getCart = (req, res, nex) => {
  User.findById(req.userId)
    .then((user) => {
      return Exercise.find().then((exers) => {
        return exers.filter((el) => {
          return user.yourwords.some(
            (elem) => elem.toString() === el._id.toString()
          );
        });
      });
    })
    .then((words) => res.json({ cart: words }));
};
