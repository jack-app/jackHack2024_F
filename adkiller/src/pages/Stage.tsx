import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Generator from "../components/Ads/Generator";
import Ad from "../components/Ads/Ad";
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

      <Generator />
      <Ad
        strImg="/neko.png"
        strLink="https://flobal.jp/160.html"
        numCloseX={100}
        numCloseY={100}
        strClass="hiranan-chaos"
      />
       <Ad
        strImg={`${process.env.PUBLIC_URL}/neko.png`}
        strLink="https://flobal.jp/160.html"
        numCloseX={100}
        numCloseY={100}
        strClass="hiranan-dokidoki"
      />
       <Ad
        strImg={`${process.env.PUBLIC_URL}/neko.png`}
        strLink="https://flobal.jp/160.html"
        numCloseX={100}
        numCloseY={100}
        strClass="test"
      />
       <Ad
        strImg={`${process.env.PUBLIC_URL}/neko.png`}
        strLink="https://flobal.jp/160.html"
        numCloseX={100}
        numCloseY={100}
        strClass="chahan-circle"
      />
       <Ad
        strImg={`${process.env.PUBLIC_URL}/neko.png`}
        strLink="https://flobal.jp/160.html"
        numCloseX={100}
        numCloseY={100}
        strClass="fade"
      />
       <Ad
        strImg={`${process.env.PUBLIC_URL}/neko.png`}
        strLink="https://flobal.jp/160.html"
        numCloseX={100}
        numCloseY={100}
        strClass="A"
      />
    </>
  );
};

export default Stage;