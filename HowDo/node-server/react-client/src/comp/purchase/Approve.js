import { payApprove, subApprovalSave } from "../../service/auth.service";
import { usePayContext } from "../../context/PayContextProvider";
import { dataPayApprove, dataSubApprovalSave } from "../../data/Pay";
import { useEffect, useRef } from "react";
import moment from "moment";

const Approve = () => {
  const { userSession } = usePayContext();
  const query = window.location.search;
  const pg_token = query.substring(10, 30);
  const tid = localStorage.getItem("tid");
  const order_id = localStorage.getItem("order_id");

  dataPayApprove.tid = tid;
  dataPayApprove.pg_token = pg_token;
  dataPayApprove.partner_user_id = userSession.username;
  dataPayApprove.partner_order_id = order_id;
  // 카카오페이 승인 요청

  let data = useRef();
  useEffect(() => {
    (async () => {
      const result = await payApprove(dataPayApprove);
      // console.log(result);

      if (result.sid) {
        data.current = new dataSubApprovalSave(
          result.partner_user_id,
          result.partner_order_id,
          result.sid,
          result.approved_at.substr(0, 10),
          result.approved_at.substr(0, 10)
        );
        console.log(data);
        subApprovalSave(data.current);
      }
    })();
  });

  const nextPay = moment(data?.current?.approved_at).add(30, "d");

  return (
    <div className="ml-auto w-1/2">
      <h1>How Do</h1>
      <div>
        <h1>결제가 완료되었습니다</h1>
        <p>결제일시: </p>
        <p>결제금액: </p>
        <p>다음결제일: </p>
      </div>
      <button>이어서 보기</button>
      <button>구매내역 확인</button>
    </div>
  );
};
export default Approve;
