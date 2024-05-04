import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const Home = () => {
  return (
    <>
      <Button
        component={Link}
        to={"/stage"}>
        stageへ
      </Button>
    </>
  );
};

export default Home;