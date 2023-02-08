import { XMarkIcon } from "@heroicons/react/20/solid";
import { useUserContext } from "../../context/UserContextProvider";
import { usePayContext } from "../../context/PayContextProvider";
import { payReady } from "../../service/auth.service";

const Purchase = () => {
  const { modal, modalHandler, userSession } = useUserContext();
  const { statePayReady } = usePayContext();

  return (
    <div>
      <div
        className={
          modal.open
            ? "background fixed top-0 left-0 h-full w-full bg-zinc-800 opacity-40"
            : ""
        }
        onClick={modalHandler}
      ></div>
      <div
        className={
          modal.open
            ? "fixed w-1/3 top-32 left-1/3 bg-white rounded-2xl"
            : "hidden"
        }
      >
        <div className="flex justify-between items-center bar">
          <h1 className="p-3 ">구독</h1>
          <div className="h-7 w-7 mr-2 cursor-pointer" onClick={modalHandler}>
            <XMarkIcon />
          </div>
        </div>
        <div className="content">
          <div className="flex justify-around items-center bg-stone-200">
            <img
              className="inline-block w-40 rounded-full p-6"
              src="https://yt3.ggpht.com/Uk6ujyzSetiuHYpEaEPzscAjGx_a4Vd2j3zQ-z_ciFySagb23eiD2-YzRxr18xK1bMedCNhxEg=s256-c-k-c0x00ffffff-no-rj"
            />
            <div>
              <h1 className="text-2xl m-2">{userSession.nickname}</h1>
              <p>구독혜택 이용해보기</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-end m-4">
              <h2>₩{userSession.price}/월</h2>
              <button
                className="p-2 ml-5 rounded-full text-white bg-sky-600 hover:bg-sky-700"
                onClick={() => {
                  payReady(statePayReady);
                }}
              >
                구독하기
              </button>
            </div>
            <h1 className="ml-5 underline underline-offset-8">멤버십 혜택</h1>
            <p className="m-4">
              국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의
              발전에 노력하여야 한다. 국가안전보장회의는 대통령이 주재한다.
              헌법재판소는 법률에 저촉되지 아니하는 범위안에서 심판에 관한 절차,
              내부규율과 사무처리에 관한 규칙을 제정할 수 있다. 대통령은 국가의
              안위에 관계되는 중대한 교전상태에 있어서 국가를 보위하기 위하여
              긴급한 조치가 필요하고 국회의 집회가 불가능한 때에 한하여 법률의
              효력을 가지는 명령을 발할 수 있다. git 변경
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
