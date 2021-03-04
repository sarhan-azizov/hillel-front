import { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

import { ROUTES } from "../../configs";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#282c34",
    minHeight: "100vh",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background: "#1c4280",
  },
}));

const Navbar = ({ children }: { children: ReactNode }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Hillel
          </Typography>
          <Button color="inherit" component={RouterLink} to={ROUTES.AUTHORIZATION}>
            SIGN IN
          </Button>
          <Button color="inherit" component={RouterLink} to={ROUTES.REGISTRATION}>
            SIGN UP
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export { Navbar };
