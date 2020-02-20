import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {getDataBlog} from '../store/blogsAction';
import {Container,Col,Row,Card} from 'reactstrap';
import moment from 'moment';
import { Facebook, Twitter } from 'react-sharingbuttons';
import 'react-sharingbuttons/dist/main.css';
import Disqus from 'disqus-react';
import ReactImageFallback from "react-image-fallback";
class DetailBlog extends Component {

     componentDidMount () {
        this.props.getData(this.props.match.params.id);
        
    }
    
    render() {
        const {data} = this.props;
        const disqusShortname = 'blogs';
        const disqusConfig = {
            url: window.location.href,
            identifier: data._id,
            title: data.title,
        };
        const urlShare = window.location.href;
        const gambaria = process.env.REACT_APP_IMAGE
        const body = data.body;
        const myDate = moment(data.date).format('MMMM Do YYYY, h:mm:ss a');
        return (
            <Container>
                <Row>
                    <Col xs={12} md={{size:8,offset:2}}>
                        <Card style={{padding:'10px'}}>
                        <h1 className='text-center'>{data.title}</h1>
                        <small className='mb-2' style={{fontWeight:'bold'}}>{myDate}</small>
                        <ReactImageFallback
                            src={gambaria + data.image}
                            fallbackImage={`${gambaria}assets/blocky.jpg`}
                            alt="cool image ku"
                            className="my-image"
                            style={{width:'100%',minHeight:'200px'}}
                        />
                        <Row>
                            <Col md={12}>
                                <Facebook url={urlShare}   />
                                <Twitter url={urlShare}  />
                            </Col>
                        </Row>
                        <p dangerouslySetInnerHTML={{__html: body}}></p>
                        <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
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