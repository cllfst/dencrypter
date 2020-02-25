import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './register.css';

class Register extends Component {
    state = {
        name: '',
        lastName: '',
        email: '',
        password: '',
        password_confirmation: '',
        answer:''
    }

    render() {
        const password = this.props.password;
        const password2 = this.props.password2;
        return (
            <React.Fragment>
                <img src={require('./Dencrypter.png')}></img>
                <div className="Reg-block">
                    <div className="reg-text">
                        <h1><b>Dencrypter</b></h1>
                        <h3>Secure your data.</h3>

                    </div>
                    <div className="reg-buttons">className
                        <div className="container my-container">
                            <form className="reg-form">
                                <div className="form-group">
                                    <label for="name"> Name:</label>
                                    <input type="text" className="form-control " id="name" placeholder="Enter Name" name="name" onBlur={this.handleInputChange}></input>
                                </div>
                                <div className="form-group">
                                    <label for="lastName">Last name:</label>
                                    <input type="text" className="form-control " id="lastName" placeholder="Enter Last name" name="lastName" onBlur={this.handleInputChange}></input>
                                </div>
                                <div className="form-group">
                                    <label for="username">Username:</label>
                                    <input type="text" className="form-control " form-control-lg id="username" placeholder="Enter username: at least 3 letters" name="username" onBlur={this.verifUsername}></input>
                                </div>
                                <div className="form-group">
                                    <label for="email">Email:</label>
                                    <input type="email" className="form-control " id="email" placeholder="Enter email" name="email" onBlur={this.handleInputChange}></input>
                                </div>
                                <div className="form-group">
                                    <label for="pwd">Password:</label>
                                    <input type="password" className="form-control " id="pwd" placeholder="Enter password" name="password" onBlur={this.handleInputChange} ></input>
                                </div>
                                <div className="form-group">
                                    <label for="pwd">confim Password:</label>
                                    <input type="password" className="form-control" id="pwd" placeholder="confirm password" name="password_confirmation" onBlur={this.handleInputChange} ></input>
                                </div>
                                <button type="submit" onClick={this.handlesubmit} className="btn bg-light btn-outline-primary btn-lg btn"><b>submit</b></button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    verifUsername = (event) => {
        if (event.target.value.length < 3) {
            alert("your username must have at least 3 letters");
            return false;
        }
        else {
            this.setState({
                [event.target.name]: event.target.value
            })
            return true;
        }
    }



    // verifPassword(e,password) {
    //     alert(password);
    //     console.log(password);
    // }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlesubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        if (this.state.password === this.state.password_confirmation) {
            console.log("yeeeey");
            const { name, lastName, username, email, password } = this.state;

        const user = { 
            name, 
            lastName, 
            username,
            email, 
            password };

        axios
          .post('http://localhost:5000/signUp', user)
          .then(() => console.log('User Created'))
          .catch(err => {
            console.error(err);
          });
        }
        else alert("check your password!")

        
       }

    }

    export default Register;