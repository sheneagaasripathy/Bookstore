import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Paper, Typography, AppBar, Toolbar, Button, IconButton } from "@material-ui/core";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import { AccountCircle } from "@material-ui/icons";
import Footer from "./components/Footer";
import ViewBook from "./components/ViewBook";
import EditBook from "./components/EditBook";
import AdminAddPage from "./components/AdminAddPage";
import ViewUser from "./components/ViewUser";
import AddUsers from "./components/AddUsers";
import EditUser from "./components/EditUser";

const style = {
  paper: {
    flexGrow: 1,
    backgroundColor: '#212121',
    color: '#c5cae9'
  },
  menuButton: {
    spacing: 2,
  },
  link: {
    underline: 'none'
  },
  appBar: {
    backgroundColor: "#212121"
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      value: 0
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
        <div>
          <AppBar position="static" style={style.appBar}>
            <Toolbar>
              <Paper style={style.paper} elevation={0}>
                <IconButton edge="start" style={style.menuButton} color="inherit" aria-label="menu">
                  <MenuBookIcon />
                </IconButton>
                <Button href="/" color='inherit'>
                  <Typography><strong><h3>Books Shop</h3></strong></Typography>
                </Button>
                <Button href="/home" color='inherit'>
                  <strong>Home</strong>
                </Button>
                {showModeratorBoard && (
                  <Button href="/mod" color='inherit'>
                    <strong>Moderator Board</strong>
                  </Button>
                )}
                
                {showAdminBoard && (
                  <Button href="/admin" color='inherit'>
                    <strong>Admin Board</strong>
                  </Button>
                )}
                {currentUser && (
                  <Button href="/addbook" color='inherit'>
                    <strong>ADD BOOK</strong>
                  </Button>
                )
                }
                {currentUser && (
                  <Button href="/viewbook" color='inherit'>
                    <strong>BOOK LIST</strong>
                  </Button>
                )
                }
              </Paper>
              
              {currentUser ? (
                <Paper style={{'backgroundColor': '#212121', 'color': '#c5cae9'}} elevation={0}>
                  <Button href="/profile" color='inherit'>
                    <AccountCircle style={{ fontSize: 40 }}/>
                    <strong>{currentUser.username}</strong>
                  </Button>
                  <Button href="/login" color='inherit' onClick={this.logOut}>
                    <strong>LogOut</strong>
                  </Button>
                </Paper>
              ) : (
                <Paper style={{'backgroundColor': '#212121', 'color': '#c5cae9'}} elevation={0}>
                  <Button href="/login" color='inherit'>
                    <strong>Login</strong>
                  </Button>
                  <Button href="/register" color='inherit'>
                    <strong>Sign Up</strong>
                  </Button>
                </Paper>
              )}
            </Toolbar>
          </AppBar>

          <div>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/addbook" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/viewbook" component={ViewBook} />
              <Route path="/editbook/:id" component={EditBook} />
              <Route path="/addbooks" component={AdminAddPage} />
              <Route path="/viewuser" component={ViewUser}/>
              <Route exact path="/adduser" component={AddUsers}/>
              <Route exact path="/edituser/:id" component={EditUser}/>
            </Switch>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;