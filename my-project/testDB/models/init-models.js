var DataTypes = require("sequelize").DataTypes;
var _animal_hospital = require("./animal_hospital");
var _board_detail = require("./board_detail");
var _board_images = require("./board_images");
var _comment = require("./comment");
var _re_comment = require("./re_comment");
var _tbl_like = require("./tbl_like");
var _user = require("./user");

function initModels(sequelize) {
  var animal_hospital = _animal_hospital(sequelize, DataTypes);
  var board_detail = _board_detail(sequelize, DataTypes);
  var board_images = _board_images(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var re_comment = _re_comment(sequelize, DataTypes);
  var tbl_like = _tbl_like(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    animal_hospital,
    board_detail,
    board_images,
    comment,
    re_comment,
    tbl_like,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
