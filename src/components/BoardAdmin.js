import React,{Component} from 'react';
import { Grid, Card, CardContent, Button, } from '@material-ui/core';
import { purple,grey } from '@material-ui/core/colors';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { FaUsers,FaUserMd,FaPaw,FaClinicMedical,FaUtensils,FaShoppingCart } from "react-icons/fa";
import { FaReadme } from "react-icons/fa";

const theme = createMuiTheme({
    palette: {
      primary: grey,
    },
  });

const style={
    root: {
        backgroundColor:'#8d6e63',
        marginTop: 37,
        align:'center',
        color:'white',
        height:300,
        borderRadius:30,
        marginRight:"1%",
        marginLeft:"1%"
        
      },
      root1: {
        backgroundColor:'#8d6e63',
        marginBottom:30,
        marginTop: 4,
        align:'center',
        color:'white',
        height:300,
        borderRadius:30,
        marginRight:"1%",
        marginLeft:"1%"
        
      },
      root2:{
          backgroundColor:'#212121',
          borderRadius:30,
          marginTop:15,
      },
      icons:{
            width:300,
      },
      root3:{
          textAlign:'center'
      }
    }

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }


  render() {
    return(

      <>
          <Grid container>
          <Grid item xs/>
          <Grid item xs={10}>
              <Card style={{backgroundColor:'#5d4037',marginTop:"1%",textAlign:'center',borderRadius:10, color:"#fafafa"}}>
                  <h1>Admin Panel</h1>
              </Card>
          </Grid>
          <Grid item xs/>
          </Grid>

          <Grid container>
          <Grid item xs/>
          <Grid item xs={10} >
              <Card style={style.root2} >
                  <Grid container spacing={3}>
                  <Grid item xs/>
                  <Grid item xs={3} style={{margin:"20px"}}>
                      <Card style={style.root}>
                      <CardContent >
                          <div style={style.root3}><h3 style={{color:'black'}}>USER</h3></div>
                          <FaUsers size='170' style={style.icons}/>
                          <div>
                              <ThemeProvider theme={theme}>
                                <Button href="/adduser" style={{width:150}} color="primary" variant="contained">Add User</Button>&nbsp;&nbsp;
                                <Button href="/viewuser" style={{width:150}} color="primary" variant="contained">View User</Button>
                              </ThemeProvider>
                          </div>
                      </CardContent>
                      </Card>
                  </Grid>


                  <Grid item xs={3} style={{margin:"20px"}}>
                      <Card style={style.root}>
                      <CardContent>
                          <div style={style.root3}><h3 style={{color:'black'}}>BOOKS</h3></div>
                          <FaReadme size='170' style={style.icons}/>
                          <div>
                              <ThemeProvider theme={theme}>
                              <Button href="/addbooks" style={{width:150}} color="primary" variant="contained">Add Books</Button>&nbsp;&nbsp;
                              <Button href="/viewbook" style={{width:150}} color="primary" variant="contained">View Books</Button>
                              </ThemeProvider>
                          </div>
                      </CardContent>
                      </Card>
                  </Grid>

          <Grid item xs/>
          </Grid>
          </Card>
          </Grid>
          <Grid item xs/>
          </Grid>

      </>
  );
  }
}
