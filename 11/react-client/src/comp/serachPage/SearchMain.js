import classNames from "classnames";
const SearchMain = () => {
  const wrapperDiv = classNames(
    "mt-6",
    "min-h-64",
    "w-full",
    "flex",
    "flex-col"
  );

  const nameSpan = classNames(
    "place-self-center",
    "border-b-2",
    "border-black"
  );
  const searchNull = <span className="m-auto">검색결과가 없습니다</span>;

  return (
    <div className="flex flex-col ml-40 w-full">
      <div className={wrapperDiv}>
        <span className={nameSpan}>크리에이터 검색 공간입니다</span>
        {searchNull}
      </div>
      <div className={wrapperDiv}>
        <span className={nameSpan}>컨텐츠 검색 공간입니다</span>
      </div>
      <div className={wrapperDiv}>
        <span className={nameSpan}>게시글 검색 공간입니다</span>
      </div>
      <div className={wrapperDiv}>
        <span className={nameSpan}>댓글 검색 공간입니다</span>
      </div>
    </div>
  );
};

export default SearchMain;
