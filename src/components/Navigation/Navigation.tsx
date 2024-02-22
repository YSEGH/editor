import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../Logo/Logo";
import SigninButton from "../SigninButton/SigninButton";
import SignupButton from "../SignupButton/SignupButton";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const navItems = ["Image generator", "Shop", "About", "Contact"];
const Navigation: React.FC = ({ window }: Props) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
      <AppBar component="nav" elevation={0}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            background: "#fff",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid
              item
              xs={2}
              sm={2}
              md={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Logo />
            </Grid>
            <Grid
              item
              md={6}
              sx={{
                display: { xs: "none", sm: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#000" }}>
                  {item}
                </Button>
              ))}
            </Grid>
            <Grid
              item
              md={3}
              sx={{
                display: { xs: "none", sm: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <SignupButton />
              <SigninButton />
            </Grid>

            <Grid
              item
              xs={2}
              sm={2}
              sx={{
                display: { xs: "flex", sm: "flex", md: "none" },
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon sx={{ fill: "#000" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

const drawer = (
  <Box onClick={() => console.log("test")} sx={{ textAlign: "center" }}>
    <Typography variant="h6" sx={{ my: 2 }}>
      MUI
    </Typography>
    <Divider />
    <List>
      {navItems.map((item) => (
        <ListItem key={item} disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary={item} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default Navigation;
