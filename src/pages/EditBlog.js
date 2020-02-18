import React,{Component} from 'react';
import { Formik } from 'formik';
import {connect} from 'react-redux';
import {updateData, getDataBlog} from '../store/blogsAction';
import {Container,Row,Col,Card,Form,FormGroup,Label,Input,CardBody,Button} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import jwt from 'jwt-decode';

class EditBlog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gambarType:'',
            gambarImage:'',
            idBlog:this.props.match.params.id,
            urlImg:process.env.REACT_APP_IMAGE,
        }

    }

    componentDidMount = () => {
        this.props.getData(this.state.idBlog);
    }


    handleImage = (e) => {
        this.setState({gambarType:e.target.files[0],gambarImage:URL.createObjectURL(e.target.files[0])})
    }

    render() {
        const token  = localStorage.getItem('token');
        const dekode = jwt(token);
        const idku   = dekode._id;
    return (
        <Container>
            <Row>
                <Col xs={12} md={{size:4,offset:4}}>
                    <Card>
                        <CardBody>
                            <h3>Add Blog</h3>
                            <Formik
                            initialValues={{ title: this.props.dataku.title, body: this.props.dataku.body , image:'',author:idku}}
                            validate={values => {
                                const errors = {};
                                if (!values.title) {
                                errors.title = 'Email Required';
                                } 
                                return errors;
                            }}
                            enableReinitialize={true}
                            onSubmit={(values, { setSubmitting ,resetForm }) => {
                                setSubmitting(false);
                                    let formData = new FormData()
                                    for (const key in values) {
                                        if (values.hasOwnProperty(key)) {
                                            formData.append(key, values[key]);
                                            if (key === "avatar") {
                                                formData.append(key, values.avatar.file);
                                            }
                                        }
                                    }
                                    this.props.updateData(formData,this.state.idBlog);
                            }}
                            >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                setFieldValue
                                /* and other goodies */
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <br/>
                                {errors.email ?(
                                    <small style={{color:'red'}}>{errors.title && touched.title && errors.title}</small>
                                ) : ''}
                                <Input
                                    type="text"
                                    name="title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title||""}
                                />
                                </FormGroup>
                                <FormGroup>
                                <Label for="exampleEmail">Body</Label>
                                {errors.body && touched.body && errors.body}
                                <Input
                                    type="text"
                                    name="body"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.body||""}
                                />
                                </FormGroup>
                                <FormGroup>
                                <Label for="exampleEmail">Image</Label>
                                {errors.image && touched.image && errors.image}
                                <Input
                                    type="file"
                                    name="image"
                                    onChange={event => {
                                            setFieldValue(
                                            "image",
                                            event.currentTarget.files[0]
                                        );
                                        this.handleImage(event);
                                    }}
                                    onBlur={handleBlur}
                                />
                                </FormGroup>
                                {this.state.gambarType !== "" ? (
                                    <img src={this.state.gambarImage} alt="avatar" style={{width:'100px'}} />
                                ): (<img style={{width:'150px'}} alt='oldImage' src={ this.state.urlImg + this.props.dataku.image} />)}
                                <Button style={{marginTop:'10px'}} type='submit' color="primary" size="md" block disabled={isSubmitting}>Submit</Button>
                                </Form>
                            )}
                            </Formik>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
    }
}

const mapStateToProps = state => {
    return{
        dataku:state.blogs.editBlog
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getData:(data) => dispatch(getDataBlog(data)),
        updateData:(data,id)=> dispatch(updateData(data,id))
    }
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(EditBlog));