import React from 'react';
import { Formik } from 'formik';
import {connect} from 'react-redux';
import {register} from '../store/usersAction';
import {Container,Row,Col,Card,Form,FormGroup,Label,Input,CardBody,Button} from 'reactstrap';
import { withRouter } from 'react-router';
import history from '../history';

function Register(props) {
    return (
        <Container>
            <Row>
                <Col xs={12} md={{size:4,offset:4}}>
                    <Card>
                        <CardBody>
                            <h3>Registration Form</h3>
                            <Formik
                            initialValues={{ username:'',email: '', password: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                errors.email = 'Email Required';
                                } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                errors.email = 'Invalid email address';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                //props.register(values);
                                alert('Register Success')
                                history.push('/login')
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
                                /* and other goodies */
                            }) => (
                                <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                <Label for="exampleEmail">Username</Label>
                                {errors.username && touched.username && errors.username}
                                <Input
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                />
                                </FormGroup>
                                <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <br/>
                                {errors.email ?(
                                    <small style={{color:'red'}}>{errors.email && touched.email && errors.email}</small>
                                ) : ''}
                                <Input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                </FormGroup>
                                <FormGroup>
                                <Label for="exampleEmail">Password</Label>
                                {errors.password && touched.password && errors.password}
                                <Input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                                </FormGroup>
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
        register:(data)=> dispatch(register(data))
    }
}

export default  withRouter(connect(null,mapDispatchToProps)(Register));