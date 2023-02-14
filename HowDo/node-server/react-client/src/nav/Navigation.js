import { createBrowserRouter } from "react-router-dom";
import AppSample from "../App";
import MainPage from "../comp/mainpage/MainPage";
import MyPageMain, {
  myPageFetch as myPageLoader,
} from "../comp/mypage/MyPageMain";
import Join from "../comp/login/Join";
import Login from "../comp/login/Login";
import LoginModal from "../comp/login/Login";
import CommIndex, { loader as CommLoader } from "../comp/community/CommIndex";
import CommMain, { loader as CommMainLoader } from "../comp/community/CommMain";
import Board, { loader as BoardLoader } from "../comp/community/Board";
import PostDetail, {
  loader as DetailLoader,
} from "../comp/community/PostDetail";
import PostWrite from "../comp/community/PostWrite";
import Approve from "../comp/purchase/Approve";
import SearchMain, { SearchLoader } from "../comp/serachPage/SearchMain";
import UserPageMain, { userPageFetch } from "../comp/userpage/UserPageMain";
import ShortMain from "../comp/Video/Main";
import VideoDetail from "../comp/Video/VideoDetail";

import CreaterMain, {
  loader as CreaterFetch,
} from "../comp/userpage/CreaterMain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppSample />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "/user", element: <Join /> },
      { path: "/user/login", element: <Login /> },
      { path: "/:id", loader: myPageLoader, element: <MyPageMain /> },
      { path: "/creater", loader: CreaterFetch, element: <CreaterMain /> },
      {
        path: "/creater/:id",
        loader: userPageFetch,
        element: <UserPageMain />,
      },
      { path: "/login", element: <LoginModal /> },
      {
        path: "/community",
        loader: CommLoader,
        element: <CommIndex />,
        children: [
          { path: "", loader: CommMainLoader, element: <CommMain /> },
          {
            path: ":board",
            loader: BoardLoader,
            element: <Board />,
          },
          {
            path: ":board/:post",
            loader: DetailLoader,
            element: <PostDetail />,
          },
          {
            path: "write/:post?",
            element: <PostWrite />,
          },
        ],
      },

      { path: "/approval", element: <Approve /> },
      { path: "/search/:query", loader: SearchLoader, element: <SearchMain /> },
      { path: "/video/shorts", element: <ShortMain /> },
      { path: "/video/detail/:v_code", element: <VideoDetail /> },
    ],
  },
]);

export default router;
