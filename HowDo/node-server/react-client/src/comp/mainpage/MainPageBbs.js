import { Link } from "react-router-dom";
import { useTransferContext } from "../../context/TransferContextProvider";

const Mainpage_bbs = () => {
  const { bbsButton } = useTransferContext();
  console.log("bbs : " + bbsButton);
  return (
    <div className={bbsButton ? "container m-4 ml-12 flex" : "hidden"}>
      <Link to="#" className="rounded-full p-2 m-1.5 bg-black text-white">
        커뮤 주제 1
      </Link>
      <Link to="#" className="rounded-full p-2 m-1.5 bg-black text-white">
        커뮤 주제 2
      </Link>
      <Link to="#" className="rounded-full p-2 m-1.5 bg-black text-white">
        커뮤 주제 3
      </Link>
      <Link to="#" className="rounded-full p-2 m-1.5 bg-black text-white">
        커뮤 주제 4
      </Link>
      <Link to="#" className="rounded-full p-2 m-1.5 bg-black text-white">
        커뮤 주제 5
      </Link>
      <Link to="#" className="rounded-full p-2 m-1.5 bg-black text-white">
        커뮤 주제 6
      </Link>
    </div>
  );
};

export default Mainpage_bbs;
