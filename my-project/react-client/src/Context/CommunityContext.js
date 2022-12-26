import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import ViewItem from "../comps/community/ViewItem";
import { useNavigate } from "react-router-dom";

const CommunityContext = createContext();

const useCommunityContext = () => {
  return useContext(CommunityContext);
};

const CommunityContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [boardList, setBoardList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLength, setPageLength] = useState();
  const [detail, setDetail] = useState({});
  const [select, setSelect] = useState("");
  const [input, setInput] = useState("");

  const nav = useNavigate();

  const boardItemView = boardList.map((item) => {
    return <ViewItem item={item} key={item.seq} />;
  });

  useEffect(() => {
    const boardItemList = async () => {
      try {
        const res = await fetch(`/board/item/${page}`, { method: "GET" });
        const result = await res.json();
        setBoardList([...result]);
        console.log(page);
      } catch (err) {
        console.log(err);
      }
      try {
        const res = await fetch(`/board`, { method: "GET" });
        const result = await res.json();
        setPageLength(result.length);
      } catch (err) {
        console.log(err);
      }
    };
    boardItemList();
  }, [page]);

  const onTitleHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const onCategoryHandler = (e) => {
    setCategory(e.currentTarget.value);
  };

  const onContentHandler = (e) => {
    setContent(e.currentTarget.value);
  };

  const buttonsubmit = async (id) => {
    setPage(1);
    const body = {
      id: id || null,
      title: title || detail.b_title,
      category: category || detail.b_category,
      content: content || detail.b_content,
      Page: page,
    };
    if (body.title == "") {
      return alert("제목을 입력해주세요");
    }
    if (body.category == "" || category == "카테고리") {
      return alert("카테고리를 정해주세요");
    }
    if (body.content == "") {
      return alert("게시글 내용을 입력해주세요");
    }

    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const res = await fetch(`/board/insert`, fetchOption);
      const result = await res.json();
      setBoardList([...result]);
      nav("/AllCommunity");
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = useCallback(async (id) => {
    try {
      const res = await fetch(`/board/select/${id}`, { method: "GET" });
      const result = await res.json();
      setDetail({ ...result });
      nav("/write");
    } catch (err) {
      console.log(err);
    }
  });

  const deleteItem = useCallback(async (id) => {
    try {
      const res = await fetch(`/board/delete/${id}`, { method: "DELETE" });
      const result = await res.json();
      setBoardList([...result]);
      nav("/AllCommunity");
    } catch (err) {
      console.log(err);
    }
  });

  const onChangeDetailSelect = (e) => {
    setSelect(e.currentTarget.value);
  };

  const onChangeDetailInput = (e) => {
    setInput(e.currentTarget.value);
  };

  const selectBoardDetail = useCallback(async () => {
    setPage(1);
    const body = {
      input: input,
      select: select || "b_title",
      page: page,
    };
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    try {
      const res = await fetch("/board/select", fetchOption);
      const result = await res.json();
      setBoardList([...result]);
    } catch (err) {
      console.log(err);
    }
    try {
      const fetchOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };
      const res = await fetch(`/board/length`, fetchOption);
      const result = await res.json();
      setPageLength(result.length);
      console.log(result.length);
    } catch (err) {
      console.log(err);
    }
  });

  const props = {
    buttonsubmit,
    onContentHandler,
    onCategoryHandler,
    onTitleHandler,
    loading,
    boardList,
    page,
    setPage,
    pageLength,
    detail,
    setDetail,
    setLoading,
    boardItemView,
    deleteItem,
    updateItem,
    onChangeDetailSelect,
    onChangeDetailInput,
    selectBoardDetail,
  };
  return (
    <CommunityContext.Provider value={props}>
      {children}
    </CommunityContext.Provider>
  );
};
export { CommunityContextProvider, useCommunityContext };
