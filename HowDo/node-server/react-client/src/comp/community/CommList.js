import {
  EyeIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const CommList = ({ data }) => {
  const List = () => {
    return data.list.map((item) => {
      return (
        <Link
          className="rank-item grid grid-cols-2 grid-rows-1 p-2 border-b border-dashed border-slate-300"
          key={item.p_code}
          to={`/community/${item["board.b_eng"]}/${item.p_code}`}
        >
          <div className="text-left font-bold">{item.p_title}</div>
          <div className="w-full text-right">
            <EyeIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
            <span className="mr-2">{item.p_views}</span>
            <HandThumbUpIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
            <span className="mr-2">{item.p_upvotes}</span>
            <ChatBubbleOvalLeftEllipsisIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
            <span>{item.p_replies}</span>
          </div>
          <div className="text-left text-sm">{item["user.nickname"]}</div>
        </Link>
      );
    });
  };

  return (
    <section className="commu-rank mb-10">
      <div className="main-item-title mb-2.5 p-2 text-left text-lg font-bold border-b border-slate-500">
        {data.b_kor}
      </div>
      <div className="grid grid-cols-2 grid-rows-3 grid-flow-col gap-5">
        <List />
      </div>
    </section>
  );
};

export default CommList;
