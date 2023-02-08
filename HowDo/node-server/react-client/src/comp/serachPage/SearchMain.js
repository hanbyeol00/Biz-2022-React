import React, { lazy } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useLoaderData, Await } from "react-router-dom";
import { useAutoSearchContext } from "../../context/AutoSearchProvider";
import {
  wrapperDiv,
  nameSpan,
  videoNohover,
  searchItemwrap,
} from "../../nav/classNames/ClassNames";
import Loading from "../Video/Loading";

// search 페이지 진입시 사용하는 데이터 fetch
export const SearchLoader = async ({ params }) => {
  const currentSearch = params.query;
  const res = await fetch(`/mypage/total/${currentSearch}`);
  const SearchR = await res.json();
  return SearchR;
};

const SearchMain = () => {
  const SearchItem = lazy(() => import("./SearchItem.js"));
  const SearchR = useLoaderData();
  // 서칭된 아이템 클릭으로 유저 상세 페이지 진입하도록 하는 함수

  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <Await resolve={SearchR}>{<SearchItem />}</Await>
      </React.Suspense>
    </>
  );
};

export default SearchMain;
