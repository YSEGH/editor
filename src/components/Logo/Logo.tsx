import { Typography } from "@mui/material";
import React from "react";

type Props = {};

const Logo: React.FC = (props: Props) => {
  return (
    <Typography variant="h6" component="div" sx={{ color: "#000" }}>
      MUI
    </Typography>
  );
};

export default Logo;
