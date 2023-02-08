import express from "express";
import sequelize from "sequelize";
import { Op } from "sequelize";
import fileUp from "../modules/file_upload.js";
import DB from "../models/index.js";
import fs from "fs";
import path from "path";
import { v4 } from "uuid";
import moment from "moment";

const USER = DB.models.user;
const BOARD = DB.models.board;
const POST = DB.models.post;
const ATTACH = DB.models.attach;
const UPVOTE = DB.models.upvote;
const REPLY = DB.models.reply;

const router = express.Router();

// get board list
router.get("/boards/get", async (req, res) => {
  try {
    const board = await BOARD.findAll();
    return res.status(200).send(board);
  } catch (err) {
    console.error(err);
  }
});

// POST-ATTACH 관계 설정할 경우 에디터에 이미지를 등록할 때
// 게시글보다 첨부파일이 먼저 등록되므로 INSERT 되지 않는 문제 발생

// community Main fetch
router.get("/posts/get", async (req, res) => {
  try {
    // 그룹 B1 을 제외한 모든 그룹 리스트
    // 코드 수정 필요
    const notGeneral = await BOARD.findAll({
      attributes: ["b_group_code", "b_group_kor"],
      where: { b_group_code: { [Op.not]: "B1" } },
      group: "b_group_code",
    });

    const boardList = [];
    for (let board of notGeneral) {
      let items = {};
      items.b_group_code = `${board.b_group_code}`;
      items.b_group_kor = `${board.b_group_kor}`;
      items.list = await POST.findAll({
        where: {
          [Op.and]: [
            { b_group_code: `${board.b_group_code}` },
            { p_deleted: null },
          ],
        },
        include: [
          { model: BOARD, attributes: ["b_code", "b_kor", "b_eng"] },
          {
            model: USER,
            attributes: ["nickname"],
          },
        ],
        limit: 5,
        subQuery: false,
        order: [
          ["p_upvotes", "DESC"],
          ["p_date", "DESC"],
        ],
        raw: true,
      });
      boardList.push(items);
    }

    const noticeList = {};
    noticeList.b_code = `B11`;
    noticeList.b_kor = `공지`;
    noticeList.list = await POST.findAll({
      where: {
        [Op.and]: [{ b_code: `B11` }, { p_deleted: null }],
      },
      include: [{ model: BOARD, attributes: ["b_code", "b_kor", "b_eng"] }],
      limit: 5,
      subQuery: false,
      order: [
        ["p_date", "DESC"],
        ["p_time", "DESC"],
      ],
      raw: true,
    });

    const freeList = {};
    freeList.b_code = `B12`;
    freeList.b_kor = `자유게시판`;
    freeList.list = await POST.findAll({
      where: {
        [Op.and]: [{ b_code: `B12` }, { p_deleted: null }],
      },
      include: [
        { model: BOARD, attributes: ["b_code", "b_kor", "b_eng"] },
        {
          model: USER,
          attributes: ["nickname"],
        },
      ],
      limit: 5,
      subQuery: false,
      order: [
        ["p_date", "DESC"],
        ["p_time", "DESC"],
      ],
      raw: true,
    });

    return res.status(200).send({ noticeList, freeList, boardList });
  } catch (err) {
    console.error(err);
  }
});

// community board fetch
router.get("/board/:bEng/:order/get", async (req, res) => {
  const bEng = req.params.bEng;
  const order = req.params.order;
  const orderOption = {
    latest: [
      ["p_date", "DESC"],
      ["p_time", "DESC"],
    ],
    upvotes: [
      ["p_upvotes", "DESC"],
      ["p_date", "DESC"],
      ["p_time", "DESC"],
    ],
    replies: [
      ["p_replies", "DESC"],
      ["p_date", "DESC"],
      ["p_time", "DESC"],
    ],
    views: [
      ["p_views", "DESC"],
      ["p_date", "DESC"],
      ["p_time", "DESC"],
    ],
  };
  try {
    const board = await BOARD.findOne({
      where: { b_eng: bEng },
    });
    const data = await POST.findAll({
      attributes: [
        "p_code",
        "p_title",
        "p_replies",
        "username",
        "p_date",
        "p_time",
        "p_views",
        "p_upvotes",
      ],
      where: { [Op.and]: [{ b_code: board.b_code }, { p_deleted: null }] },
      include: [
        {
          model: BOARD,
          attributes: ["b_code", "b_kor", "b_eng"],
        },
        {
          model: USER,
          attributes: ["nickname"],
        },
      ],
      order: orderOption[`${order}`],
      raw: true,
    });
    return res.status(200).send({ board, data });
  } catch (err) {
    console.error(err);
  }
});

// community Detail fetch
router.get("/post/:pCode/get", async (req, res) => {
  try {
    const pCode = req.params?.pCode;
    await POST.update(
      { p_views: sequelize.literal("p_views + 1") },
      { where: { p_code: pCode } }
    );
    const post = await POST.findByPk(pCode, {
      include: {
        model: USER,
        attributes: ["nickname", "profile_image"],
      },
    });
    const board = await BOARD.findByPk(post.toJSON().b_code);
    if (post.toJSON().p_deleted) {
      return res.send({
        ERROR: "삭제된 게시글입니다.",
        bEng: board.toJSON().b_eng,
      });
    }
    return res.status(200).send({ post, board });
  } catch (err) {
    console.error(err);
  }
});

