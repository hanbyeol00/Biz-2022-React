import { useLoaderData } from "react-router-dom";
import ContactInput from "./ContactInput";

export const loader = async ({ params }) => {
  const uid = params.uid;

  const res = await fetch(`/api/detail/?uid=${uid}`);
  const result = await res.json();
  return { contact: result };
};

const ContactDetail = () => {
  const { contact } = useLoaderData();
  return (
    <div className="detail">
      <div className="img">
        <img></img>
      </div>
      <div className="friend">
        <div>
          이름 : {contact.c_name}
          <ContactInput placeholder="이름을 입력하세요" />
        </div>
        <div>
          email : {contact.c_email}
          <ContactInput placeholder="이메일을 입력하세요" />
        </div>
        <div>
          tel : {contact.c_tel}
          <ContactInput placeholder="전화번호를 입력하세요" />
        </div>
        <div>
          주소 : {contact.c_addr}
          <ContactInput placeholder="주소를 입력하세요" />
        </div>
      </div>
    </div>
  );
};
export default ContactDetail;
