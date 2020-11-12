import React, { Component } from "react";
import Form from "react-validation/build/form";
import TextField from "@material-ui/core/TextField";

import { Card, CardContent, CardActionArea, Grid, FormControl, Typography } from '@material-ui/core';
import { Button } from "@material-ui/core";

import AuthService from "../services/auth.service";

const style = {
  bgCardColor: {
    Width: 271,
    backgroundColor: "#fafafa",
    margin: 20,
    height: 510,
    color: "#e0f7fa"
  },
  title: {
    color: "#01579b"
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    AuthService.register(
      this.state.username,
      this.state.email,
      this.state.password
    ).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: "User SignUp failed, TRY AGAIN.."
        });
      }
    );
  }

  render() {
    // return (
    //   <Grid container spacing={3}>
    //     <Grid item xs={3}/>
    //     <Grid item xs={6}>
    //       <Card style={style.root}>
    //         <CardActionArea>
    //           <CardContent>
    //             <Form onSubmit={this.handleRegister}>
    //             <Grid item xs={1}/>
    //               <Grid item xs={10} style={{backgroundColor:"#fafafa"}}>
    //               {!this.state.successful && (
    //               <Grid container spacing={1}>
                    
    //                   <Typography variant="h3" gutterBottom align="left" style={{color:"#01579b"}}>
    //                     <b>Register Account at Books <br/> Shop</b>
    //                   </Typography>
    //                   <Grid item xs={12} sm={6}>
    //                     <FormControl>
    //                       <label htmlFor="username">Username</label>
    //                       <Input type="text" name="username" value={this.state.username}
    //                         onChange={this.onChangeUsername}/>
    //                     </FormControl>
    //                   </Grid>
    //                   <Grid item xs={12}>
    //                     <FormControl>
    //                       <label htmlFor="email">Email</label>
    //                       <Input type="text" name="email" value={this.state.email}
    //                         onChange={this.onChangeEmail}/>
    //                     </FormControl>
    //                   </Grid>
    //                   <Grid item xs={12}>
    //                     <FormControl>
    //                       <label htmlFor="password">Password</label>
    //                       <Input type="password" name="password" value={this.state.password}
    //                         onChange={this.onChangePassword}/>
    //                     </FormControl>
    //                   </Grid>
    //                   <Grid item xs={12}>
    //                     <FormControl>
    //                       <button>Sign Up</button>
    //                     </FormControl>
    //                   </Grid>
                      
    //               </Grid>
                  
    //               )}
    //               {
    //                 this.state.message && (
    //                 <div>
    //                   <Typography color={this.state.successful ? 'primary' : 'error'} variant="overline" display="block" gutterBottom>
    //                       <strong>{this.state.message}</strong>
    //                   </Typography>
    //                 </div>
    //               )
    //               }
    //               </Grid>
    //             <Grid item xs={1}/>
    //             </Form>
    //           </CardContent>
    //         </CardActionArea>
    //     </Card>
    //     </Grid>
    //     <Grid item xs={3}/>
    //   </Grid>
    // );

    return (
      <>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={6} style={{backgroundColor:"#212121", margin:"20px"}}>
            <Card style={style.bgCardColor} variant="outlined">
              <CardContent>
                <Form onSubmit={this.handleRegister}>
                  {!this.state.successful && (
                    <Grid container spacing={1}>
                      <Typography
                        variant="h3"
                        gutterBottom
                        align="left"
                        style={style.title}
                      >
                        <b>Register Account at Books <br/> Shop</b>
                      </Typography>

                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <TextField
                            required
                            id="username"
                            label="username"
                            type="text"
                            name="username"
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
                            id="username"
                            label="Email"
                            type="email"
                            name="email"
                            helperText="Plese enter email"
                            variant="outlined"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
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

                      <br />
                      <br />

                      <Grid item xs={12}>
                         <FormControl>
                         <Button type="submit" variant="contained" color="primary">Sign Up</Button>
                         </FormControl>
                       </Grid>
                    </Grid>
                  )}
                  <br/>
                  {
                     this.state.message && (
                     <div>
                       <Typography color={this.state.successful ? 'primary' : 'error'} variant="overline" display="block" gutterBottom>
                           <strong>{this.state.message}</strong>
                       </Typography>
                     </div>
                   )
                   }
                </Form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </>
    );
  }
}
