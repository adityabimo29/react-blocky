import axios from 'axios';
import history from '../history';
import jwt from 'jwt-decode';
import Swal from 'sweetalert2'
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const GET_BY_ID = 'GET_BY_ID';
const  urlPath = process.env.REACT_APP_URL_EXPRESS;



export const loggedIn = (data) => {
    return {
        type:LOGGED_IN,
        payload:data
    }
}
export const loggedOut= () =>{
    return {
        type:LOGGED_OUT,
    }
}

export const dataSaya = data => {
    return {
        type:GET_BY_ID,
        payload:data
    }
}

export const checkUsers = (data) => dispatch => {
    
    return axios.post(`${urlPath}users/login`,data).then(res=>{
        if(res.data !== 'gagal'){
            localStorage.setItem('token',res.data.token);
            dispatch(loggedIn(data));
            Swal.fire({
                title: 'Login Success !',
                position: 'center',
                icon: 'success',
                timer:2000,
                showConfirmButton: false,
            })
            history.push('/my-blog');
        }else{
            Swal.fire({
                title: 'Email or Password is wrong !',
                position: 'center',
                icon: 'error',
            })
        }
    })
}

export const register = (data)  => {
    return axios.post(`${urlPath}users/register`,data).then(res=>{
        Swal.fire({
            title: 'Registration Success !',
            position: 'center',
            icon: 'success',
            timer:2000,
            showConfirmButton: false,
        })
        history.push('/login');
    })
}

export const getData = () => async dispatch => {
    const token = localStorage.getItem('token');
    let dekode = '';
    if(token){
        dekode = jwt(token);
    }
    
    return await axios.get(`${urlPath}users/detail/${dekode._id}`,{headers:{"authorization":`Bearer ${token}`}}).then(res=>{
        dispatch(dataSaya(res.data.data));
    }).catch(err => {
        console.log(err)
    })
}