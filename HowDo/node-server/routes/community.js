import express from "express";
import sequelize from "sequelize";
import { QueryTypes } from "sequelize";
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
const VIDEO = DB.models.video;

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

    // 코드 정리 필요

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

router.get("/posts/:find?/:value/:bCode/search", async (req, res) => {
  const find = req?.params?.find;
  const value = req.params.value;
  const bCode = req.params.bCode;
  try {
    const result = await POST.findAll({
      where: {
        [Op.and]: [
          { p_title: { [Op.iLike]: `%${value}%` } },
          { b_code: bCode },
        ],
      },
    });
    return res.status(200).send(result);
  } catch (err) {
    console.error(err);
    return res.send({ ERROR: "검색 중 오류가 발생했습니다." });
  }
});

router.get("/board/:value?/get", async (req, res) => {
  const value = req?.params?.value;
  // cf) value 가 없을 경우 where 절을 {} 로 설정하여 전체 목록 표시
  const result = await BOARD.findAll({
    where: value
      ? {
          b_kor: { [Op.like]: `%${value}%` },
        }
      : {},
    raw: true,
  });
  return res.status(200).send(result);
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
    const asdf = await ATTACH.create(uploadFileInfo);
    console.log(asdf);
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
    const nestedReply = (data) => {
      const result = [];
      for (let reply of data) {
        if (!reply.reply_child) {
          reply.reply_child = [];
        }
        for (let item of data) {
          if (item.r_parent_code === reply.r_code) {
            reply.reply_child.push(item);
          }
        }
        // 최상위 level 댓글만 result 배열에 push
        if (Number(reply.depth) === 0) {
          result.push(reply);
          // 그렇지 않을 경우 재귀적 함수 호출
        } else {
          nestedReply(reply.reply_child);
        }
      }
      return result;
    };

    // 게시글의 모든 댓글
    // 삭제된 댓글 처리 방법: front 에서 체크 후 "삭제된 댓글입니다" 문구
    // 재귀 참조를 위해 Raw Query 를 사용
    // depth 칼럼을 추가하여 해당 댓글의 계층 level 파악
    let replyList;
    const videoReply = await VIDEO.findAll({ where: { v_code: pCode } });
    const postReply = await POST.findAll({ where: { p_code: pCode } });
    if (videoReply[0]?.dataValues) {
      replyList = await DB.sequelize
        .query(
          `WITH RECURSIVE videoReplies AS (
          SELECT *, 0 AS depth FROM reply
            WHERE v_code = :pCode AND r_deleted IS NULL AND r_parent_code IS NULL
          UNION ALL
          SELECT c.*, depth + 1 FROM reply c
            JOIN videoReplies r ON c.r_parent_code = r.r_code
      )
      SELECT videoReplies.*, user.nickname, user.profile_image FROM videoReplies  
          JOIN user ON videoReplies.username = user.username
          ORDER BY r_date DESC, r_time DESC`,
          { replacements: { pCode: `${pCode}` }, type: QueryTypes.SELECT }
        )
        .then((data) => nestedReply(data));
    } else if (postReply[0]?.dataValues) {
      replyList = await DB.sequelize
        .query(
          `WITH RECURSIVE replies AS (
          SELECT *, 0 AS depth FROM reply
            WHERE p_code = :pCode AND r_deleted IS NULL AND r_parent_code IS NULL
          UNION ALL
          SELECT c.*, depth + 1 FROM reply c
            JOIN replies r ON c.r_parent_code = r.r_code
      )
      SELECT replies.*, user.nickname, user.profile_image FROM replies  
          JOIN user ON replies.username = user.username
          ORDER BY r_date DESC, r_time DESC`,
          { replacements: { pCode: `${pCode}` }, type: QueryTypes.SELECT }
        )
        .then((data) => nestedReply(data));
    }

    const videoReplyCount = await VIDEO.findOne({
      attributes: ["v_replies"],
      where: { v_code: pCode },
    });

    // 게시글의 최상위 댓글 수
    const postReplyCount = await POST.findOne({
      attributes: ["p_replies"],
      where: { p_code: pCode },
    });
    console.log(postReplyCount);

    const replyCount =
      postReplyCount?.p_replies == undefined
        ? videoReplyCount?.v_replies
        : postReplyCount?.p_replies;

    return res.send({ replyList, replyCount });
  } catch (err) {
    console.error(err);
  }
});

router.post("/reply/insert", async (req, res) => {
  const data = req.body;
  try {
    const result = await REPLY.create(data);
    try {
      // r_parent_code 가 있을 경우(대댓글일 경우)
      if (data.r_parent_code) {
        await REPLY.update(
          { r_children: sequelize.literal("r_children + 1") },
          { where: { r_code: req.body.r_parent_code } }
        );
      }
      // r_parent_code 가 null 일 경우(최상위 댓글일 경우)
      if (data.p_code) {
        if (!data.r_parent_code) {
          await POST.update(
            { p_replies: sequelize.literal("p_replies + 1") },
            { where: { p_code: req.body.p_code } }
          );
        }
      } else {
        if (!data.r_parent_code) {
          await VIDEO.update(
            { v_replies: sequelize.literal("v_replies + 1") },
            { where: { v_code: req.body.v_code } }
          );
        }
      }
    } catch (err) {
      console.error(err);
      return res.send({ ERROR: "댓글 게시 중 오류가 발생했습니다." });
    }
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.send({ ERROR: "댓글 게시 중 오류가 발생했습니다." });
  }
});

router.get("/reply/:rCode/delete", async (req, res) => {
  const rCode = req.params.rCode;
  try {
    const date = moment().format("YYYY[-]MM[-]DD HH:mm:ss");
    await REPLY.update({ r_deleted: date }, { where: { r_code: rCode } });
    try {
      // 최상위 댓글일 경우 post 댓글 수 - 1
      const data = await REPLY.findByPk(rCode);
      if (data.p_code) {
        if (!data.r_parent_code) {
          await POST.update(
            { p_replies: sequelize.literal("p_replies - 1") },
            { where: { p_code: data.p_code } }
          );
        }
      } else if (data.v_code) {
        if (!data.r_parent_code) {
          await VIDEO.update(
            { v_replies: sequelize.literal("v_replies - 1") },
            { where: { v_code: data.v_code } }
          );
        }
      }
      if (data.r_parent_code) {
        const asdf = await REPLY.update(
          { r_children: sequelize.literal("r_children - 1") },
          { where: { r_code: data.r_parent_code } }
        );
      }
    } catch (err) {
      console.error(err);
      return res.send({ ERROR: "댓글 삭제 중 문제가 발생했습니다." });
    }
    return res.send({ MESSAGE: "댓글이 삭제되었습니다." });
  } catch (err) {
    console.error(err);
    return res.send({ ERROR: "댓글 삭제 중 문제가 발생했습니다." });
  }
});

export default router;
