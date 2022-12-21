import React, { useEffect, useState } from "react";
import proj4 from "proj4";
import axios from "axios";

const { kakao } = window;

const Map = () => {
  let num = {
    x: "",
    y: "",
  };
  const [xy, setXY] = useState({
    x: "",
    y: "",
  });
  const callApi = async () => {
    axios.get("/api").then((res) => console.log(res.data));
  };
  useEffect(() => {
    callApi();
  }, []);
  console.log(callApi());

  //   const [map, setMap] = useState(null);

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
    const container = document.getElementById("map");
    const EPSG2097 =
      "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs ";
    const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

    const p = proj4(EPSG2097, wgs84, [354001.850861808, 341561.863718356]);
    // console.log(p);
    const options = {
      center: new kakao.maps.LatLng(p[1], p[0]),
    }; // 36.559999659417194, 128.7201938188227),

    const kakaoMap = new kakao.maps.Map(container, options);
    // setMap(kakaoMap);
    let markerPosition = new kakao.maps.LatLng(p[1], p[0]);
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(kakaoMap);
  }, []);

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
    </div>
  );
};

export default Map;
