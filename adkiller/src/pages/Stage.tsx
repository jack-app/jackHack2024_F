import { Link } from "react-router-dom";
import { Button } from "@mui/material";
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
    </>
  );
};

export default Stage;