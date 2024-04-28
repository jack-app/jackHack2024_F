import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const Hiranan = () => {
  return (
    <>
      <h1>
        もとみつ
      </h1>
      <Button
        component={Link}
        to={"/chahan"}>
        kouki
      </Button>
    </>
  );
};

export default Hiranan;