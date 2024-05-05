import Generator from "../components/Ads/Generator";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Game from "../components/KottoGame/kottogame";
import Ad from "../components/Ads/Ad";

const Stage = () => {
  return (
    <>
      {/* ゲーム生成 */}
      <Game />
    </>
  );
};

export default Stage;
