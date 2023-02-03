CREATE DATABASE howdo;
USE howdo;

DROP TABLE image;
SELECT * FROM user;

-- 사용자정보
CREATE TABLE IF NOT EXISTS user(
	username	VARCHAR(256),
	password	VARCHAR(256)	NOT NULL,	
	profile_image	VARCHAR(256),		
	nickname	VARCHAR(20)	NOT NULL	UNIQUE,
	birthdate	VARCHAR(256),		
	level	INT,		
	credit	INT,		
	delete_date	VARCHAR(256),		
	price	INT,		
	PRIMARY KEY(username)	
);

-- 이미지
CREATE TABLE IF NOT EXISTS image(
	i_code	VARCHAR(256),
	username	VARCHAR(256)	NOT NULL,
	i_src	VARCHAR(256)	NOT NULL,
	i_title	VARCHAR(256)	NOT NULL,
	i_detail	TEXT,	
	i_category	VARCHAR(50),	
	i_views	BIGINT,	
	i_price	INT,	
	i_create_date	datetime	DEFAULT CURRENT_TIMESTAMP,	
	i_update_date	datetime	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,	
	i_delete_date	VARCHAR(125),	
	PRIMARY KEY(i_code)
);

-- 영상
CREATE TABLE IF NOT EXISTS video(
	v_code	VARCHAR(256),
	username	VARCHAR(256)	NOT NULL,
	v_src	VARCHAR(256)	NOT NULL,
	v_title	VARCHAR(256)	NOT NULL,
	v_detail	TEXT,	
	v_price	INT,	
	v_category	VARCHAR(50),	
	v_views	BIGINT,	
	v_series	VARCHAR(256),	
	v_save_file	VARCHAR(500),	
	v_create_date	datetime	DEFAULT CURRENT_TIMESTAMP,	
	v_update_date	datetime	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,	
	v_delete_date	VARCHAR(125),
	PRIMARY KEY(v_code)
);

-- 쇼츠
CREATE TABLE IF NOT EXISTS shorts(
    sh_code	VARCHAR(256),
	v_code	VARCHAR(256),		
	sh_src	VARCHAR(256)	NOT NULL,	
	sh_title	VARCHAR(256)	NOT NULL,	
	sh_category	VARCHAR(50)	,
	sh_views	BIGINT	,	
	sh_create_date	datetime  DEFAULT CURRENT_TIMESTAMP,		
	sh_update_date	datetime  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,		
	sh_delete_date	VARCHAR(125)	,
	PRIMARY KEY(sh_code)
);

-- 구매내역
CREATE TABLE IF NOT EXISTS purchase(
	p_code	VARCHAR(256),
	username	VARCHAR(256),
	i_code	BIGINT,
	v_code	BIGINT,
	p_reg_date	datetime	DEFAULT CURRENT_TIMESTAMP,	
	p_pay_method	VARCHAR(125)	NOT NULL,
	PRIMARY KEY(p_code)
);

<<<<<<< HEAD
-- 게시판
CREATE TABLE IF NOT EXISTS board(
	b_code	VARCHAR(125),
	b_eng	VARCHAR(256)	NOT NULL,	
	b_kor	VARCHAR(256)	NOT NULL,	
	b_group_code	VARCHAR(125),		
	b_group_eng	VARCHAR(256),		
	b_group_kor	VARCHAR(256),
=======
-- 게시글
CREATE TABLE IF NOT EXISTS board_content(
	b_code	VARCHAR(256),
	username	VARCHAR(256),
	b_title	VARCHAR(256),	
	b_detail	TEXT,	
	b_category	VARCHAR(125),		
	b_create_date	 datetime	DEFAULT CURRENT_TIMESTAMP,
	b_update_date	 datetime	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,		
	b_delete_date	VARCHAR(125),		
	b_views	BIGINT		DEFAULT 0,
	b_upvote	BIGINT		DEFAULT 0,
	b_group	VARCHAR(125),
>>>>>>> master
	PRIMARY KEY(b_code)
);

-- 게시글
CREATE TABLE IF NOT EXISTS post(
	p_code	VARCHAR(256),
	username	VARCHAR(256),
	p_title	VARCHAR(256),	
	p_content	TEXT,	
	b_code	VARCHAR(125),		
	p_date	VARCHAR(10)	NOT NULL	DEFAULT(DATE_FORMAT(NOW(), "%Y-%m-%d")),
	p_time	VARCHAR(10)	NOT NULL	DEFAULT(DATE_FORMAT(NOW(), "%H:%i:&S")),
	p_updated	 DATETIME	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,		
	p_deleted	VARCHAR(125),		
	p_views	BIGINT		DEFAULT 0,
	p_replies	BIGINT		DEFAULT 0,
	p_upvote	BIGINT		DEFAULT 0,
	b_group_code	VARCHAR(125),
	PRIMARY KEY(p_code)
);

-- 댓글
CREATE TABLE IF NOT EXISTS reply(
	r_code	VARCHAR(256),
	p_code	VARCHAR(256),
	username	VARCHAR(256),
	r_content	VARCHAR(256),		
	r_create_date	datetime	DEFAULT CURRENT_TIMESTAMP,		
	r_update_date	datetime	DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,		
	r_delete_date	VARCHAR(125),		
	r_parent_code	VARCHAR(256),
	PRIMARY KEY(r_code)
);

-- 추천
CREATE TABLE IF NOT EXISTS upvote(
	p_code	VARCHAR(256),
	username	VARCHAR(256),
	PRIMARY KEY(p_code, username)			
);

-- 첨부파일
CREATE TABLE IF NOT EXISTS attach(
	a_code	VARCHAR(256),
<<<<<<< HEAD
	p_code	VARCHAR(256),
	a_date	DATETIME NOT NULL	DEFAULT CURRENT_TIMESTAMP,
=======
	b_code	VARCHAR(256),
	a_date	datetime	DEFAULT CURRENT_TIMESTAMP,
>>>>>>> master
	a_original_name	VARCHAR(256),
	a_save_name	VARCHAR(256),			
	a_ext	VARCHAR(10),		
	PRIMARY KEY(a_code)	
);


CREATE TABLE IF NOT EXISTS view_history(
h_code	VARCHAR(256)		PRIMARY KEY	,
username	VARCHAR(256),
v_code	VARCHAR(256),
i_code	VARCHAR(256),
h_date	datetime						DEFAULT CURRENT_TIMESTAMP
);



