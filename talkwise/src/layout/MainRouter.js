import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TalkwiseMain from "../comps/TalkwiseMain";
import Bookmark from "../comps/Bookmark";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <TalkwiseMain /> },
      { path: "bookmarks", element: <Bookmark /> },
    ],
  },
]);
export default MainRouter;
