import React, { Component } from 'react'
import {Container,Row,Col,Table,Button} from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchBlogKu,deleteData } from '../store/blogsAction';
import {Link} from 'react-router-dom';
import ReactImageFallback from "react-image-fallback";
import Swal from 'sweetalert2';

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

        Swal.fire({
            text: "Are You Sure Delete this data ?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yuppi !'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Success!',
                'Your has been successfully deleted.',
                'success'
              )
              this.props.deleteData(e);
            }
          })
        
        
    }

    componentDidMount() {
        this.props.showData();
        this.setState({isLoading:false});
        console.log(this.props.data)
    }

    const 

    render() {
        const {isLoading,gambaria} = this.state;
        return (
            
            <Container className='mt-4'>
                { !isLoading ? (
                <Row>
                    <Col xs={12} md={12}>
                    <Button className='mb-2' tag={Link} to='/blogs/add' color="success">Add Blog</Button>
                    {this.props.data.length > 0 ? (
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
                            { this.props.data.map( (item,index) =>{
                                let content = item.body.substr(0,50);
                                return (
                                    <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.title}</td>
                                    <td><div dangerouslySetInnerHTML={{__html: content}}></div></td>
                                    <td><ReactImageFallback
                                    src={gambaria + item.image}
                                    fallbackImage={`${gambaria}assets/blocky.jpg`}
                                    alt="cool image ku"
                                    className="my-image"
                                    style={{width:'100px'}}
                                    /></td>
                                    <td>
                                        <Button className='mr-2' tag={Link} to={`/blogs/edit/${item._id}`} color="warning">Edit</Button>
                                        <small onClick={() => {this.handleDelete(item._id)}} className='btn btn-danger'>Delete</small>
                                    </td>
                                    </tr>
                                )
                            } )}
                        </tbody>
                        </Table>
                        ) : <h3 className='alert alert-info text-center'>Your Data Blog is 0</h3>}
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
