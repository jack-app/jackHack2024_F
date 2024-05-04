import Generator from "../components/Ads/Generator";
import Ad from "../components/Ads/Ad";
const Stage = () => {
  return (
    <>
      {/* ゲーム班 */}

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