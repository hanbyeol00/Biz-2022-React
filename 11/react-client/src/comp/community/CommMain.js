// 커뮤니티 초기 화면
import CommRank from "./CommRank";
import { getMainPosts } from "../../service/post.service";
import { useLayoutEffect, useState } from "react";

const CommMain = () => {
  const [rankData, setRankData] = useState([]);

  useLayoutEffect(() => {
    (async () => {
      const result = await getMainPosts();
      if (result) setRankData([...result.boardList]);

      return null;
    })();
  }, []);

  // component 함수는 비동기로 실행되서는 안된다(async, await X).
  const BoardBox = () => {
    return rankData.map((item) => {
      return (
        <section className="main-item p-5" key={item.b_group_code}>
          <div className="main-item-title mb-2.5 p-2 text-left text-lg font-bold border-b border-slate-500">
            {item.b_group_kor}
          </div>
          <CommRank data={item.list} />
        </section>
      );
    });
  };

  return (
    <main className="cat-main container mx-auto">
      <BoardBox />
    </main>
  );
};

export default CommMain;
