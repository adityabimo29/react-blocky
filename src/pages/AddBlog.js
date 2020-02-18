import React,{useState} from 'react';
import { Formik } from 'formik';
import {connect} from 'react-redux';
import {postData} from '../store/blogsAction';
import {Container,Row,Col,Card,Form,FormGroup,Label,Input,CardBody,Button} from 'reactstrap';
import { withRouter } from 'react-router';
import jwt from 'jwt-decode';

function AddBlog(props) {

    const  [gambarType,setGambarType] = useState('');
    const  [gambarImage,setGambarImage] = useState('');

    const handleImage = (e) => {
        setGambarType(e.target.files[0]);
        setGambarImage(URL.createObjectURL(e.target.files[0]))
    }

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
                            initialValues={{ title: '', body: '' , image:'',author:idku}}
                            validate={values => {
                                const errors = {};
                                if (!values.title) {
                                errors.title = 'Email Required';
                                } 
                                return errors;
                            }}
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
                                    props.postData(formData);
                                    
                                    
                                
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
                                    value={values.title}
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
                                    value={values.body}
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
                                        handleImage(event);
                                    }}
                                    onBlur={handleBlur}
                                />
                                </FormGroup>
                                {gambarType !== "" && (
                                    <img src={gambarImage} alt="avatar" style={{width:'100px'}} />
                                )}
                                <Button type='submit' color="primary" size="md" block disabled={isSubmitting}>Submit</Button>
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

const mapDispatchToProps = dispatch => {
    return{
        postData:(data)=> dispatch(postData(data))
    }
}

export default  withRouter(connect(null,mapDispatchToProps)(AddBlog));