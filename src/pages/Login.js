import React from 'react';
import { Formik } from 'formik';
import {connect} from 'react-redux';
import {checkUsers} from '../store/usersAction';
import {Container,Row,Col,Card,Form,FormGroup,Label,Input,CardBody,Button} from 'reactstrap';
import { withRouter } from 'react-router';
import Swal from 'sweetalert2'

function Login(props) {
    return (
        <div className='myBg py-5'>
        <Container className='pt-5'>
            <Row>
                <Col xs={12} md={{size:4,offset:4}}>
                    <Card>
                        <CardBody>
                            <h3 className='text-center'>Login Form</h3>
                            <Formik
                            initialValues={{ email: '', password: '' }}
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
                                setTimeout(() => {
                                setSubmitting(false);
                                Swal.fire({
                                    position: 'top-center',
                                    icon: 'info',
                                    title: 'Loading',
                                    showConfirmButton: false,
                                    timerProgressBar: true,
                                    timer: 1000
                                  })
                                props.checkUsers(values);
                                }, 400);
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
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return{
        checkUsers:(data)=> dispatch(checkUsers(data))
    }
}

export default  withRouter(connect(null,mapDispatchToProps)(Login));