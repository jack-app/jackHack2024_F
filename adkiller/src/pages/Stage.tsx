import Generator from "../components/Ads/Generator";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Game from "../components/KottoGame/kottogame";

const Stage = () => {
  return (
    <>
      <h1>ステージ</h1>

      <Button component={Link} to={"/"}>
        homeへ
      </Button>

      <Game />
    </>
  );
};

export default Stage;
