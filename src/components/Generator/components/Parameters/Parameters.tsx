import { Box, Grid } from "@mui/material";
import React from "react";
import StyleField from "./components/StyleField";
import SizeField from "./components/SizeField";
import NumberField from "./components/NumberField";
import NegativeField from "./components/NegativeField";

type Props = {};

const Parameters: React.FC = ({}: Props) => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box width={1} paddingX={1}>
      <Grid
        item
        sx={{
          padding: "8px",
          border: "4px solid",
          borderRadius: 4,
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <Box
          width={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-start"}
          gap={2}
        >
          <StyleField handleChange={handleChange} expanded={expanded} />
          <SizeField handleChange={handleChange} expanded={expanded} />
          <NumberField />
          <NegativeField />
        </Box>
      </Grid>
    </Box>
  );
};

export default Parameters;
