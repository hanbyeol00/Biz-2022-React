import { useContext, createContext, useState, useCallback } from "react";
import { InitData } from "../data/InitData";
import moment from "moment";
import uuid from "react-uuid";

// TodoContext : store
const TodoContext = createContext();

// useTodoContext() : 공급자
const useTodoContext = () => {
  return useContext(TodoContext);
};

// store 관리자
const TodoContextProvider = ({ children }) => {
  const [todoContentList, setTodoContentList] = useState([]);
  const [todoContent, setTodoContent] = useState(InitData());

  const todoInsert = useCallback(
    (t_content) => {
      console.log({ ...todoContent });
      if (!todoContent.id) {
        const data = { ...InitData(), t_content, id: uuid() };
        setTodoContentList([...todoContentList, data]);
        setTodoContent({ ...InitData() });
      } else {
        const updateList = todoContentList.map((item) => {
          if (item.id === todoContent.id) {
            item.t_content = todoContent.t_content;
          }
          return item;
        });
        setTodoContentList([...updateList]);
      }
      setTodoContent({ ...InitData() });
    },
    [setTodoContentList, todoContentList, todoContent]
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
          item.e_date = item.e_date ? "" : moment().format("YYYY[-]MM[-]DD");
          item.e_time = item.e_time ? "" : moment().format("HH:mm:ss");
        }
        return item;
      });
      setTodoContentList(completeList);
    },
    [setTodoContentList, todoContentList]
  );

  const todoEditer = (uid) => {
    const editorList = todoContentList.filter((item) => {
      return item.id === uid;
    });

    setTodoContent({ ...editorList[0] });
    console.log({ ...editorList[0] });
  };

  const props = {
    todoContent,
    setTodoContent,
    todoContentList,
    setTodoContentList,
    todoInsert,
    todoComplete,
    todoDelete,
    todoEditer,
  };
  return <TodoContext.Provider value={props}>{children}</TodoContext.Provider>;
};
export { TodoContextProvider, useTodoContext };
