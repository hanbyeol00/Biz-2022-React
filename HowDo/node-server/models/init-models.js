import _attach from "./attach.js";
import _board from "./board.js";
import _image from "./image.js";
import _post from "./post.js";
import _purchase from "./purchase.js";
import _reply from "./reply.js";
import _shorts from "./shorts.js";
import _user from "./user.js";
import _video from "./video.js";
import _view_history from "./view_history.js";
import _i_authority from "./i_authority.js";
import _v_authority from "./v_authority.js";
import _subscribe from "./subscribe.js";
import _upvote from "./upvote.js";

const initModels = (sequelize) => {
  const attach = _attach(sequelize);
  const board = _board(sequelize);
  const image = _image(sequelize);
  const post = _post(sequelize);
  const purchase = _purchase(sequelize);
  const reply = _reply(sequelize);
  const shorts = _shorts(sequelize);
  const user = _user(sequelize);
  const video = _video(sequelize);
  const view_history = _view_history(sequelize);
  const i_authority = _i_authority(sequelize);
  const v_authority = _v_authority(sequelize);
  const subscribe = _subscribe(sequelize);
  const upvote = _upvote(sequelize);

  user.belongsToMany(video, { through: v_authority, foreignKey: "username" });
  video.belongsToMany(user, { through: v_authority, foreignKey: "v_code" });

  v_authority.belongsTo(user, { foreignKey: "username" });
  v_authority.belongsTo(video, { foreignKey: "v_code" });

  user.belongsToMany(video, {
    as: "f_video",
    through: view_history,
    foreignKey: "username",
  });
  video.belongsToMany(user, {
    as: "f_user_v",
    through: view_history,
    foreignKey: "v_code",
  });

  view_history.belongsTo(user, { foreignKey: "username" });
  view_history.belongsTo(video, { foreignKey: "v_code" });

  user.belongsToMany(video, {
    as: "f_purchase_video",
    through: purchase,
    foreignKey: "username",
  });

  video.belongsToMany(user, {
    as: "f_purchase_user_v",
    through: purchase,
    foreignKey: "v_code",
  });

  purchase.belongsTo(user, { foreignKey: "username" });
  purchase.belongsTo(video, { foreignKey: "v_code" });

  user.belongsToMany(image, {
    as: "f_image",
    through: view_history,
    foreignKey: "username",
  });

  image.belongsToMany(user, {
    as: "f_user_i",
    through: view_history,
    foreignKey: "i_code",
  });

  // view_history.belongsTo(user, { foreignKey: "username" });
  view_history.belongsTo(image, { foreignKey: "i_code" });

  user.belongsToMany(image, {
    as: "f_purchase_image",
    through: purchase,
    foreignKey: "username",
  });

  image.belongsToMany(user, {
    as: "f_purchase_user_i",
    through: purchase,
    foreignKey: "i_code",
  });

  // purchase.belongsTo(user, { foreignKey: "username" });
  purchase.belongsTo(image, { foreignKey: "i_code" });

  user.belongsToMany(image, { through: i_authority, foreignKey: "username" });
  image.belongsToMany(user, { through: i_authority, foreignKey: "i_code" });

  i_authority.belongsTo(user, { foreignKey: "username" });
  i_authority.belongsTo(image, { foreignKey: "i_code" });

  user.belongsToMany(user, {
    as: "f_sub_user",
    through: subscribe,
    foreignKey: "partner_user_id",
  });
  user.belongsToMany(user, {
    as: "f_sub_order",
    through: subscribe,
    foreignKey: "partner_order_id",
  });

  subscribe.belongsTo(user, { foreignKey: "partner_user_id" });
  subscribe.belongsTo(user, { foreignKey: "partner_order_id" });

  user.hasMany(upvote, { foreignKey: "username" });
  upvote.belongsTo(user, { foreignKey: "username" });

  post.hasMany(upvote, { foreignKey: "p_code" });
  upvote.belongsTo(post, { foreignKey: "p_code" });

  user.hasMany(post, { foreignKey: "username" });
  post.belongsTo(user, { foreignKey: "username" });

  // user.belongsToMany(user, {
  //   as: "f_sub",
  //   through: subscribe,
  //   foreignKey: "username",
  // });
  // post.hasMany(attach, { as: "attachs", foreignKey: "p_code" });
  // attach.belongsTo(post, {
  //   as: "rel_post",
  //   foreignKey: "p_code",
  // });

  // child reply
  reply.hasMany(reply, { as: "reply_child", foreignKey: "r_parent_code" });

  // import board data
  board.hasMany(post, { foreignKey: "b_code" });
  post.belongsTo(board, { foreignKey: "b_code" });

  post.hasMany(reply, { foreignKey: "p_code" });
  reply.belongsTo(post, { foreignKey: "p_code" });

  video.hasMany(reply, { foreignKey: "v_code" });
  reply.belongsTo(video, { foreignKey: "v_code" });

  user.hasMany(reply, { foreignKey: "username" });
  reply.belongsTo(user, { foreignKey: "username" });

  user.hasMany(image, { foreignKey: "username" });
  image.belongsTo(user, { foreignKey: "username" });

  user.hasMany(video, { foreignKey: "username" });
  video.belongsTo(user, { foreignKey: "username" });

  video.hasMany(shorts, { foreignKey: "v_code" });
  shorts.belongsTo(video, { foreignKey: "v_code" });

  return {
    attach,
    board,
    image,
    post,
    purchase,
    reply,
    shorts,
    user,
    video,
    view_history,
    i_authority,
    v_authority,
    subscribe,
    upvote,
  };
};

export default initModels;
