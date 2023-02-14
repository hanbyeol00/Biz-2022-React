import { useEffect } from "react";
import { useUserContext } from "../../context/UserContextProvider";
import { fetchJoin } from "../../service/auth.service";
const Join = () => {
  const { joinUser, setJoinUser, error, setError, inputRef } = useUserContext();

  const onChangeHandler = async (e) => {
    const tagName = e.target.tagName;
    const { name, value } = e.target;
    await setJoinUser({ ...joinUser, [name]: value, name: tagName });
    console.log(joinUser);
  };

  const onClickHandler = async (e) => {
    const tagName = e.target.tagName;
    if (tagName === "BUTTON") {
      await setJoinUser({ ...joinUser, name: tagName });
    }
  };

  useEffect(() => {
    (async () => {
      const result = await fetchJoin(joinUser);
      if (result.CODE) {
        setError({ ...result });
      }
      if (result === joinUser.username) {
        document.location.href = "/";
        alert("회원가입이 완료되었습니다");
      }
      console.log(result);
    })();
  }, [joinUser]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-3/5 m-auto">
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <form method="post" onSubmit={submitHandler} className="mt-10 sm:mt-0">
        <div className="md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg ml-5 font-medium leading-6 text-gray-900">
              회원가입
            </h3>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      이메일주소
                    </label>
                    <input
                      ref={inputRef.usernameRef}
                      type="email"
                      name="username"
                      id="username"
                      onChange={onChangeHandler}
                      className="mt-1 p-4 w-1/2 m-auto block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {error.CODE === "REQ_USERNAME" ? (
                      <p className="text-red-500 mb-2 text-center">
                        이메일을 입력해 주세요
                      </p>
                    ) : error.CODE === "OVERLAP_USERNAME" ? (
                      <p className="text-red-500 mb-2 text-center">
                        이미 가입되어 있는 이메일입니다
                      </p>
                    ) : null}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="nickname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      닉네임
                    </label>
                    <input
                      type="text"
                      name="nickname"
                      id="nickname"
                      onChange={onChangeHandler}
                      className="mt-1 p-4 w-1/2 m-auto block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {error.CODE === "REQ_NICKNAME" ? (
                      <p className="text-red-500 mb-2 text-center">
                        닉네임을 입력해 주세요
                      </p>
                    ) : error.CODE === "OVERLAP_NICKNAME" ? (
                      <p className="text-red-500 mb-2 text-center">
                        이미 존재하는 닉네임입니다
                      </p>
                    ) : null}
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      비밀번호
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={onChangeHandler}
                      className="mt-1 p-4 w-1/2 m-auto block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {error.CODE !== "REQ_PASSWORD" ||
                    joinUser.password ? null : (
                      <p className="text-red-500 mb-2 text-center">
                        비밀번호를 입력해 주세요
                      </p>
                    )}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="re_password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      비밀번호 확인
                    </label>
                    <input
                      type="password"
                      name="re_password"
                      id="re_password"
                      onChange={onChangeHandler}
                      className="mt-1 p-4 w-1/2 m-auto block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {error.CODE === "REQ_RE_PASSWORD" ? (
                      <p className="text-red-500 mb-2 text-center">
                        비밀번호 확인을 입력해 주세요
                      </p>
                    ) : joinUser.password &&
                      joinUser.password === joinUser.re_password ? (
                      <p className="text-green-500 mb-2 text-center">
                        비밀번호가 일치합니다
                      </p>
                    ) : joinUser.password &&
                      joinUser.password !== joinUser.re_password ? (
                      <p className="text-red-500 mb-2 text-center">
                        비밀번호가 일치하지 않습니다
                      </p>
                    ) : null}
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="birthdate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      생년월일(선택)
                    </label>
                    <input
                      type="date"
                      name="birthdate"
                      id="birthdate"
                      onChange={onChangeHandler}
                      className="mt-1 p-4 w-1/2 m-auto block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  onClick={onClickHandler}
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  가입하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default Join;
