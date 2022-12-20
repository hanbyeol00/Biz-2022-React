import { useCallback, useState } from "react";
import { InitData } from "../data/InitData";
import moment from "moment";
import TodoList from "./TodoList";
import TodoInput from "./TodoInput";
import "../css/Todo.css";

const TodoMain = () => {
  const [todoContentList, setTodoContentList] = useState([]);

  const todoInsert = useCallback(
    (t_content) => {
      // 데이터를 추가하는 곳
      const data = { ...InitData(), t_content };
      setTodoContentList([...todoContentList, data]);
    },
    [setTodoContentList, todoContentList]
  );

  const todoDelete = useCallback(
    (uid) => {
      const removeList = todoContentList.filter((item) => {
        return item.id !== uid;
      });
      setTodoContentList(removeList);
    },
    [setTodoContentList, todoContentList]
  );

  const todoComplete = useCallback(
    (uid) => {
      const completeList = todoContentList.map((item) => {
        if (item.id === uid) {
          // 완료버튼을 클릭했을때
          // 완료일자, 시간이 세팅되어 있으면 clear, 그렇지 않으면 다시 세팅
          item.e_date = item.e_date ? "" : moment().format("YYYY[-]MM[-]DD");
          item.e_time = item.e_time ? "" : moment().format("HH:mm:ss");
        }
        return item;
      });
      setTodoContentList(completeList);
    },
    [setTodoContentList, todoContentList]
  );

  return (
    <div className="Todo">
      <TodoInput todoInsert={todoInsert} />
      <TodoList
        todoContentList={todoContentList}
        todoDelete={todoDelete}
        todoComplete={todoComplete}
      />
    </div>
  );
};
export default TodoMain;
