import React, { Component } from 'react'
import {Container,Row,Col,Card, CardText, CardBody,
    CardTitle,  Button} from 'reactstrap';
//import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchData } from '../store/blogsAction';
import { Link} from 'react-router-dom';
import ReactImageFallback from "react-image-fallback";
//import axios from 'axios';
class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoading:true,
            gambaria: process.env.REACT_APP_IMAGE
        }
    }

    componentDidMount() {
        this.props.showData();
        this.setState({isLoading:false}) 
    }

    addDefaultSrc(ev){
        ev.target.src = 'assets/blocky.jpg';
    }

    

    render() {
        const {isLoading,gambaria} = this.state;
        return (
            
            <Container className='mt-4'>
                <h1 className='text-center alert alert-info cardo'> Welcome to My Blocky App</h1>
                { !isLoading ? (
                <Row >
                    {this.props.data.map( (item,index) =>{
                        let content = item.body.substr(0,150);
                        return (
                            <Col key={index} xs={12} md={4} className='mb-4'>
                            <Card className='cardo'>
                            <ReactImageFallback
                                src={gambaria + item.image}
                                fallbackImage={`${gambaria}assets/blocky.jpg`}
                                alt="cool image should be here"
                                className="my-image"
                                style={{width:'100%',maxHeight:'200px',minHeight:'200px'}}
                                />
                                {/* <CardImg onError={(ev)=>{ ev.target.src ='assets/blocky.jpg'} } style={{maxHeight:'200px',minHeight:'200px'}} top width="100%" src={gambaria + item.image} alt="Card image cap" /> */}
                                <CardBody>
                                <CardTitle>{item.title}</CardTitle>
                                <CardText style={{maxHeight:'72px',overflow:'hidden'}} dangerouslySetInnerHTML={{__html: content}}></CardText>
                                <Button tag={Link} to={`/blogs/detail/${item._id}`} color='info' outline>Read More</Button>
                                </CardBody>
                            </Card>
                            </Col>
                                )
                    } )}
                </Row>
                ) : (<p>Loading</p>)}
            </Container>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.blogs.data,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showData:() => dispatch(fetchData())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
