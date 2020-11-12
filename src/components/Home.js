import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// import UserService from "../services/user.service";
import Container from "./Container";

const style = {
  root: {
    minWidth: 275,
    backgroundColor: "#212121",
    marginTop: 20,
    height: 200,
    color: "#fafafa"
  },
  root1: {
    minWidth: 267,
    backgroundColor: "#424242",
    margin: 18,
    height: 165,
    color: "#fafafa"
  },
  title: {
    fontSize: 30,
    textAlign: "left"
  }
};

function ComHome() {
  return (
    <>
      <Card style={style.root1} variant="outlined">
        <CardContent>
          <Typography display="block" style={style.title} gutterBottom>
            Welcome to book Shop
          </Typography>
          <Typography variant="h6" gutterBottom align="left">
            Good friends, good books, and a sleepy conscience: this is the ideal life.
          </Typography>
          <Typography variant="caption" display="block" align="left" gutterBottom>
            - Mark Twain
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <ComHome/>
    };
  }

  // componentDidMount() {
  //   UserService.getPublicContent().then(
  //     response => {
  //       this.setState({
  //         content: response.data
  //       });
  //     },
  //     error => {
  //       this.setState({
  //         content:
  //           (error.response && error.response.data) ||
  //           error.message ||
  //           error.toString()
  //       });
  //     }
  //   );
  // }

  render() {
    return (
      <Container content={this.state.content}/>
    );
  }
}
