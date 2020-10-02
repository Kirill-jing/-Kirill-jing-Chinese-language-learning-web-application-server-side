const Exercise = require("../models/Exercise");

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

exports.adminCart = (req, res, next) => {
  let id = req.params.id;
  Exercise.findById(id).then((res) => console.log(res));
};
