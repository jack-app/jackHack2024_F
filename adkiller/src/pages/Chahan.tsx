import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const Chahan = () => {
  return (
    <>
      <h1>
        天津飯
      </h1>
      <Button
        component={Link}
        to={"/hiranan"}>
        dsia
      </Button>
    </>
  );
};

export default Chahan;