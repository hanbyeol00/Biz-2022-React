import MainpageBbs from "./MainPageBbs";
import MainpageContent from "./MainPageContent";
import MainContentRow from "./MainContentRow";
const MainPage = () => {
  return (
    <div className="relative ml-52">
      <MainpageBbs />
      <MainpageContent />
      <MainContentRow />
    </div>
  );
};

export default MainPage;
