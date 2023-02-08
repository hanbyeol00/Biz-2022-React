import { useTransferContext } from "../../context/TransferContextProvider";
import { button } from "../../nav/classNames/ClassNames";
import { useVideoContentContext } from "../../context/VideoContentContextProvide";
import { useNavigate } from "react-router-dom";

const MainButton = () => {
  const navigate = useNavigate();
  const context = useTransferContext();
  const { setVideoItemList } = useVideoContentContext();

  const item = async () => {
    const res = await fetch("/video/main");
    const result = await res.json();
    let tempArray = [...result];
    tempArray.sort(() => Math.random() - 0.5);
    setVideoItemList([...tempArray]);
  };

  const bbsOpen = () => {
    navigate("/");
    if (context.contentButton) context.setContentButton(false);
    if (!context.contentButton) context.setBbsButton(true);
    else context.setBbsButton(!context.bbsButton);

    // console.log(context.bbsButton);
  };
  const contentOpen = async () => {
    navigate("/");
    await item();
    if (context.bbsButton) context.setBbsButton(false);
    if (!context.bbsButton) context.setContentButton(true);
    else context.setContentButton(!context.contentButton);
  };

  return (
    <div className="flex">
      <div className={button} onClick={bbsOpen}>
        커뮤니티
      </div>
      <div className={button} onClick={contentOpen}>
        영상
      </div>
    </div>
  );
};

export default MainButton;
