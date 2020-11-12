import axios from 'axios';
import authHeader from './auth.header';

const API_URL = 'https://javaspring-api1.herokuapp.com/book';

class bookService {
    createBook(book) {
        return axios.post(API_URL + '/', book, {headers: authHeader()});
    }

    getAllBooks(){
        return axios.get(API_URL, {headers: authHeader()});
    }

    deleteBookById(Id) {
        return axios.delete(API_URL + '/' + Id, {headers: authHeader()});
    }

    getBookById(bookId) {
        return axios.get(API_URL + '/' + bookId, {headers: authHeader()});
    }

    updateBookById(id, newBook) {
        return axios.put(API_URL + '/' + id, newBook, {headers: authHeader()});
    }

    getAllBooksInPage(pageNo,pageSize, sortBy){
        return axios.get(API_URL + '/page?pageNo=' + pageNo + '&pageSize=' + pageSize + '&sortBy=' + sortBy, {headers: authHeader()});
    }

    getSearchBook(pageNo,pageSize, sortBy, searchText) {
        return axios.get(API_URL + '?pageNo=' + pageNo +  '&pageSize=' + pageSize + '&sortBy=' + sortBy + '&searchText=' + searchText, {headers: authHeader()});
    }
}

export default new bookService();
