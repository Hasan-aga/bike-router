import InfoCard from "../infoCard/infoCard.component";
import Search from "../search/search.component";
import "./sidemenu.style.scss";
const Sidemenu = () => {
  return (
    <div className="sidemenu">
      <Search placeholder="Search.." />
      <InfoCard description="info item" title="title" />
      <InfoCard description="info item" />
    </div>
  );
};

export default Sidemenu;
