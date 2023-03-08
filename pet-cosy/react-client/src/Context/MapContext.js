import { useContext, createContext, useState, useEffect } from "react";
import proj4 from "proj4";

const { kakao } = window;

const MapContext = createContext();

const useMapContext = () => {
  return useContext(MapContext);
};

const MapContextProvider = ({ children }) => {
  const [mapList, setMapList] = useState([]);
  const [xyData, setXYData] = useState([]);
  const [hospitalList, sethospitalList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState();
  const [value, setValue] = useState("서울");

  useEffect(() => {
    const makeMap = async () => {
      const container = document.getElementById("map");
      const EPSG2097 =
        "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs";
      const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

      const p = proj4(EPSG2097, wgs84, [xyData[0].a_x, xyData[0].a_y]);
      const options = {
        center: new kakao.maps.LatLng(p[1], p[0]),
      }; // 36.559999659417194, 128.7201938188227),

      const kakaoMap = new kakao.maps.Map(container, options);
      let markerPosition = new kakao.maps.LatLng(p[1], p[0]);
      let marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(kakaoMap);
    };
    makeMap();
  }, [xyData]);

  useEffect(() => {
    const selectChange = async () => {
      const fetchOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ add: value, page: page }),
      };
      try {
        const res = await fetch(`/api/list`, fetchOption);
        const result = await res.json();
        setMapList([...result]);
      } catch (err) {}
      try {
        const res = await fetch(`/api/list/length`, fetchOption);
        const result = await res.json();
        setPageLength(result.length);
      } catch (err) {}
    };
    setPage(1);
    selectChange();
  }, [value]);

  useEffect(() => {
    const pageReSeting = async () => {
      const fetchOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ add: value, page: page }),
      };
      try {
        const res = await fetch(`/api/list`, fetchOption);
        const result = await res.json();
        setMapList([...result]);
      } catch (err) {}
    };
    pageReSeting();
  }, [page]);

  const selectMap = async (id) => {
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    };
    try {
      const res = await fetch(`/api/xyData`, fetchOption);
      const result = await res.json();
      setXYData([{ ...result }]);
    } catch (err) {
      console.log(err);
    }
  };

  const props = {
    mapList,
    setMapList,
    hospitalList,
    sethospitalList,
    page,
    setPage,
    pageLength,
    setValue,
    selectMap,
  };
  return <MapContext.Provider value={props}>{children}</MapContext.Provider>;
};
export { MapContextProvider, useMapContext };
