import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const Chahan = () => {
  return (
    <>
      <h1>
        チャーハン
      </h1>
      <Button
        component={Link}
        to={"/"}>
        homeへ
      </Button>
    </>
  );
};

export default Chahan;