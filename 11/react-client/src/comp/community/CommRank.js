import { useRef } from "react";
import {
  EyeIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const CommRank = ({ data }) => {
  const keyRef = useRef(0);

  const Rank = () => {
    return data.map((item) => {
      keyRef.current++;
      return (
        <Link
          className="rank-item grid grid-cols-2 grid-rows-2 p-2 border-b border-dashed border-slate-300"
          key={keyRef.current}
          to={`/community/${item["board.b_eng"]}/${item.p_code}`}
        >
          <div className="text-left font-bold">{item.p_title}</div>
          <div className="w-full text-right">
            <EyeIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
            <span className="mr-2">{item.p_views}</span>
            <HandThumbUpIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
            <span className="mr-2">{item.p_upvote}</span>
            <ChatBubbleOvalLeftEllipsisIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
            <span>{item.p_replies}</span>
          </div>
          {/* nickname으로 수정 필요 */}
          <div className="text-left text-sm">{item.username}</div>
          <div className="text-right">{item["board.b_kor"]}</div>
        </Link>
      );
    });
  };

  return (
    <section className="commu-rank grid grid-cols-none grid-rows-5">
      <Rank />
    </section>
  );
};

export default CommRank;
