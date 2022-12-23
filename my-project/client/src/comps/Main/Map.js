import React, { useEffect, useState, useCallback } from "react";
import proj4 from "proj4";

const { kakao } = window;

const Map = () => {
  const [xyList, setXYList] = useState([]);
  // const fetchInit = async () => {
  //   const res = await fetch("/api");
  //   if (res.status < 200) throw new Error("GateWay Time out");
  //   const result = await res.json();
  //   Promise.all(console.log("fetch", result));
  //   return setXyList([...result]);
  // }; // , []);

  // console.log("xyList", xyList);

  // const [map, setMap] = useState(null);

  /**
   *  ▪ 서부원점(GRS80)-falseY:60000 : EPSG:5185               // lat: 129 lng: 38
                ▪ +proj=tmerc +lat_0=38 +lon_0=125 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs
       ▪ 중부원점(GRS80)-falseY:60000 : EPSG:5186              // lat: 127 lng: 38
               ▪ +proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs
       ▪ 동부원점(GRS80)-falseY:60000 : EPSG:5187              // lat: 125 lng: 38
               ▪ +proj=tmerc +lat_0=38 +lon_0=129 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs
        ▪ 동해(울릉)원점(GRS80)-falseY:60000 : EPSG:5188    // lat: 131 lng: 38
                ▪ +proj=tmerc +lat_0=38 +lon_0=131 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_def
   */
  useEffect(() => {
    const fetchAll = async () => {
      fetch("/api")
        .then((res) => {
          if (res.status < 200) throw new Error("GateWay Time out");
          return res.json();
        })
        .then((result) => {
          setXYList([...result]);
        })
        .catch((err) => {
          console.log(err);
        });
      /*
    let res, result;
    try {
      res = await fetch("/api");
      if (res.status < 200) {
        return alert("서버 사이드 오류:" + res.status);
      }
    } catch (e) {
      return alert("서버 접속 오류");
    }
    try {
      result = await res.json();
      console.log("result  :  ", result);
      if (result.error) {
        setXYList([]);
        return alert(result.error);
      } else {
        setXYList([...result]);
      }
      console.log("xyList   :  ", xyList);
    } catch (err) {
      console.log(err);
      setXYList([]);
      return alert("setState 오류");
    }
    console.log("fetch    ", xyList);
    */
    };
    fetchAll();
  });

  const makeMap = useCallback(async () => {
    console.log("make");
    const container = document.getElementById("map");
    const EPSG2097 =
      "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs ";
    const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

    if (xyList && xyList.length > 0) {
      console.log("xy", xyList);
      const p = proj4(EPSG2097, wgs84, [
        Number(xyList[0].x),
        Number(xyList[0].y),
      ]);
      // console.log(p);
      const options = {
        center: new kakao.maps.LatLng(p[1], p[0]),
      }; // 36.559999659417194, 128.7201938188227),

      const kakaoMap = new kakao.maps.Map(container, options);
      let markerPosition = new kakao.maps.LatLng(p[1], p[0]);
      let marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(kakaoMap);
    }
  }, [xyList]);

  // useEffect(() => {
  //   (async () => {
  //   })();
  // }, [fetchAll]);

  const onClickHandler = () => {
    const go = async () => {
      // await fetchAll();
      // console.log("fetchAll", xyList);
      await makeMap();
    };
    go();
  }; // , [makeMap]);

  return (
    <div
      style={{
        width: "100%",
        display: "inline-block",
        marginLeft: "5px",
        marginRight: "5px",
      }}
    >
      <div id="map" style={{ width: "50%", height: "520px" }}></div>
      <button onClick={onClickHandler}>지도</button>
    </div>
  );
};
export default Map;
