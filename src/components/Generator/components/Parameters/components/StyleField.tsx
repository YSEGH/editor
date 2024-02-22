import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {
  handleChange: Function;
  expanded: string | false;
};

const StyleField: React.FC<Props> = ({ handleChange, expanded }: Props) => {
  useEffect(() => {
    return () => {};
  }, [expanded]);
  return (
    <Box
      width={1}
      sx={{
        paddingX: 1,
        border: 1,
        borderRadius: 4,
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      }}
    >
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }} textAlign={"left"}>
            Style
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            paddingY: 0,
            paddingX: 1,
            maxHeight: 175,
            overflow: "auto",
          }}
        >
          <Grid container item md={12} paddingBottom={1}>
            {itemData.map((item) => (
              <Grid item md={12} key={item.img} height={100} marginBottom={1}>
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                  loading="lazy"
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default StyleField;

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
];
