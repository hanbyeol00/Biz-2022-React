import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import BookMain from "../comps/books/BookMain";
import MyBookMain from "../comps/mybook/MyBookMain";
import UserMain from "../comps/users/UserMain";

const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <BookMain /> },
      { path: "books", element: <BookMain /> },
      { path: "books/mybook", element: <MyBookMain /> },
      {
        path: "user",
        children: [
          { path: "login", element: <UserMain /> },
          { path: "join", element: <h1>회원가입</h1> },
          { path: "logout", element: <h1>logout</h1> },
          { path: "mypage", element: <h1>MyPage</h1> },
          { path: "find/id", element: <h1>아이디 찾기</h1> },
          { path: "find/password", element: <h1>비밀번호 찾기</h1> },
        ],
      },
      {
        path: "user/join",
        element: (
          <>
            <h1>회원가입</h1>
          </>
        ),
      },
      {
        path: "user/mypage",
        element: (
          <>
            <h1>MyPage</h1>
          </>
        ),
      },
    ],
  },
]);

export default MainRouter;
