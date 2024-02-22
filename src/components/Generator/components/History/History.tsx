import { Box, Grid } from "@mui/material";
import React from "react";
import ImgSkeleton from "../ImgSkeleton/ImgSkeleton";

type Props = {};

const History: React.FC = ({}: Props) => {
  return (
    <Box width={1} paddingX={1}>
      <Grid
        container
        height={600}
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"center"}
        sx={{
          overflow: "auto",

          border: "4px solid",
          borderRadius: 4,
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        {itemData.map((item) => (
          <Grid item key={item.img} md={6} sm={6} xs={12}>
            <Box width={1} padding={0.5}>
              <img
                style={{
                  width: "100%",
                  height: 75,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
                srcSet={`${item.img}?w=450&h=450&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=450&h=450&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </Box>
          </Grid>
        ))}
        {[1, 2, 3, 4].map((i) => (
          <Grid item key={i} md={6} sm={6} xs={12}>
            <Box width={1} padding={0.5}>
              <ImgSkeleton height={75} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default History;

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
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];
