import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const Hiranan = () => {
  return (
    <>
      <h1>
        ひらなん
      </h1>
      <Button
        component={Link}
        to={"/"}>
        homeへ
      </Button>
    </>
  );
};

export default Hiranan;