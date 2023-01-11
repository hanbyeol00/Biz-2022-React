import styled from "styled-components";

const ItemView = styled.li`
  width: 80%;
  margin: 0 auto;
  display: flex;
  cursor: pointer;

  &:hover span:nth-of-type(2) {
    opacity: 1;
  }
`;

const ContentBox = styled.span`
  flex: 5;
`;

const DeleteBtn = styled.span`
  flex: 1;
  opacity: 0;
  transition: 0.7s;
`;

const TodoItem = (props) => {
  const deleteClickHandler = () => {
    if (window.confirm(`${props.item} 삭제확인!!`)) {
      props.todoDelete(props.id);
    }
  };
  const CompleteClickHandler = () => {
    props.todoComplete(props.id);
  };
  return (
    <ItemView>
      <ContentBox
        style={props.complete ? { "text-decoration": "line-through" } : ""}
        onClick={CompleteClickHandler}
      >
        {props.item}
      </ContentBox>
      <DeleteBtn onClick={deleteClickHandler}>&times;</DeleteBtn>
    </ItemView>
  );
};
export default TodoItem;
