import React,{Component} from "react";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import CardActions from '@material-ui/core/CardActions';
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Box from '@material-ui/core/Box';
import SaveIcon from '@material-ui/icons/Save';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';
import MuiAlert from "@material-ui/lab/Alert";
import CancelIcon from '@material-ui/icons/Cancel';
import { InputLabel, Select, Snackbar } from "@material-ui/core";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import AuthService from '../services/auth.service';



const style = {
  papersty: {
    minWidth: 275,
    backgroundColor:'#212121',
    marginTop: 20,
  },
  cardsty: {
    minWidth: 270,
    backgroundColor:'#fafafa',
    margin: 20
  }
}


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class AddUsers extends Component {
   constructor(props){
     super(props);
     this.state = {
        username: '',
        email:'',
        password:'',
        message:null,
        button:false,
        snackbaropen: false,
        open: false,
        color:null,
        roles:[],
        changeRole:'',
       }

       this.addUser = this.addUser.bind(this);
   }

   addUser = (e) => {
    e.preventDefault();
    console.log("addUser")
    let user = {username:this.state.username,email:this.state.email,password:this.state.password,roles:[this.state.changeRole]};
    console.log(user)
    AuthService.addUser(user)
    .then(res =>{
      this.setState({snackbaropen:true, message:'User added successfully', color:'success'})
      setTimeout(()=> this.addUserAlert(), 3000)
    },
    (error)=>{
      this.setState({snackbaropen:true, message:'failed' , color:'error'})
    });
  }

   handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({snackbaropen:false})
  };
   



  changeRole = (e) =>{
    const changeRole = e.target.value;
    this.setState({changeRole})
    console.log(this.state.changeRole)
  }

  onChange = (e) =>{
  console.log(e.target.value)
  console.log(this.state.roles)
  this.setState({ [e.target.name]: e.target.value });
  }

  addUserAlert =()=>{
    return this.props.history.push('/viewUser');
  }

  load =()=>{
    return (
      window.location.reload()
    )
  }

  render(){

    return(
      <>
      <div>
      <Snackbar open={this.state.snackbaropen} autoHideDuration={1000} onClose={this.handleClose} anchorOrigin={{  vertical: 'top', horizontal: 'right'}}>
        <Alert onClose={this.handleClose} severity={this.state.color}>
          {this.state.message}
        </Alert>
      </Snackbar>
    </div>
    
        <Grid container spacing={3}>
          <Grid item xs={1}/>
          <Grid item xs={10}>
            <ValidatorForm onSubmit={this.addUser} >
            <Grid container>
              <Grid item xs={2}/>
              <Grid item xs={8} style={{backgroundColor:"#212121", margin:"20px"}}>
                <CardContent style={style.cardsty}>
                  <CardActions>
                    <CardContent>
                      <h2>
                      <FontAwesomeIcon icon={faEdit}/>Add User Detail
                      </h2>
                      <br/>
                      <br/>
                      <Grid container spacing={3}>
                  
                        <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextValidator
                            name="username"
                            label="Username"
                            value={this.state.username}
                            onChange={this.onChange}
                            helperText="Enter username"
                            variant="outlined"
                            validators={['required']}
                            errorMessages={['This fieled is required']}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>


                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextValidator
                            name="email"
                            label="User's email"
                            value={this.state.email}
                            onChange={this.onChange}
                            helperText="Enter User's email"
                            variant="outlined"
                            validators={['required']}
                            errorMessages={['This fieled is required']}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <TextValidator
                            name="password"
                            label="User's password"
                            value={this.state.password}
                            onChange={this.onChange}
                            helperText="Enter User's password"
                            variant="outlined"
                            validators={['required']}
                            errorMessages={['This fieled is required']}
                            fullWidth
                          />
                        </FormControl>
                      </Grid>
                        
                      <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-category-native-simple">Role</InputLabel>
                              <Select
                                native
                                name="roles"
                                // value={this.state.roles}
                                onClick={this.changeRole}
                                label="Role"
                                fullWidth
                                >
                                <option value={'user'}>ROLE_USER</option>
                                <option value={'admin'}>ROLE_ADMIN</option>
                              </Select>
                            </FormControl>
                            </Grid>

                      </Grid>
                    </CardContent>
                  </CardActions>
                  <CardActions style={{float: 'right'}}>
                  <FormControl>
                          <Button href="" variant="contained" style={{backgroundColor:"#66bb6a"}} type="submit"
                          startIcon={<SaveIcon />}>
                            <span>Save</span>
                          </Button>
                        </FormControl>
                        <FormControl>
                          <Button href="" variant="contained" color="primary" type="reset" value="Reset"
                          startIcon={<RotateLeftOutlinedIcon />} onClick={this.load}>
                            <span>Reset</span>
                          </Button>
                        </FormControl>
                        <FormControl>
                          <Button href="" variant="contained" color="primary" href="/viewuser"
                          startIcon={<ListAltOutlinedIcon />}>
                            <span>User List</span>
                          </Button>
                       
                        </FormControl>
                        
                    </CardActions>
                    <br/>
                    <br/>
                </CardContent>
              </Grid>
              <Grid item xs={2}/>
            </Grid>
            </ValidatorForm>
          </Grid>
          <Grid item xs={1}/>
        </Grid>
      </>
    )
  }
}