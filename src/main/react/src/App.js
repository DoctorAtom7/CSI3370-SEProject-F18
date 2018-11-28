import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'
import CreateAccount from './components/CreateAccount'
import Login from './components/Login'
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Snack from './components/Snack'
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import MemberPage from './components/MemberPage'
import { memberList } from './components/SideLists'
import Drawer from '@material-ui/core/Drawer';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import PostEditor from './components/PostEditor';
import HomePage from './components/HomePage'
import Thread from './components/Thread'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
  },
  appBar: {
    display: 'flex',
    zIndex: theme.zIndex.drawer + 1,
    justifyContent: 'space-between',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainContent: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  mainContentShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
});


class App extends Component {

  state = {
    logged_in: false,
    theme: 'light',
    modal: 'none',
    loading: true,
    snack_shown: true,
    open_drawer: false,
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
    const { modal, snack_message, snack_shown, open_drawer } = this.state
    return (
      <BrowserRouter>
        <div className={classes.root}>
          <AppBar position="static" className={classNames(classes.appBar, {
            [classes.appBarShift]: open_drawer,
          })}
          >
            <Toolbar className={classes.toolbar}>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                <IconButton className={classes.menuButton} onClick={() => { this.setState({ open_drawer: true }) }} color="inherit" aria-label="Open drawer">
                  <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                  FreeReign
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
                {localStorage.getItem('forum-token') === null &&
                  <Fragment>
                    <Button style={{ marginRight: '20px', color: 'white' }} variant="outlined" onClick={() => this.setState({ modal: 'login' })} component={Link} to="/login">Login</Button>
                    <Button variant="contained" color="secondary" onClick={() => this.setState({ modal: 'create' })} >Sign Up</Button>
                  </Fragment>
                }
                {localStorage.getItem('forum-token') !== null &&
                  <Button variant="contained" color="secondary" onClick={() => { localStorage.clear(); window.location.reload() }} >Logout</Button>
                }
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <div className={classNames(classes.mainContent, {
            [classes.mainContentShift]: open_drawer,
          })}>
            <Route exact path="/" render={(props) => <HomePage {...props} />} />
            <Route exact path="/createPost" render={(props) => <PostEditor type='create' {...props} />} />
            <Route path="/user/:username" render={(props) => <MemberPage {...props} />} />
            <Route path="/login" render={(props) => <Login {...props} open={modal === "login"} onClose={this.modalClose} showSnack={this.changeSnack} />} />
            <Route path="/post/:id" render={(props) => <Thread {...props} />} />
            <CreateAccount open={modal === 'create'} onClose={this.modalClose} showSnack={this.changeSnack} />
          </div>
          <Drawer
            variant="persistent"
            className={classes.drawer}
            open={open_drawer}
            onClose={() => { this.setState({ open_drawer: false }) }}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={() => { this.setState({ open_drawer: false }) }}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            {memberList}
          </Drawer>
          {Snack(snack_shown, snack_message,
            "OK", () => this.handleClose("snack_shown"))}
          {localStorage.getItem('forum-token') !== null && <Button variant="fab" component={Link} to="/createPost" className={classes.fab} color="secondary">
            <AddIcon/>
          </Button>}
        </div>
      </BrowserRouter>
    );
  }
}


export default withStyles(styles)(App);
