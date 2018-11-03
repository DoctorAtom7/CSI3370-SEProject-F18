import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'
import CreateAccount from './components/CreateAccount'
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Snack from './components/Snack'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
  },
  appbar: {
    justifyContent: 'space-between'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: '50%',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});


class HomePage extends Component {

  state = {
    logged_in: false,
    theme: 'light',
    modal: 'none',
    loading: true,
    snack_shown: true,
    snack_message: 'This site uses cookies to improve your experience'
  }

  handleClose = (name) => {
    this.setState({ [name]: false })
  }

  modalClose = () => {
    this.setState({ modal: 'none' })
  }

  changeSnack = (snack_message) => {
    this.setState({ snack_message, snack_shown: true })
  }

  render() {
    const { classes } = this.props;
    const { modal, snack_message, snack_shown } = this.state
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.appbar}>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Placeholder
            </Typography>

            </div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.sectionDesktop}>
              <Button style={{ marginRight: '20px', color: 'white' }} variant="outlined">Login</Button>
              <Button variant="contained" color="secondary" onClick={() => this.setState({ modal: 'create' })} >Sign Up</Button>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <CreateAccount open={modal === 'create'} onClose={this.modalClose} showSnack={this.changeSnack} />
        {Snack(snack_shown, snack_message,
          "OK", () => this.handleClose("snack_shown"))}
      </div>
    );
  }
}

export default withStyles(styles)(HomePage);
