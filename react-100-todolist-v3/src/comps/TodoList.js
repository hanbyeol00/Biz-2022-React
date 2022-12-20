import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const { todoContentList, todoDelete, todoComplete, todoEditer } = props;

  const todoListItemView = todoContentList.map((item) => {
    return (
      <TodoItem
        item={item}
        key={item.id}
        todoDelete={todoDelete}
        todoComplete={todoComplete}
        todoEditer={todoEditer}
      />
    );
  });

  return <div>{todoListItemView}</div>;
};
export default TodoList;
