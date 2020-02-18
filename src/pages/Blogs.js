import React, { Component } from 'react'
import {Container,Row,Col,Table,Button} from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchBlogKu,deleteData } from '../store/blogsAction';
import {Link} from 'react-router-dom';

//import axios from 'axios';
class Blogs extends Component {

    constructor(props){
        super(props);
        this.state = {
            gambaria:process.env.REACT_APP_IMAGE,
            isLoading:true
        }
    }

    handleDelete = (e) => {
        //alert(e);
        this.props.deleteData(e);
        
    }

    componentDidMount() {
        this.props.showData();
        this.setState({isLoading:false});
        
    }

    

    render() {
        const {isLoading,gambaria} = this.state;
        return (
            
            <Container className='mt-4'>
                { !isLoading ? (
                <Row>
                    <Col xs={12} md={12}>
                    <Button className='mb-2' tag={Link} to='/blogs/add' color="success">Add Blog</Button>
                    <Table striped>
                        <thead>
                            <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Gambar</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map( (item,index) =>{
                                let content = item.body.substr(0,50);
                                return (
                                    <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.title}</td>
                                    <td><div dangerouslySetInnerHTML={{__html: content}}></div></td>
                                    <td><img style={{width:"100px"}} src={gambaria + item.image} alt={item.image} /></td>
                                    <td>
                                        <Button className='mr-2' tag={Link} to={`/blogs/edit/${item._id}`} color="warning">Edit</Button>
                                        <small onClick={() => {this.handleDelete(item._id)}} className='btn btn-danger'>Delete</small>
                                    </td>
                                    </tr>
                                )
                            } )}
                        </tbody>
                        </Table>
                    </Col>
                </Row>
                ) : (<p>Loading</p>)}
            </Container>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.blogs.myBlog,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showData:() => dispatch(fetchBlogKu()),
        deleteData:(id)=> dispatch(deleteData(id))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Blogs));
