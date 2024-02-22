import React from "react";
import Button from "@mui/material/Button";

type Props = {};

const SigninButton: React.FC = ({}: Props) => {
  return (
    <Button variant="contained" sx={{ backgroundColor: "#000" }}>
      Connexion
    </Button>
  );
};

export default SigninButton;
