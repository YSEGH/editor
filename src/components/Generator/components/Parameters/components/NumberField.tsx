import { Box, Slider, Typography } from "@mui/material";
import React from "react";

type Props = {};

const NumberField: React.FC = ({}: Props) => {
  return (
    <Box width={1}>
      <Typography sx={{ color: "#000" }} textAlign={"left"}>
        Nombre d'image(s)
      </Typography>
      <Slider
        aria-label="Temperature"
        defaultValue={2}
        valueLabelDisplay="auto"
        step={1}
        marks
        sx={{ color: "black" }}
        min={1}
        max={4}
      />
    </Box>
  );
};

export default NumberField;
