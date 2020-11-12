import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import RotateLeftOutlinedIcon from '@material-ui/icons/RotateLeftOutlined';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";
import bookService from "../services/book.service";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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

export default class EditBook extends Component {
    constructor(props){
        super(props);
        this.state ={
           title: '',
           author: '',
           imageUrl: '',
           isbn: '',
           price: '',
           language: '',
           genre:'',
           message: null,
           snackbaropen: false,
           colors:'',
       }
       this.saveBook = this.saveBook.bind(this);
      }

      componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        if(id) {
          this.loadBookUpdate(id);
        }
        // console.log(this.match.props.id)
      }

      loadBookUpdate =(id) =>{
        bookService.getBookById(id) 
        .then((res) => {
          let book = res.data;
          this.setState({
            id:book.id,
            title: book.title,
            author: book.author,
            imageUrl: book.imageUrl,
            isbn: book.isbn,
            price: book.price,
            language: book.language,
            genre: book.genre
          })
                 
  
        });
  
      }

      saveBook = (e) => {
        e.preventDefault();
        if(this.state.title && this.state.author && this.state.imageUrl && this.state.isbn && this.state.price && this.state.language && this.state.genre){ 
        let newBook = {title: this.state.title, author: this.state.author, imageUrl: this.state.imageUrl, isbn: this.state.isbn, price: this.state.price, language: this.state.language, genre: this.state.genre};
        bookService.updateBookById(this.state.id, newBook)
            .then(res => {
              console.log(res);
              this.setState({snackbaropen:true, message:'Book update successfully', colors:'success'})
              setTimeout(()=> this.productList(), 3000)
            })
            .catch(error => {
              console.log(error);
              this.setState({snackbaropen:true, message:'fail', colors:'error'})
            });
          }else{
            this.setState({snackbaropen:true, message:'Updated fail', colors:'error'})
          }
    
        }

      onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });


    handleChange = (event) => {
      this.setState({language: event.target.value})
    };

    handleChangeGenre = (event) => {
      this.setState({genre: event.target.value})
    };

    productList =()=>{
        return this.props.history.push('/viewbook');
    }

    render(){
        return(
            <>

                <div>
                <Snackbar 
                    open={this.state.snackbaropen} 
                    autoHideDuration={3000} 
                    onClose={this.handleClose} 
                    anchorOrigin={{  vertical: 'top', horizontal: 'right'}}>
                    <Alert onClose={this.handleClose} severity={this.state.colors}>
                    {this.state.message}
                    </Alert>
                </Snackbar>
                </div>


                <Grid container spacing={3}>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                <ValidatorForm onSubmit={this.saveBook}>
                    <paper style={style.papersty}>
                    <Grid container>
                    <Grid item xs={2}/>
                    <Grid item xs={8} style={{backgroundColor:"#212121", margin:"20px"}}>
                        <CardContent style={style.cardsty}>
                        <CardActions>
                            <CardContent>
                            <h2><FontAwesomeIcon icon={faEdit}/>Edit Book</h2>
                            <br/>
                            <br/>
                            <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                <TextValidator
                                    id="Title"
                                    name="title"
                                    type="text"
                                    label="Title"
                                    value={this.state.title} 
                                    onChange={this.onChange}
                                    helperText="Enter Book Title"
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
                                    id="Author"
                                    name="author"
                                    type="text"
                                    label="Author"
                                    value={this.state.author} 
                                    onChange={this.onChange}
                                    helperText="Enter Book Author"
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
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="Url"
                                    label="Cover Photo URL"
                                    value={this.state.imageUrl} 
                                    onChange={this.onChange}
                                    helperText="Enter Book Cover Photo URL"
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
                                    id="Isbn"
                                    name="isbn"
                                    type="number"
                                    label="ISBN Number"
                                    value={this.state.isbn} 
                                    onChange={this.onChange}
                                    helperText="Enter Book ISBN Number"
                                    variant="outlined"
                                    validators={['required']}
                                    errorMessages={['This fieled is required']}
                                    fullWidth
                                />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                <TextValidator
                                    id="price"
                                    name="price"
                                    type="number"
                                    label="Price"
                                    value={this.state.price} 
                                    onChange={this.onChange}
                                    helperText="Enter Book Price"
                                    variant="outlined"
                                    validators={['required']}
                                    errorMessages={['This fieled is required']}
                                    fullWidth
                                />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                <InputLabel id="language">Language</InputLabel>
                                <Select
                                    labelId="language"
                                    id="language"
                                    name="language"
                                    value={this.state.language}
                                    onChange={this.handleChange}
                                    label="Language"
                                >
                                    <MenuItem value={"English"}>
                                    <em>English</em>
                                    </MenuItem>
                                    <MenuItem value={"Tamil"}>Tamil</MenuItem>
                                    <MenuItem value={"Sinhala"}>Sinhala</MenuItem>
                                </Select>
                                <FormHelperText>Please select your Language</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                <InputLabel id="genre">Genre</InputLabel>
                                <Select
                                    labelId="genre"
                                    id="genre"
                                    name="genre"
                                    value={this.state.genre}
                                    onChange={this.handleChangeGenre}
                                    label="genre"
                                >
                                    <MenuItem value={"Biography"}>
                                    <em>Biography</em>
                                    </MenuItem>
                                    <MenuItem value={"Technology"}>Technology</MenuItem>
                                    <MenuItem value={"Maths"}>Maths</MenuItem>
                                </Select>
                                <FormHelperText>Please select your Genre</FormHelperText>
                                </FormControl>
                            </Grid>
                            </Grid>
                            </CardContent>
                        </CardActions>
                        <CardActions style={{float: 'right'}}>
                                <FormControl>
                                <Button href="" variant="contained" style={{backgroundColor:"#66bb6a"}} type="submit"
                                startIcon={<SaveIcon />}>
                                    <span>Update</span>
                                </Button>
                                </FormControl>
                                <FormControl>
                                <Button href="" variant="contained" color="primary" type="reset" value="Reset"
                                startIcon={<RotateLeftOutlinedIcon />}>
                                    <span>Reset</span>
                                </Button>
                                </FormControl>
                                <FormControl>
                                <Button href="" variant="contained" color="primary" href="/viewbook"
                                startIcon={<ListAltOutlinedIcon />}>
                                    <span>Book List</span>
                                </Button>
                                
                                </FormControl>
                            </CardActions>
                            <br/>
                            <br/>
                        </CardContent>
                    </Grid>
                    <Grid item xs={2}/>
                    </Grid>
                    
                    </paper>
                    </ValidatorForm>
                </Grid>
                <Grid item xs={1}/>
                </Grid>
            </>
        )
    }
}