import axios from "axios";
import authHeader from './auth.header';

const API_URL = "https://javaspring-api1.herokuapp.com/api/auth/"

class AuthService {
  login(username, password) {
    return axios.post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.basicToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    axios.post(API_URL + "logout", {});
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  addUser(user){
    return axios.post("https://javaspring-api1.herokuapp.com/api/auth/signup", user , {headers: authHeader()})
  }

  getCurrentUser(){
      return JSON.parse(localStorage.getItem("user"));;
  }

  updatePassword(user,oldPassword,newPassword){
      return axios.put(API_URL+'/password/'+user.id+'?oldPassword='+oldPassword+'&newPassword='+newPassword,user)
  }

  getAllUser(){
      return axios.get(API_URL + 'user',{headers: authHeader()});
  }

  deleteUser(userId){
      return axios.delete(API_URL + 'user/' + userId, {headers: authHeader()});
  }
  fetchUserById(userId){
      return axios.get(API_URL+'user/'+userId, {headers: authHeader()});
  }
  updateUser(id, user){
      return axios.put(API_URL+ 'user/' + id, user, {headers: authHeader()});
  }

  getSearchUser(pageNo,pageSize, sortBy, searchText) {
      return axios.get(API_URL + '?pageNo=' + pageNo +  '&pageSize=' + pageSize + '&sortBy=' + sortBy + '&searchText=' + searchText);
  }

  getAllUserInPage(pageNo,pageSize, sortBy){
      return axios.get('https://javaspring-api1.herokuapp.com/api/auth/user/page?pageNo=' + pageNo + '&pageSize='+ pageSize + '&sortBy=' + sortBy);
  }
}



export default new AuthService();
