import moment from "moment";

const InitData = () => {
  const TodoData = {
    id: "",
    s_date: moment().format("YYYY[-]MM[-]DD"),
    s_time: moment().format("HH:mm:ss"),
    t_content: "",
    e_date: "",
    e_time: "",
  };
  return TodoData;
};

export { InitData };
