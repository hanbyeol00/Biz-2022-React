const StateList = (props) => {
  const { viewList } = props;

  const viewListTags = viewList.map((view) => {
    return <p>{view}</p>;
  });

  return <div>{viewListTags}</div>;
};
export default StateList;
