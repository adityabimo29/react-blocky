import React from 'react';
import {Router,Switch,Route,Redirect} from 'react-router-dom';
import history from './history'
//import Navbar from './components/Navbar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBlog from './pages/AddBlog';
import EditBlog from './pages/EditBlog';
import DetailBlog from './pages/DetailBlog';
import Footer from './components/Footer';
import { connect } from 'react-redux';

function App(props) {
  return (
    <Router history={history} >
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/my-blog'>
          {props.isLogin ? <Blogs /> : <Redirect to='/' /> }
        </Route>
        <Route path='/profile' >
          {props.isLogin ? <Profile /> : <Redirect to='/' /> }
        </Route>
        <Route path='/login' >
          <Login />
        </Route>
        <Route path='/register' >
          <Register />
        </Route>
        <Route path='/blogs/edit/:id' >
          {props.isLogin ? <EditBlog /> : <Redirect to='/' /> }
        </Route>
        <Route path='/blogs/detail/:id' component={DetailBlog} />
        <Route path='/blogs/add' >
          {props.isLogin ? <AddBlog /> : <Redirect to='/' /> }
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

const mapStateToProps = state => {
  return{
    isLogin : state.users.isLogged,
  }
}


export default connect(mapStateToProps)(App) ;
