import { useUserContext } from "../../context/UserContextProvider";

const UserLogin = () => {
  const { loginUser, setLoginUser, userLogin } = useUserContext();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    /**
     * 계산된 property 를 활용하여
     * input tag 의 name 속성을 참조하여
     * 여러개의 input chang event 를 한개로 처리하기
     */
    // setLoginUser({...loginUser, username:"han"})
    setLoginUser({ ...loginUser, [name]: value });
  };

  return (
    <div className="w3-container w3-padding-24 w3-center">
      <input
        name="username"
        value={loginUser.username}
        onChange={onChangeHandler}
        className="w3-input"
        placeholder="USERNAME"
      />
      <input
        name="password"
        value={loginUser.password}
        onChange={onChangeHandler}
        className="w3-input"
        placeholder="PASSWORD"
        type="password"
      />
      <button
        className="w3-button w3-margin-top w3-padding-16 w3-orange w3-block w3-round"
        onClick={() => userLogin()}
      >
        로그인
      </button>
    </div>
  );
};

export default UserLogin;
