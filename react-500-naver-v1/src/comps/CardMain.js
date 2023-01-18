import "../css/CardMain.css";

/**
 * props.children 을 이용한 컴포넌트 합성
 *
 * 컴포넌트는 컴포넌트를 포함하여 하나의 그룹을 형성한다
 * 예) A 컴포넌트에 B 컴포넌트를 포함하는 형식의 컴포넌트 그룹을 만들면
 * 만약 B 컴포넌트를 다른 컴포넌트로 변경하면서 A 컴포넌트를 사용하려면
 * A 컴포넌트를 복제하여 중복된 코트를 발생시켜야 한다
 *
 * 하지만 A컴포넌트에 props.children 설정 해 두고
 * A 컴포넌트를 사용하는 곳에 다른 컴포넌트를 A 컴포넌트에 끼워넣기 하여
 * 마치 이미 만들어진 컴포넌트처럼 사용하는 방법
 */

const CardMain = (props) => {
  const mainStyle = {
    width: props.width || "80%",
    margin: "20px auto",
    maxHeight: props.maxHeight || "300px",
  };

  return (
    <div className="w3-card-4 Card-main" style={mainStyle}>
      <header className="w3-container w3-center w3-sand w3-padding-24">
        {props.header || <h1>나는 Card</h1>}
      </header>
      <section className="w3-container">{props.children}</section>
      <footer className="w3-container w3-center w3-sand w3-padding-16">
        {props.footer || (
          <address>CopyRight &copy; gksquf6670@gmail.com </address>
        )}
      </footer>
    </div>
  );
};
export default CardMain;
