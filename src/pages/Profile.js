import React, { Component } from 'react'
import {Container,Jumbotron} from 'reactstrap';
import {getData} from '../store/usersAction';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import jwt from 'jwt-decode';

class Profile extends Component {

    state = {
        data : {}
    }

    componentDidMount = () => {
        const token = localStorage.getItem('token');
        let dekode =''
        if(token){
            dekode = jwt(token);
        }
        
        this.setState({data:dekode});
    }

    render() {
        const {data} = this.state;
        return (
            <Container>
                <h1 className='text-center'>My Profile</h1>
                <Jumbotron>
                    <h1 className="display-3">Hello, {data.username}</h1>
                    <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                    
                </Jumbotron>
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return{
        data:state.users.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getData:() => dispatch(getData())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Profile) )