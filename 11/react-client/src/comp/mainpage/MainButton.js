import { useTransferContext } from "../../context/TransferContextProvider";

const MainButton = () => {
  const context = useTransferContext();

  const bbsOpen = () => {
    if (context.contentButton) context.setContentButton(false);
    if (!context.contentButton) context.setBbsButton(true);
    else context.setBbsButton(!context.bbsButton);

    // console.log(context.bbsButton);
  };
  const contentOpen = () => {
    if (context.bbsButton) context.setBbsButton(false);
    if (!context.bbsButton) context.setContentButton(true);
    else context.setContentButton(!context.contentButton);
  };

  return (
    <div className="flex">
      <div
        className="rounded-full p-2 m-1.5 bg-black text-white cursor-pointer"
        onClick={bbsOpen}
      >
        커뮤니티
      </div>
      <div
        className="rounded-full p-2 m-1.5 bg-black text-white cursor-pointer"
        onClick={contentOpen}
      >
        영상
      </div>
    </div>
  );
};

export default MainButton;
