const loginia = localStorage.getItem('token');
const initialState = loginia ? {
    isLogged: true,
    user:{}
} : {
    isLogged : false,
    user:{}
}

const usersReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'LOGGED_IN':     
           return{
               isLogged:true
           }
        case 'LOGGED_OUT':
           return{
               isLogged:false
           }
        case 'GET_BY_ID':
            return{
                user:action.payload
            }
        default:
            return state;
    }
}


export default usersReducer;