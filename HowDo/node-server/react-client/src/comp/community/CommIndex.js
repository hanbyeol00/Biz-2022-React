import "../../css/community/Index.css";
import BoardNav from "./BoardNav";
import { useLoaderData, Outlet } from "react-router-dom";
import { getBoardList } from "../../service/post.service";

export const loader = async () => {
  const board = await getBoardList();
  return board;
};

const CommIndex = () => {
  const board = useLoaderData();

  return (
    <main className="comm-index container mx-auto">
      <BoardNav data={board} />
      <Outlet />
    </main>
  );
};

export default CommIndex;
