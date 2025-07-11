import { useNavigate } from "react-router-dom";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <p>TEST</p>

      <button onClick={() => navigate(-1)}>Go back</button>
    </Row>
  );
}

export default Dashboard;
