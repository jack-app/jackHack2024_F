import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import styles from "./Home.module.css";
const Home = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `${process.env.PUBLIC_URL}/BackGroundImage.jpg`,
          height: "500px",
        }}
        className={styles.Wrapper}
      >
        <div className={styles.GameTitleWrapper}>
          <h1 className={styles.GameTitle}>THIS KOUKOKU</h1>
          <h1 className={styles.GameTitle}>NANNKA HENN</h1>
        </div>
        <Button component={Link} to={"/stage"} className={styles.GameStart}>
          GAME START
        </Button>
      </div>
    </>
  );
};

export default Home;
