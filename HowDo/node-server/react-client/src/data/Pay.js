export const dataPayReady = {
  cid: "TCSUBSCRIP",
  partner_order_id: "",
  partner_user_id: "",
  item_name: "",
  quantity: 1,
  total_amount: 2500,
  tax_free_amount: 0,
  approval_url: `http://localhost:5000/approval/`,
  fail_url: "http://localhost:5000",
  cancel_url: "http://localhost:5000",
};

export const dataPayApprove = {
  cid: "TCSUBSCRIP",
  tid: "",
  partner_order_id: "",
  partner_user_id: "",
  pg_token: "",
};

export class dataSubApprovalSave {
  constructor(partner_user_id, partner_order_id, sid, approved_at) {
    this.partner_user_id = partner_user_id;
    this.partner_order_id = partner_order_id;
    this.sid = sid;
    this.approved_at = approved_at;
  }
}
