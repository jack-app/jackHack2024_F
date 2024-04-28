import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const Home = () => {
  return (
    <>
      <h1>
        タイトル
      </h1>
      <Button
        component={Link}
        to={"/stage"}>
        stageへ
      </Button>
      <Button
        component={Link}
        to={"/chahan"}>
        チャーハン
      </Button>
      <Button
        component={Link}
        to={"/hiranan"}>
        ひらなん
      </Button>
    </>
  );
};

export default Home;