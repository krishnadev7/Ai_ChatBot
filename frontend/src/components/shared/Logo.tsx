import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginRight: "auto",
        gap: "8",
      }}
    >
      <Link to={"/"}>
        <img
          src="../../public/robot.jpg"
          alt="robobro logo"
          width={"30px"}
          height={"30px"}
          className="image-converted"
        />
      </Link>
        <Typography
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
            mr: "auto",
            fontWeight: "800",
            textShadow: "2px 2px 20px #000",
          }}
        >
          <span style={{ fontSize: "20px" }}>RoboBro</span>
        </Typography>
    </div>
  );
};
