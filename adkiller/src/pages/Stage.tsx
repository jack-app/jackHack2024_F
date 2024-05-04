import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Generator from "../components/Generator";
import Ad from "../components/Ad";
const Stage = () => {
  return (
    <>
      <h1>
        ステージ
      </h1>

      <Button
        component={Link}
        to={"/"}>
        homeへ
      </Button>

      {/* <Generator/> */}
      <Ad 
      strImg={`${process.env.PUBLIC_URL}/neko.png`}
      strLink="https://flobal.jp/160.html"
      numCloseX={100}
      numCloseY={100}
      // strClass="test dokidoki"
      strClass="move"
      />
      </>
     );
};

export default Stage;