import { lazy, Suspense } from "react";
import { useLoaderData, Await, defer } from "react-router-dom";
import Loading from "../Video/Loading";

// search 페이지 진입시 사용하는 데이터 fetch
export const SearchLoader = async ({ params }) => {
  const currentSearch = params.query;
  const res = await fetch(`/mypage/total/${currentSearch}`);
  const SearchR = await res.json();
  console.log(SearchR);
  return defer({ ...SearchR });
};

const SearchMain = () => {
  const SearchItem = lazy(() => import("./SearchItem.js"));
  const SearchR = useLoaderData();
  // 서칭된 아이템 클릭으로 유저 상세 페이지 진입하도록 하는 함수
  console.log(SearchR);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Await
          resolve={SearchR}
          errorElement={
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-yellow">
              에러 발생입니다
            </div>
          }
        >
          {<SearchItem />}
        </Await>
      </Suspense>
    </>
  );
};

export default SearchMain;
