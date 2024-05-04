import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Cam } from "../components/Security/Cam";
const Hiranan = () => {
  return (
    <>
      <h1>
        もとみつ
      </h1>
      <Button
        component={Link}
        to={"/"}>
        homeへ
      </Button>
      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1,
      }}>
        aaa
      </div>

      <img
        src={`${process.env.PUBLIC_URL}/logo192.png`}
        alt="Your Image"
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          position: 'fixed',
          top: 300,
          left: 20,
          zIndex: 1,
        }} />

      <Cam />
    </>
  );
};

export default Hiranan;