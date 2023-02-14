import { useUserContext } from "../../context/UserContextProvider";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { cancelUser } from "../../service/auth.service";

const Cancel = (props) => {
  const { cancel, cancelHandler, userSession } = useUserContext();
  const { orderUser } = props;
  return (
    <div>
      <div
        className={
          cancel.open
            ? "fixed top-0 left-0 h-full w-full bg-zinc-800 opacity-40"
            : ""
        }
        onClick={cancelHandler}
      ></div>
      <div
        className={
          cancel.open
            ? "fixed w-1/4 h-1/4 top-1/4 left-1/3 bg-white rounded-2xl p-3"
            : "hidden"
        }
      >
        <div className="flex justify-between">
          <h1>취소하기</h1>
          <XMarkIcon
            className="h-7 w-7 cursor-pointer"
            onClick={cancelHandler}
          />
        </div>
        <div className="grid grid-rows-2">
          <div>
            <p>정말 구독을 취소하시겠습니까?</p>
          </div>
          <button
            className="p-3 bg-sky-600 rounded-full text-white"
            onClick={() => {
              cancelUser(userSession.username, orderUser);
            }}
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
