import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import "./App.css";
import logo from "./logo.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

const App = () => {
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
          <Button color="inherit">Sign in</Button>
          <Button color="inherit">Sign up</Button>
        </Toolbar>
      </AppBar>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </div>
  );
};

export default App;
