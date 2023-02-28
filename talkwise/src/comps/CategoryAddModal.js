import { useState } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const CategoryInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;
const CategoryButton = styled.button`
  background-color: #4caf50;
  width: 100%;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &.edit.category {
    background-color: #4a90e2;
  }
  &:hover {
    background-color: #3e8e41;
  }
  &.edit.category:hover {
    background-color: #0057b8;
  }
`;
const CategoryDataList = styled.div`
  display: flex;
`;
const CheckDiv = styled.div`
  font-size: 20px;
  cursor: pointer;
  &.check {
    color: red;
  }
`;

const CategoryAddModal = ({
  isOpen,
  toggleModal,
  qaData,
  setSelectedCategory,
  categoryEdit,
  setCategoryEdit,
}) => {
  const [categoryInfo, setCategoryInfo] = useState({
    t_seq: [],
    category: "",
  });

  const onChangeHandler = (e) => {
    setCategoryInfo({ ...categoryInfo, category: e.target.value });
  };

  const onCheckHandler = (e) => {
    const clickedDiv = e.currentTarget;

    if (clickedDiv.classList.contains("check")) {
      // 'check' 클래스가 있을 때 클릭하면 해당 클래스를 삭제합니다.
      clickedDiv.classList.remove("check");
    } else {
      // 'check' 클래스가 없을 때 클릭하면 해당 클래스를 추가합니다.
      clickedDiv.classList.add("check");
    }
    const seq = e.target.parentNode.getAttribute("data-seq");
    if (categoryInfo.t_seq.includes(seq)) {
      // 같은 값이 들어온 경우 해당 값 제거
      setCategoryInfo((prevCategoryInfo) => ({
        ...prevCategoryInfo,
        t_seq: prevCategoryInfo.t_seq.filter((item) => item !== seq),
      }));
    } else {
      // 새로운 값인 경우 배열에 추가
      setCategoryInfo((prevCategoryInfo) => ({
        ...prevCategoryInfo,
        t_seq: [...prevCategoryInfo.t_seq, seq],
      }));
    }
  };
  const onEditCheck = (e) => {
    const clickedDiv = e.currentTarget;

    if (clickedDiv.classList.contains("check")) {
      // 'check' 클래스가 있을 때 클릭하면 해당 클래스를 삭제합니다.
      clickedDiv.classList.remove("check");
    } else {
      // 'check' 클래스가 없을 때 클릭하면 해당 클래스를 추가합니다.
      clickedDiv.classList.add("check");
    }
    const seq = e.target.parentNode.getAttribute("data-seq");
    if (categoryEdit.t_seq.includes(Number(seq))) {
      // 같은 값이 들어온 경우 해당 값 제거
      setCategoryEdit((prevCategoryInfo) => ({
        ...prevCategoryInfo,
        t_seq: prevCategoryInfo.t_seq.filter((item) => item !== Number(seq)),
      }));
    } else {
      // 새로운 값인 경우 배열에 추가
      setCategoryEdit((prevCategoryInfo) => ({
        ...prevCategoryInfo,
        t_seq: [...prevCategoryInfo.t_seq, Number(seq)],
      }));
    }
  };
  const filteredData = qaData.filter((item, index, arr) => {
    // 현재 item의 t_seq와 이전 item들의 t_seq를 비교하여 같은 값이 있으면 제거
    const hasDuplicate = arr.slice(0, index).some((prevItem) => {
      return prevItem.t_seq === item.t_seq;
    });
    return !hasDuplicate;
  });

  const onSubmitHandler = () => {
    // categoryInfo의 category 값이 없을 경우 alert 창 띄우기
    if (!categoryInfo.category) {
      alert("카테고리를 입력해주세요.");
      return;
    }
    // categoryInfo의 t_seq 배열에 값이 없을 경우 alert 창 띄우기
    if (categoryInfo.t_seq.length === 0) {
      alert("카테고리에 추가할 질문을 선택해주세요.");
      return;
    }
    // 유효성 검사를 통과한 경우 fetch 함수를 통해 데이터 전송
    fetch("/test/bookmark/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryInfo),
    })
      .then((response) => {
        if (response.ok) {
          // 추가가 성공한 경우 모달 닫기
          toggleModal();
          setSelectedCategory((prevState) => ({
            ...prevState,
            category: categoryInfo.category,
          }));
        } else {
          // 추가가 실패한 경우 에러 처리
          throw new Error("추가에 실패하였습니다.");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const onEditChangeHandler = (e) => {
    setCategoryEdit({ ...categoryEdit, category: e.target.value });
  };
  const onEditSubmitHandler = (e) => {
    if (!categoryEdit.category) {
      alert("카테고리를 입력해주세요.");
      return;
    }
    if (categoryEdit.t_seq.length === 0) {
      alert("카테고리에 수정할 질문을 선택해주세요.");
      return;
    }
    fetch("/test/bookmark/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryEdit),
    })
      .then((response) => {
        if (response.ok) {
          toggleModal();
          setSelectedCategory((prevState) => ({
            ...prevState,
            category: categoryEdit.category,
          }));
          setCategoryEdit({
            prevCategory: "",
            t_seq: [],
            category: "",
          });
        } else {
          throw new Error("수정에 실패하였습니다.");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const onClose = () => {
    toggleModal();
    setCategoryEdit({
      prevCategory: "",
      t_seq: [],
      category: "",
    });
    setCategoryInfo({
      t_seq: [],
      category: "",
    });
  };

  return (
    <div>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <CloseButton onClick={onClose}>X</CloseButton>
            <h2>
              {categoryEdit.prevCategory ? "카테고리 수정" : "카테고리 추가"}
            </h2>
            <CategoryInput
              onChange={
                categoryEdit.prevCategory
                  ? onEditChangeHandler
                  : onChangeHandler
              }
              value={
                categoryEdit.prevCategory
                  ? categoryEdit.category
                  : categoryInfo.category
              }
              placeholder={
                categoryEdit.prevCategory
                  ? "수정할 카테고리명을 입력해주세요"
                  : "추가할 카테고리를 입력해주세요"
              }
            />
            <CategoryButton
              onClick={
                categoryEdit.prevCategory
                  ? onEditSubmitHandler
                  : onSubmitHandler
              }
              className={categoryEdit.prevCategory ? "edit category" : ""}
            >
              {categoryEdit.prevCategory ? "수정" : "추가"}
            </CategoryButton>
            {filteredData.map((qa, index) => {
              return (
                <CategoryDataList key={index} data-seq={qa.t_seq}>
                  <CheckDiv
                    className={
                      categoryEdit.t_seq.includes(qa.t_seq) ? "check" : ""
                    }
                    onClick={
                      categoryEdit.prevCategory ? onEditCheck : onCheckHandler
                    }
                  >
                    &#10004;
                  </CheckDiv>
                  <div className="qa">
                    <h2>질문 : {qa.f_talk_cate.question}</h2>
                  </div>
                </CategoryDataList>
              );
            })}
          </ModalContent>
        </ModalWrapper>
      )}
    </div>
  );
};

export default CategoryAddModal;
