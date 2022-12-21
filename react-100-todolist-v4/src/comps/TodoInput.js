// import { useState } from "react";

const TodoInput = (props) => {
  // state 를 제거하고 TodoMain으로 부터 state 받기
  const { todoInsert, todoContent, setTodoContent } = props;

  // TodoInput 에 있는 state 를 TodoMain 으로 이동하기
  // const [todoContent, setTodoContent] = useState("");

  /**
   * 추가 button 을 클릭했을때 사용할 event
   */
  const onClickHandler = () => {
    todoInsert(todoContent.t_content);
    // setTodoContent("");
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
      <button onClick={onClickHandler}>추가</button>
    </div>
  );
};
export default TodoInput;
