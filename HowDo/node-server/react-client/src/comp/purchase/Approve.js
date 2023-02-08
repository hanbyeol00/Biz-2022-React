import { payApprove, subApprovalSave } from "../../service/auth.service";
import { usePayContext } from "../../context/PayContextProvider";
import { dataPayApprove, dataSubApprovalSave } from "../../data/Pay";
import { useEffect } from "react";

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

  useEffect(() => {
    (async () => {
      const result = await payApprove(dataPayApprove);
      // console.log(result);

      if (result.sid) {
        const data = new dataSubApprovalSave(
          result.partner_user_id,
          result.partner_order_id,
          result.sid,
          result.approved_at
        );
        // console.log(data);
        subApprovalSave(data);
      }
    })();
  });

  return (
    <div>
      <div>
        <h1>결제가 완료되었습니다</h1>
      </div>
    </div>
  );
};
export default Approve;
