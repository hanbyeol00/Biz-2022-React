import { useState } from "react";
import StateList from "./StateList";
import StateInput from "./StateInput";
const StateMain = () => {
  const [viewList, setViewList] = useState([]);

  return (
    <>
      <StateInput setViewList={setViewList} viewList={viewList} />
      <StateList viewList={viewList} />
    </>
  );
};
export default StateMain;
