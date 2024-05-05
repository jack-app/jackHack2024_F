import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";



const Home = () => {

  const link = (
    meSi: number,
    meSp: number,
    obSi: number,
    obSp: number,
    obRa: number,
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
    queryParams.append("time", String(time)); // 100
    queryParams.append("arrow", String(arrow)); // 1でarrow有り
    queryParams.append("type", type);
    return queryParams;
  }
  return (
    <>
      <div
        style={{
          backgroundImage: `${process.env.PUBLIC_URL}/home.png`,
          width: window.innerWidth
        }}
      >
        <h1>THIS KOUKOKU</h1>
        <h1>NANNKA HENN</h1>
        {/* <Button component={Link} to={"/stage"}>
          GAME START
        </Button> */}
      </div>
      {/* <Button
        component={Link}
        to={`/stage?${link(50, 15, 50, 5, 100, 100, 0, "normal").toString()}`}>
        Normal
      </Button> */}
      <Button
        component={Link}
        to={`/stage?${link(50, 15, 50, 5, 100, 100, 0, "ad").toString()}`}>
        Ad
      </Button>
      <Button
        component={Link}
        to={`/stage?${link(50, 15, 50, 5, 100, 100, 0, "jack").toString()}`}>
        jack
      </Button>
      <Button
        component={Link}
        to={`/stage?${link(50, 15, 50, 5, 100, 100, 0, "kikikan").toString()}`}>
        危機感
      </Button>
    </>
  );
};

export default Home;