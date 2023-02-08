import {
  EyeIcon,
  HandThumbUpIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const CommRank = ({ data }) => {
  console.log(data);

  const Rank = () => {
    return data.map((item) => {
      return (
        <Link
          className="rank-item"
          key={item.p_code}
          to={`/community/${item["board.b_eng"]}/${item.p_code}`}
        >
          <div className="inline-block p-2">{item["board.b_kor"]}</div>
          <div className="inline-block p-2 float-right">
            <EyeIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
            <span className="mr-2">{item.p_views}</span>
            <HandThumbUpIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
            <span className="mr-2">{item.p_upvotes}</span>
            <ChatBubbleOvalLeftEllipsisIcon className="inline-block pt-1 h-5 w-5 text-slate-500" />
            <span>{item.p_replies}</span>
          </div>
          <div className="w-full h-44 bg-black col-span-2"></div>
          <div className="text-left font-bold p-2">{item.p_title}</div>
          <div className="text-left text-sm pl-2">{item["user.nickname"]}</div>
        </Link>
      );
    });
  };

  return (
    <section className="commu-rank grid grid-cols-5 gap-5 p-5">
      <Rank />
    </section>
  );
};

export default CommRank;
