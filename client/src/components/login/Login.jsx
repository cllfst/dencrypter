import React, { Component } from 'react';
import './login.css';
import axios from 'axios';

class Login extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <img src={require('./Dencrypter.png')}></img>
                <div className="block">
                    <div className="login-text">
                        <h1><b>Dencrypter</b></h1>
                        <h3>Your gate to a secure internet.</h3>
                    </div>
                    <div className="buttons">
                        <div className="container my-container">
                            <form action="">
                                <div className="form">
                                    <label for="email" ><b>Email:</b></label>
                                    <input className="in" type="email" class="form-control" id="email" placeholder="Enter email" name="email" style={{marginTop:"20px"}} ></input>
                                </div>
                                <div className="form">
                                    <label for="pwd"><b>Password:</b></label>
                                    <input className="in" type="password" class="form-control" id="pwd" placeholder="Enter password" name="password" style={{marginTop:"20px"}}></input>
                                </div>
                                <button type="button" className="btn bg-light btn-outline-primary btn-lg btn button"><b>submit</b></button>
                                
                            </form>
                        </div>
                    </div>
                </div>

            </React.Fragment>
                );
            }
        }
        
export default Login;