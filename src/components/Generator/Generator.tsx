import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import History from "./components/History/History";
import ImgSkeleton from "./components/ImgSkeleton/ImgSkeleton";
import Parameters from "./components/Parameters/Parameters";

type Props = {};

const Generator: React.FC = ({}: Props) => {
  return (
    <Grid
      container
      display={"flex"}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      padding={0}
    >
      <Grid
        container
        item
        md={2}
        sm={12}
        display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <History />
      </Grid>

      <Grid
        container
        item
        md={7}
        sm={12}
        xs={12}
        paddingX={{ md: 1, sm: 0, xs: 0 }}
      >
        <Grid
          container
          alignItems={"center"}
          justifyContent={"flex-start"}
          md={12}
          sm={12}
          xs={12}
          padding={{ md: 0, sm: 0, xs: 0 }}
          display={{ md: "flex", sm: "none", xs: "none" }}
        >
          <Grid item md={10}>
            <TextField
              id="outlined-multiline-static"
              multiline
              placeholder="Un astronaute jouant aux échecs sur Mars."
              defaultValue=""
              required
              size="medium"
              InputProps={{
                sx: {
                  borderRadius: 4,
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                  "& > fieldset": {
                    border: "none",
                  },
                },
              }}
              sx={{
                borderColor: "red",
              }}
              fullWidth
            />
          </Grid>
          <Grid item md={2} paddingLeft={1} height={1}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                color: "#fff",
                backgroundColor: "#000",
                height: 1,
                borderRadius: 4,
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              }}
              disableElevation
            >
              Générer
            </Button>
          </Grid>
        </Grid>
        <Grid container md={12} sm={12} xs={12} marginTop={2}>
          {itemData.map((item, i) => {
            return (
              <Grid item md={6} sm={6} xs={12}>
                <Box
                  padding={1}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <ImgSkeleton height={250} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <Grid
        container
        item
        md={3}
        sm={12}
        xs={12}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Parameters />
      </Grid>
    </Grid>
  );
};

export default Generator;

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
];
