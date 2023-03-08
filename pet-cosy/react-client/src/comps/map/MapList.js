import { useMapContext } from "../../Context/MapContext";

const MapList = () => {
  const { setValue } = useMapContext();
  const addChange = (e) => {
    setValue();
    setValue(e.target.value);
  };

  return (
    <select
      name="a_add"
      onChange={addChange}
      style={{ width: "30%", padding: "7px" }}
    >
      <option value={"none"}>지역</option>
      <option value={"서울"}>서울</option>
      <option value={"경기도"}>경기도</option>
      <option value={"경상남도"}>경상남도</option>
      <option value={"경상북도"}>경상북도</option>
      <option value={"충청남도"}>충청남도</option>
      <option value={"충청북도"}>충청북도</option>
      <option value={"전라남도"}>전라남도</option>
      <option value={"전라북도"}>전라북도</option>
      <option value={"강원도"}>강원도</option>
      <option value={"광주"}>광주</option>
      <option value={"대구"}>대구</option>
      <option value={"인천"}>인천</option>
      <option value={"부산"}>부산</option>
      <option value={"울산"}>울산</option>
      <option value={"제주"}>제주</option>
    </select>
  );
};
export default MapList;
