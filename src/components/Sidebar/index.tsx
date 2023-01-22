import { FC, useState } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { Link, Outlet } from "react-router-dom";

import {
  Divider,
  Box,
  List,
  CssBaseline,
  Typography,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";

const drawerWidth = 270;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
}));

const Sidebar: FC = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <List>
          <Box
            onClick={handleDrawerToggle}
            sx={{
              cursor: "pointer",
              color: "black",
              paddingLeft: "13px",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <ListItem disablePadding>
                <IconButton
                  sx={{
                    height: 50,
                    mr: "15px",
                    color: "black",
                    pl: open ? "7px" : 0,
                  }}
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
                <ListItemText
                  primary={
                    <Typography style={{ fontWeight: "bold" }}>
                      Task manager
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItem>
            </Link>
          </Box>
          <Divider />
          {[
            {
              name: "Tasks",
              icon: <TaskOutlinedIcon fontSize="large" />,
              url: "task-management",
            },
            {
              name: "Users",
              icon: <PermIdentityIcon fontSize="large" />,
              url: "user-management",
            },
          ].map((text, index) => (
            <Link
              key={index}
              to={text.url}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Box>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 50,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "black",
                      }}
                    >
                      {text.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={text.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Box>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default Sidebar;
