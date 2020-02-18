import React from 'react';
import {Router,Switch,Route} from 'react-router-dom';
import history from './history'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBlog from './pages/AddBlog';
import EditBlog from './pages/EditBlog';
import DetailBlog from './pages/DetailBlog';

function App(props) {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/my-blog'>
          <Blogs />
        </Route>
        <Route path='/profile' >
          <Profile />
        </Route>
        <Route path='/login' >
          <Login />
        </Route>
        <Route path='/register' >
          <Register />
        </Route>
        <Route path='/blogs/edit/:id' component={EditBlog} />
        <Route path='/blogs/detail/:id' component={DetailBlog} />
        <Route path='/blogs/add' >
          <AddBlog />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
