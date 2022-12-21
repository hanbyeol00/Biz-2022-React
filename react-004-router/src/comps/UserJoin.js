import { useParams } from "react-router-dom";
const UserJoin = () => {
  const { username } = useParams();

  return (
    <>
      <h1>여기는 회원가입 화면입니다</h1>
      <p>username:{username}</p>
    </>
  );
};
export default UserJoin;
