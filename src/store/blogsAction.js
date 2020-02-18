import axios from 'axios';
import jwt from 'jwt-decode';
import history from '../history';

export const GET_DATA = 'GET_DATA';
export const GET_BY_AUTHOR = 'GET_BY_AUTHOR';
export const GET_BY_ID_BLOG = 'GET_BY_ID_BLOG';

export const tampilData = data => {
    return {
        type:GET_DATA,
        payload:data
    }
}

export const dataSaya = data => {
    return {
        type:GET_BY_AUTHOR,
        payload:data
    }
}

export const editSaya = data => {
    return {
        type:GET_BY_ID_BLOG,
        payload:data
    }
}

export const fetchData = () => async dispatch => {
    //const token = localStorage.getItem('token');
    return await axios.get('http://localhost:3004/blogs').then(res => {
        dispatch(tampilData(res.data.data));
        //console.log(res.data.data);        
    })
}

export const fetchBlogKu = () => dispatch => {
    const token = localStorage.getItem('token');
    const dekode = jwt(token);
    return axios.get(`http://localhost:3004/blogs/author/${dekode._id}`,{headers:{"authorization":`Bearer ${token}`}}).then(res => {
        dispatch(dataSaya(res.data.data));
    })
}

export const postData = (data)  => {
    const token = localStorage.getItem('token');
    return axios.post('http://localhost:3004/blogs/add',data,{headers:{"authorization":`Bearer ${token}`}}).then(res=>{
        console.log(res.data);
        history.push('/my-blog');
    })
}

export const getDataBlog = data => async dispatch => {
    return await axios.get(`http://localhost:3004/blogs/detail/${data}`).then(res=>{   
    dispatch(editSaya(res.data.data));
    }).catch(err => {
        console.log(err)
    })
}

export const updateData = (data,id)  => {
    const token = localStorage.getItem('token');
    return axios.put(`http://localhost:3004/blogs/edit/${id}`,data,{headers:{"authorization":`Bearer ${token}`}}).then(res=>{
        console.log(res.data);
        history.push('/my-blog');
    })
}

export const deleteData = (id)  => dispatch => {
    const token = localStorage.getItem('token');
    return axios.delete(`http://localhost:3004/blogs/delete/${id}`,{headers:{"authorization":`Bearer ${token}`}}).then(res=>{
        dispatch(fetchData());
        //history.push('/my-blog');
    })
}


