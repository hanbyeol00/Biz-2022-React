import { useCallback } from "react";

import { useMapContext } from "../../Context/MapContext";

const MapItem = ({ item }) => {
  const { selectMap } = useMapContext();
  const mapOnClickHandler = useCallback((e) => {
    const target = e.target;
    if (target.className === "downItem") {
      const parent = target.closest("DIV.mapItem");
      const id = parent.dataset.id;
      selectMap(id);
    }
  });

  return (
    <div className="mapItem" onClick={mapOnClickHandler} data-id={item.a_id}>
      <div className="downItem">병원이름 : {item.a_name}</div>
      <div className="downItem">병원주소 : {item.a_add}</div>
      <div className="downItem">전화번호 : {item.a_tel}</div>
    </div>
  );
};
export default MapItem;
