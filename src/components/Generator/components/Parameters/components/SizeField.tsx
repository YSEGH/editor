import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CropLandscapeIcon from "@mui/icons-material/CropLandscape";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import CropSquareIcon from "@mui/icons-material/CropSquare";

type Props = {
  handleChange: Function;
  expanded: string | false;
};

const SizeField: React.FC<Props> = ({ handleChange, expanded }: Props) => {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    return () => {};
  }, [expanded]);

  return (
    <Box
      width={1}
      sx={{
        overflow: "hidden",
        border: 0,
        borderRadius: 4,
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
      }}
    >
      <Accordion
        sx={{ width: 1 }}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }} textAlign={"left"}>
            Taille
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, maxHeight: 200, overflow: "auto" }}>
          <Grid container item md={12}>
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                paddingY: 0,
              }}
            >
              {sizes.map((value, i) => {
                const labelId = `checkbox-list-label-${value.title}`;

                return (
                  <ListItem key={value.title} sx={{ padding: 0 }}>
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(i)}
                      dense
                      sx={{
                        padding: "8px 8px 8px 16px",
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          width: 30,
                        }}
                      >
                        {value.icon}
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={value.title} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SizeField;

const sizes = [
  { title: "Carré (1:1)", icon: <CropSquareIcon /> },
  { title: "Portrait (2:3)", icon: <CropPortraitIcon /> },
  { title: "Paysage (3:2)", icon: <CropLandscapeIcon /> },
];
