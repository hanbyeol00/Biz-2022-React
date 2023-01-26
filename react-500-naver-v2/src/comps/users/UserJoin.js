import { useUserContext } from "../../context/UserContextProvider";

const UserJoin = () => {
  const { loginUser, setLoginUser, userLogin, inputRef } = useUserContext();

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
        ref={inputRef.usernameRef}
        name="username"
        value={loginUser.username}
        onChange={onChangeHandler}
        className="w3-input"
        placeholder="USERNAME"
      />
      <input
        ref={inputRef.passwordRef}
        name="password"
        value={loginUser.password}
        onChange={onChangeHandler}
        className="w3-input"
        placeholder="PASSWORD"
        type="password"
      />
      <input
        name="re_password"
        value={loginUser.re_password}
        onChange={onChangeHandler}
        className="w3-input"
        placeholder="비밀번호 확인"
        type="password"
      />

      <input
        name="u_name"
        value={loginUser.u_name}
        onChange={onChangeHandler}
        className="w3-input"
        placeholder="실제이름"
      />
      <input
        name="u_nickname"
        value={loginUser.u_nickname}
        onChange={onChangeHandler}
        className="w3-input"
        placeholder="별명"
      />
      <input
        name="u_email"
        value={loginUser.u_email}
        onChange={onChangeHandler}
        className="w3-input"
        placeholder="Email"
        type="email"
      />
      <input
        name="u_tel"
        value={loginUser.u_tel}
        onChange={onChangeHandler}
        className="w3-input"
        placeholder="전화번호"
        type="phone"
      />
      <input
        name="u_addr"
        value={loginUser.u_addr}
        onChange={onChangeHandler}
        className="w3-input"
        placeholder="주소"
      />
      <button className="w3-button w3-margin-top w3-padding-16 w3-orange w3-block w3-round">
        회원가입
      </button>
    </div>
  );
};

export default UserJoin;
