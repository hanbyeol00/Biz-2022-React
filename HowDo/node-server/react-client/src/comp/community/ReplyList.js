import ReplyItem from "./ReplyItem";

const ReplyList = ({ data }) => {
  const ReplyBox = () => {
    return data
      .filter((item) => {
        return !item.r_parent_code;
      })
      .map((item, index) => {
        return <ReplyItem key={item.r_code} item={item} index={index} />;
      });
  };

  return (
    <section className="reply">
      <ReplyBox />
    </section>
  );
};

export default ReplyList;
