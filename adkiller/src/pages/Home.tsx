import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Home = () => {

  const link = (
    meSi: number,
    meSp: number,
    obSi: number,
    obSp: number,
    obRa: number,
    adInterval: number,
    time: number,
    arrow: number,
    type: string

  ): URLSearchParams => {

    const queryParams = new URLSearchParams();
    queryParams.append('meSize', String(meSi)); // 50
    queryParams.append("meSpeed", String(meSp)); // 15
    queryParams.append('obSize', String(obSi)); // 50
    queryParams.append("obSpeed", String(obSp)); // 5
    queryParams.append("obRate", String(obRa)); // 100
    queryParams.append("adInterval", String(adInterval)); // 1000
    queryParams.append("time", String(time)); // 100
    queryParams.append("arrow", String(arrow)); // 1でarrow有り
    queryParams.append("type", type);
    return queryParams;
  }
  return (
    <div
      style={{
        backgroundImage: `${process.env.PUBLIC_URL}/home.png`,
        width: "100%", // 幅を100%に設定
        display: "flex",
        justifyContent: "center", // 水平方向の中央寄せ
        alignItems: "center", // 垂直方向の中央寄せ
        flexDirection: "column", // 子要素を縦に配置
      }}
    >
      <Typography color="white" variant="h2" align="center" sx={{ textAlign: "center" }}> {/* textAlign: "center" を追加 */}
        ADKILLER
      </Typography>
      <div style={{ height: "100px" }} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}> {/* 各ボタン間の間隔を設定 */}
        <Button
          variant="contained" // ボタンの見た目を変更
          component={Link}
          to={`/stage?${link(50, 15, 50, 5, 100, 100, 100, 0, "ad").toString()}`}
          sx={{ fontSize: "2rem", backgroundColor: "red", color: "white", textAlign: "center" }} // 赤色に設定
        >
          ノーマルモード
        </Button>

        <Button
          variant="contained" // ボタンの見た目を変更
          component={Link}
          to={`/stage?${link(50, 15, 50, 5, 100, 100, 100, 0, "jack").toString()}`}
          sx={{ fontSize: "2rem", backgroundColor: "red", color: "white", textAlign: "center" }} // 赤色に設定
        >
          危機感モード
        </Button>
        <Button
          variant="contained" // ボタンの見た目を変更
          component={Link}
          to={`/stage?${link(50, 15, 50, 5, 100, 100, 100, 0, "kikikan").toString()}`}
          sx={{ fontSize: "2rem", backgroundColor: "red", color: "white", textAlign: "center" }} // 赤色に設定
        >
          カオスモード
        </Button>
        <div style={{ height: "20px" }} />
        <Typography color="white" sx={{ fontSize: "1.3rem", color: "white", textAlign: "center" }}>
          ルール説明<br />
          画面の左半分をクリックで左に移動<br />
          画面の右半分をクリックで右に移動
        </Typography>
      </div>
      {/* <Button
        component={Link}
        to={`/stage?${link(50, 15, 50, 5, 1000, 1000, 100, 0, "ad").toString()}`}>
        Ad
      </Button>
      <Button
        component={Link}
        to={`/stage?${link(50, 15, 50, 5, 100, 1000, 100, 0, "jack").toString()}`}>
        jack
      </Button>
      <Button
        component={Link}
        to={`/stage?${link(50, 15, 50, 5, 100, 1000, 100, 0, "kikikan").toString()}`}>
        危機感
      </Button> */}
    </div>
  );
};

export default Home;