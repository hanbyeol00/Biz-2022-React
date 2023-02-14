import ReplyItem from "./ReplyItem";

const ReplyList = ({ writer, data }) => {
  const ReplyBox = () => {
    return data.map((item, index) => {
      return (
        <ReplyItem
          key={item.r_code}
          writer={writer}
          item={item}
          index={index}
        />
      );
    });
  };

  return (
    <section className="reply">
      <ReplyBox />
    </section>
  );
};

export default ReplyList;
