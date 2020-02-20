
const initialState = {
    data: [],
    myBlog:[],
    editBlog:{},
}

const blogReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'GET_DATA':    
            return{
                ...state,
                data:action.payload
            }
        case "GET_BY_AUTHOR" :
            return{
                ...state,
                myBlog:action.payload
            }
        case "GET_BY_ID_BLOG" :
            return{
                ...state,
                editBlog: action.payload
            }
        case "ADD_BLOG" :
            return{
                ...state,
                myBlog:state.data.concat(action.payload)
            }
        case "REFRESH" :
            return{
                ...state,
                myBlog:action.payload
            }
        case "LOGGED_IN" :
            return{
                ...state,
                isLogin:true,
                user:action.payload
            }
        case "LOGGED_OUT" :
            return{
                ...state,
                isLogin:false
            }
    
        default:
            return  state;
    }
}


export default blogReducer;