// editor 에 이미지 업로드
// fileUp.single("...") : formData 객체에 file 을 append 했던 key 값으로 지정
// (key=value 로 저장되므로 input tag 의 name 과 동일한 역할)
// 파일을 여러 개 선택하더라도 별도로 요청하므로 single 로 받을 것
router.post("/upload", fileUp.single("upload"), async (req, res, next) => {
  console.log("file", req.file);
  // 게시글 uuid
  console.log("code", req.body.pcode);

  try {
    const file = req.file;
    const pcode = req.body.pcode;
    const uploadFileInfo = {
      a_code: v4(),
      p_code: pcode,
      a_original_name: file.originalname,
      a_save_name: file.filename,
      a_ext: file.mimetype,
    };
    await ATTACH.create(uploadFileInfo);

    return res.json({
      uploaded: true,
      url: uploadFileInfo.a_save_name,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/post/insert", async (req, res) => {
  const data = req.body;
  try {
    await POST.create(data);
    return res.send({ MESSAGE: "게시글이 등록되었습니다." });
  } catch (err) {
    console.error(err);
    return res.send({ ERROR: "게시글을 등록하는 중 문제가 발생했습니다." });
  }
});

router.patch("/post/update", async (req, res, next) => {
  const data = req.body;
  try {
    console.log("asdf", data.p_code);
    await POST.update(data, { where: { p_code: data.p_code } });
    return res.send({ MESSAGE: "게시글이 수정되었습니다." });
  } catch (err) {
    console.error(err);
    return res.send({ ERROR: "게시글을 수정하는 중 문제가 발생했습니다." });
  }
});

router.get("/post/:pCode/delete", async (req, res, next) => {
  const pCode = req.params.pCode;
  // const uploadDir = path.join("public/uploads");
  // let files;
  // 일정 시간 지나면 댓글 + 첨부파일과 함께 게시글 완전 삭제 필요
  try {
    const date = moment().format("YYYY[-]MM[-]DD HH:mm:ss");
    await POST.update({ p_deleted: date }, { where: { p_code: pCode } });
    await REPLY.update({ r_deleted: date }, { where: { p_code: pCode } });

    return res.send({ MESSAGE: "게시글이 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    return res.send({ ERROR: "게시글 삭제 중 문제가 발생했습니다." });
  }

  // files = await ATTACH.findAll({ where: { p_code: pCode } });
  // await files.forEach(async (file) => {
  //   try {
  //     const delFile = path.join(uploadDir, files.a_save_name);

  //     fs.statSync(delFile);
  //     fs.unlinkSync(delFile);
  //   } catch (err) {
  //     console.log(file.a_save_name, "파일을 찾을 수 없음");
  //   }
  // });
});

router.patch("/post/upvote", async (req, res, next) => {
  const data = req.body;
  try {
    await UPVOTE.create(data);
  } catch (err) {
    console.error(err);
    return res.send({ ERROR: "이미 추천한 게시글입니다." });
  }
  try {
    const result = await POST.update(
      { p_upvotes: sequelize.literal("p_upvotes + 1") },
      { where: { p_code: req.body.p_code } }
    );
    await USER.update(
      { upvote: sequelize.literal("upvote + 1") },
      { where: { username: req.body.p_user } }
    );
    console.log(req.body.username);
    return res.send(result);
  } catch (err) {
    console.error(err);
  }
});

router.get("/reply/:pCode/get", async (req, res) => {
  const pCode = req.params.pCode;
  try {
    // 게시글의 모든 댓글
    const replyList = await REPLY.findAll({
      where: { [Op.and]: [{ p_code: pCode }, { r_deleted: null }] },
      order: [
        ["r_date", "DESC"],
        ["r_time", "DESC"],
      ],
      include: [
        {
          model: REPLY,
          as: "reply_child",
        },
        { model: USER, attributes: ["nickname", "profile_image"] },
      ],
    });
    // 게시글의 최상위 댓글 수
    const replyCount = await POST.findOne({
      attributes: ["p_replies"],
      where: { p_code: pCode },
    });
    return res.send({ replyList, replyCount });
  } catch (err) {
    console.error(err);
  }
});

router.post("/reply/insert", async (req, res) => {
  const data = req.body;
  try {
    const result = await REPLY.create(data);
    console.log(result);
    // r_parent_code 가 null 일 경우(최상위 댓글일 경우)
    if (result && !data.r_parent_code) {
      await POST.update(
        { p_replies: sequelize.literal("p_replies + 1") },
        { where: { p_code: req.body.p_code } }
      );
    }
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.send({ ERROR: "댓글 게시 중 오류가 발생했습니다." });
  }
});

router.get("/reply/:rCode/:pCode/delete", async (req, res) => {
  const rCode = req.params.rCode;
  const pCode = req.params.pCode;
  try {
    const date = moment().format("YYYY[-]MM[-]DD HH:mm:ss");
    const result = await REPLY.update(
      { r_deleted: date },
      { where: { r_code: rCode } }
    );
    console.log(result);
    if (result) {
      await POST.update(
        { p_replies: sequelize.literal("p_replies - 1") },
        { where: { p_code: pCode } }
      );
    }
    return res.send({ MESSAGE: "댓글이 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    return res.send({ ERROR: "댓글 삭제 중 문제가 발생했습니다." });
  }
});

export default router;
