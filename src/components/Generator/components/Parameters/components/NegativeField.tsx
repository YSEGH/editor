import { Box, TextField, Typography } from "@mui/material";
import React from "react";

type Props = {};

const NegativeField: React.FC = ({}: Props) => {
  return (
    <Box
      width={1}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      gap={0.5}
    >
      <Typography sx={{ color: "#000" }} textAlign={"left"}>
        À exclure
      </Typography>
      <TextField
        id="outlined-multiline-static"
        multiline
        placeholder="Pas de casque spatial."
        defaultValue=""
        fullWidth
        InputProps={{
          sx: {
            borderRadius: 4,
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            "& > fieldset": {
              borderColor: "transparent",
            },
          },
        }}
        minRows={2}
        maxRows={6}
        sx={{
          borderColor: "red",
        }}
      />
    </Box>
  );
};

export default NegativeField;
