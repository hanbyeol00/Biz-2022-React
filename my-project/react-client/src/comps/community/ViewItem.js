import { Link } from "react-router-dom";
import { useCommunityContext } from "../../Context/CommunityContext";
import { useNavigate } from "react-router-dom";

const ViewItem = ({ item }) => {
  const { detail, setDetail, setLoading, loading } = useCommunityContext();

  const nav = useNavigate();

  return (
    <tr data-id={item.seq}>
      <td>{item.seq}</td>
      <td>{item.b_category}</td>
      <td>{item.b_title}</td>
      <td>{item.nickname}</td>
      <td>{item.b_create_date}</td>
      <td>{item.b_views}</td>
    </tr>
  );
};
export default ViewItem;
