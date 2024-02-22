import { Button } from "@mui/material";
import React from "react";

type Props = {};

const buttonStyle: React.CSSProperties = {
  color: "#000",
};

const SignupButton = ({}: Props) => {
  return (
    <Button variant="text" sx={{ color: "#000" }}>
      M'inscrire
    </Button>
  );
};

export default SignupButton;
