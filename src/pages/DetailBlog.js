import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {getDataBlog} from '../store/blogsAction';
import {Container,Col,Row,Card} from 'reactstrap';

class DetailBlog extends Component {

     componentDidMount () {
        this.props.getData(this.props.match.params.id);
    }
    
    render() {
        const {data} = this.props;
        const gambaria = process.env.REACT_APP_IMAGE
        return (
            <Container>
                <Row>
                    <Col md={12}>
                        <Card style={{padding:'10px'}}>
                        <h1 className='text-center'>{data.title}</h1>
                        <img style={{width:'100%'}} alt='gambar' src={gambaria + data.image} />
                        <p>{data.body}</p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
const mapStateToProps = state => {
    return{
        data:state.blogs.editBlog,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getData:(id) => dispatch(getDataBlog(id))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(DetailBlog) )