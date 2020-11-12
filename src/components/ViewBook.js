import React, {useEffect} from 'react';
import { makeStyles, Checkbox, Table, TableBody, TableCell, TableFooter, TableContainer, TableHead,InputAdornment, TableRow, Paper, Grid,InputBase,TextField} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TablePagination from '@material-ui/core/TablePagination';
import { IconButton } from '@material-ui/core';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Avatar from '@material-ui/core/Avatar';
import bookService from '../services/book.service';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";
import {  useTheme } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  grid: {
      margin: '35px 150px 20px 50px',
      padding: '10px 10px 10px 10px',
      backgroundColor: "#424242"
  },
  paper: {
    padding: '10px 10px 10px 10px', 
    margin: '10px 10px 10px 10px',
    position: 'inherit'
  },
  search: {
    position: 'relative',
    align:'left',
    },
});


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}



function PharmacyData(id, username, email,  role) {
  return {id, username, email, role };
}

const rows = [
  PharmacyData('id1', 'uaername', '@mail',  'admin'),
  PharmacyData('id2', 'username',  '@mail',  'user'),
  PharmacyData('id2', 'username',  '@mail',  'admin'),
 
  
];

export default function ViewBook() {
  const classes = useStyles();

  const [book, setBook] = React.useState([])
  const [count, setCount] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [message, setMessage] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const [searchString, setSearchString]= React.useState('');

  const serachData = () => {
    setPage(0)
    console.log('Hiiiiiiiiiii');
    if(searchString == ''){
      console.log('Helloooooo');
      bookService.getAllBooksInPage(0, 5, 'id')
      .then((response) => {
        setCount (response.data.Total_No_Of_Elements)
        console.log(count)
        
        setBook ( response.data.data)
        console.log(book)
    })
    }else{
      console.log('Welcomeeeeeee');
      // pharmacyService.getSearchMedicine(0, 5, 'id', searchString)
      axios.get("https://lilanispring.herokuapp.com/book?pageNo=" + page + "&pageSize=" + count + "&sortBy=id" + "&searchText=" + searchString)
      .then((response) => {
        setCount (response.data.Total_No_Of_Elements)
        console.log(count)
        setBook( response.data.data)
      console.log(book)
    })
  }
}

  useEffect(() => {

    bookService.getAllBooksInPage(0, 5, 'id')

    .then(
      response => {
        console.log(response.data.data)
        setBook(response.data.data)
        setCount(response.data.data.Total_No_Of_Elements)
        console.log(response.data.data)
        console.log(book);
      },
      error => {
        console.log(error)
        setBook(
          (error.response && error.response.data) ||
            error.message ||
            error.toString()
        )
      }
    );
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    bookService.getAllBooksInPage(newPage,5, 'id')
        .then((res)=>{
          setBook(res.data.data)
          console.log(res.data.data);
          setCount(res.data.Total_No_Of_Elements)
          console.log(res.data)
        },
        (error)=>{
          setCount(error)
        });
  };

  const searchChange = (e) => {
    console.log(e.target.value)
    setSearchString(e.target.value)
  }

  const deleteBookById = (Id) =>{
    bookService.deleteBookById(Id)
       .then(response => {
        setMessage('Book deleted successfully.');
        setOpen(true)
        setBook(book.filter(book => book.id !== Id));
        setTimeout(()=> productList(), 3000)
       },
       (error)=>{
        setMessage('deleted fail.')
        setOpen(true)
       });
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const clearText = (e) => {
    setSearchString ('')
    bookService.getAllBooksInPage(0,5, 'id')
    .then((response) => {
    console.log(response.data.Total_No_Of_Elements)
    setCount (response.data.Total_No_Of_Elements)
    console.log(count)
    setBook ( response.data.data)
    console.log(page)
    console.log(book)
    //console.log(Response.data.data)
    
  })
}


  const productList =()=>{
    window.location.reload()
  }
  
  
  return (
      <div>
    <Grid className={classes.grid}>
      <Paper className = {classes.paper}>

      <div>
        <Snackbar open={open} 
          autoHideDuration={6000} 
          onClose={handleClose} 
          anchorOrigin={{  vertical: 'top', horizontal: 'right'}}>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      </div>


        <h2><LibraryBooksIcon/>  Book List</h2>
        <div className={classes.search}>
            <div className={classes.searchIcon} style = {{float: 'right'}}>
           
            <TextField
              // className={classes.margin}
              id="input-with-icon-textfield"
              label="Search"
              value = {searchString}
              onChange = {searchChange}
              
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick = {() => serachData()}>
                      <SearchIcon/>
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment : (
                  <InputAdornment position="end">
                    <IconButton onClick = {() => clearText()}>
                      <ClearIcon/>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
             
            </div>
        </div>
        
        <TableContainer>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            
            <TableCell align="left"><b>Title</b></TableCell>
            <TableCell align="left"><b>Author</b></TableCell>
            <TableCell align="left"><b>ISBN Number</b></TableCell>
            <TableCell align="left"><b>Price</b></TableCell>
            <TableCell align="left"><b>Language</b></TableCell>
            <TableCell align="left"><b>Genre</b></TableCell>
            <TableCell align="left"><b>Actions</b></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {book.map((row) => (
            <TableRow>
              
              <TableCell align="left">
                <Avatar alt="Remy Sharp" src={row.bookUrl} /> {row.title}
              </TableCell>
              <TableCell align="left">{row.author}</TableCell>
              <TableCell align="left">{row.isbn}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{row.language}</TableCell>
              <TableCell align="left">{row.genre}</TableCell>
              <TableCell>
              <IconButton>
              <DeleteIcon
                color="default"
                align="left"
                inputProps={{ 'aria-label': 'DeleteIcon with default color' }}
                onClick={() =>deleteBookById(row.id)}
              />
              </IconButton>

              <IconButton href ={ `/editbook/${row.id}`} >
                <EditIcon
                color="default"
                align="left"
                inputProps={{ 'aria-label': 'DeleteIcon with default color' }
              }
              />
              </IconButton>

              </TableCell>
            
            </TableRow>
          ))}
          
        </TableBody>
        <TableFooter>
        <TableRow>
            <TablePagination
              rowsPerPageOptions={[5]}
              // colSpan={4}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              // SelectProps={{
              //   inputProps: { 'aria-label': 'rows per page' },
              //   native: true,
              // }}
              onChangePage={handleChangePage}
              // onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>

     
    </TableContainer>

    
    
      </Paper>
    </Grid>
    </div>
  );
}