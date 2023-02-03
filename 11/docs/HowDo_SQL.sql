-- HowDo SQL
CREATE DATABASE HowDo;
USE HowDo;

DROP TABLE image;

CREATE TABLE image (
i_code	BIGINT	AUTO_INCREMENT	PRIMARY KEY	,		
i_src	VARCHAR(256)	NOT NULL	,				
i_title	VARCHAR(256)	NOT NULL,					
i_detail	TEXT	,					
i_category	VARCHAR(50)						,
i_views	BIGINT,						
i_price	INT	,					
i_reg_date	DATETIME		default current_timestamp,
i_start_date	DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
i_delete_date	VARCHAR(125)

);

INSERT INTO image(
i_src,
i_title,
i_detail,
i_category,
i_views,
i_price,
i_delete_date
)
VALUES(
"src","title","detail","category",12,13000,"deletedate");

UPDATE image SET i_src = "update src", i_price = "5000" WHERE i_code = 1;
    
		



