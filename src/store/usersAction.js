import axios from 'axios';
import history from '../history';
import jwt from 'jwt-decode';

export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const GET_BY_ID = 'GET_BY_ID';


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
    return axios.post('http://localhost:3004/users/login',data).then(res=>{
        if(res.data !== 'gagal'){
            localStorage.setItem('token',res.data.token);
            dispatch(loggedIn(data));
            history.push('/my-blog');
        }else{
            alert('Email or Password is wrong.');
        }
    })
}

export const register = (data)  => {
    return axios.post('http://localhost:3004/users/register',data).then(res=>{
        
    })
}

export const getData = () => async dispatch => {
    const token = localStorage.getItem('token');
    const dekode = jwt(token);
    
    
    return await axios.get(`http://localhost:3004/users/detail/${dekode._id}`,{headers:{"authorization":`Bearer ${token}`}}).then(res=>{
        dispatch(dataSaya(res.data.data));
    }).catch(err => {
        console.log(err)
    })
}