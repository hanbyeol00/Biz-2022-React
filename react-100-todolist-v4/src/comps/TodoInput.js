import { useTodoContext } from "../Context/TodoContext";

const TodoInput = () => {
  //  ContextProvider 로 부터 state 관련 변수, 함수 받기
  const { todoInsert, todoContent, setTodoContent } = useTodoContext();

  /**
   * 추가 button 을 클릭했을때 사용할 event
   */
  const onClickHandler = () => {
    todoInsert(todoContent.t_content);
  };

  /**
   * input box 문자열을 입력할때 사용할 event
   */
  const onChangeHandler = (e) => {
    const value = e.target.value;
    setTodoContent({ ...todoContent, t_content: value });
  };

  return (
    <div className="input">
      <input
        placeholder="TODO"
        onChange={onChangeHandler}
        value={todoContent.t_content}
      />
      <button
        onClick={onClickHandler}
        disabled={todoContent.t_content.length < 5}
      >
        Enter
      </button>
    </div>
  );
};
export default TodoInput;
