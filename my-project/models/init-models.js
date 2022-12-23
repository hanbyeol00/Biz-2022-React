import _animal_hospital from "./animal_hospital.js";
import _board_detail from "./board_detail.js";
import _board_images from "./board_images.js";
import _comment from "./comment.js";
import _re_comment from "./re_comment.js";
import _tbl_like from "./tbl_like.js";
import _user from "./user.js";

const initModels = (sequelize) => {
  const animal_hospital = _animal_hospital(sequelize);
  const board_detail = _board_detail(sequelize);
  const board_images = _board_images(sequelize);
  const comment = _comment(sequelize);
  const re_comment = _re_comment(sequelize);
  const tbl_like = _tbl_like(sequelize);
  const user = _user(sequelize);

  return {
    animal_hospital,
    board_detail,
    board_images,
    comment,
    re_comment,
    tbl_like,
    user,
  };
};

export default initModels;
