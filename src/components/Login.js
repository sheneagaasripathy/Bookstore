import React, { Component } from "react";
import Form from "react-validation/build/form";
import { Button } from "@material-ui/core";

import { Card, CardContent, Typography, CardActionArea, Grid, FormControl, CircularProgress } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";

import AuthService from "../services/auth.service";

const style = {
  root: {
    minWidth: 275,
    backgroundColor:'#fafafa',
    margin: 20,
    color: '#e0f7fa'
  },

}


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    AuthService.login(this.state.username, this.state.password)
      .then(() => {
        this.props.history.push("/profile");
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          loading: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    // return (
    //   <Grid container spacing={3}>
    //     <Grid item xs={5}/>
    //     <Grid item xs={2}>
    //       <Card style={style.root}>
    //         <CardActionArea>
    //           <CardContent>
    //             <Form onSubmit={this.handleLogin}>
    //               <Grid container spacing={1}>
    //                   <Grid item xs={12} alignItems='center'>
    //                     <Face style={{ fontSize: 80 }}/>
    //                   </Grid>
    //                   <Grid item xs={12}>
    //                     <FormControl>
    //                       <label htmlFor="username">Username</label>
    //                       <Input type="text" name="username" value={this.state.username}
    //                         onChange={this.onChangeUsername}/>
    //                     </FormControl>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    //                   </Grid>
    //                   <Grid item xs={12}>
    //                   <FormControl>
    //                       <label htmlFor="password">Password</label>
    //                       <Input type="password" name="password" value={this.state.password}
    //                         onChange={this.onChangePassword}/>
    //                     </FormControl>
    //                   </Grid>
    //                   <Grid item xs={12}>
    //                     <FormControl marginTop='20'>
    //                       <button disabled={this.state.loading}>
    //                         {this.state.loading && (
    //                           <CircularProgress size='10'/>
    //                         )}
    //                         <span>Login</span>
    //                       </button>
    //                     </FormControl>
    //                   </Grid>
    //               </Grid>
    //               {this.state.message && (
    //                 <div>
    //                   <Typography color='error' variant="overline" display="block" gutterBottom>
    //                       <strong>{this.state.message}</strong>
    //                   </Typography>
    //                 </div>
    //               )}
    //             </Form>
    //           </CardContent>
    //         </CardActionArea>
    //     </Card>
    //     </Grid>
    //     <Grid item xs={5}/>
    //   </Grid>
    // );

    return (
      <Grid container>
        <Grid item xs={4}/>
        <Grid item xs={4} style={{backgroundColor:"#212121", margin:"20px"}}>
        <paper>
          <Card style={style.root}>
              <CardContent>
                <Form onSubmit={this.handleLogin}>
                  <Grid container spacing={1}>
                  <Typography variant="h4" component="p" color="primary">
                    <b>Login to Books Shop</b>
                  </Typography>
                  <br/>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <TextField
                            required
                            id="username"
                            type="text"
                            label="username"
                            name="username"
                            defaultValue="Default Value"
                            helperText="Plese enter username"
                            variant="outlined"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            helperText="Plese enter password"
                            variant="outlined"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <Grid item xs={12}>
                        <br/>
                         <FormControl marginTop='20'>
                           {/* <button disabled={this.state.loading}>
                             {this.state.loading && (
                              <CircularProgress size='5'/>
                            )} */}
                            <Button type="submit" variant="contained" color="primary">Log In</Button>
                          {/* </button> */}
                        </FormControl>
                      </Grid>
                      </Grid>
                  </Grid>
                  {this.state.message && (
                    <div>
                      <Typography color='error' variant="overline" display="block" gutterBottom>
                          <strong>{this.state.message}</strong>
                      </Typography>
                    </div>
                  )}
                </Form>
              </CardContent>
        </Card>
        </paper>
        </Grid>
        <Grid item xs={4}/>
      </Grid>
    );
  }
}
