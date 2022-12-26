import { useMapContext } from "../../Context/MapContext";
import MapItem from "./MapItem";
import MapList from "./MapList";
import Pagination from "react-js-pagination";
import "../../css/Map.css";

const Map = () => {
  const { pageLength, page, setPage, mapList } = useMapContext();

  const mapListItemView = mapList.map((item) => {
    return <MapItem item={item} key={item.a_id} />;
  });

  const pageChangeHandler = (page) => {
    setPage(page);
  };

  return (
    <div className="mapContainer" style={{ margin: "auto", width: "90%" }}>
      <div className="View">
        <MapList />
        <div>{mapListItemView}</div>
        <div className="pagination">
          <Pagination
            activePage={page}
            itemsCountPerPage={7}
            totalItemsCount={pageLength}
            pageRangeDisplayed={5}
            prevPageText={"<"}
            nextPageText={">"}
            onChange={pageChangeHandler}
          />
        </div>
      </div>
      <div className="map">
        <div id="map" style={{ width: "100%", height: "700px" }}></div>
      </div>
    </div>
  );
};
export default Map;
