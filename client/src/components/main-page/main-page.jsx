import React, { Component } from 'react';
import './main-page.css';

class MainPage extends Component {
    loginClick() {
        window.open("/Login", "_self");
    }
    registerClick() {
        window.open("/register", "_self");
    }
    render() {
        return (
            <React.Fragment className="block">
                <img src={require('./Dencrypter.png')}></img>
                <div className="textt">
                    <h1><b>Dencrypter</b></h1>
                    <h3>Liberate your data.</h3>
                </div>
                <div className="buttonss">
                    <div className="stylebuttons">
                        <button type="button" className="btn bg-light btn-outline-primary btn-lg" style={{marginBottom: "60px"}} onClick={this.loginClick.bind(this)}><b>Login</b></button>
                        <br></br>
                        <button type="button" className="btn bg-light btn-outline-primary btn-lg" onClick={this.registerClick.bind(this)}><b>Register</b></button>


                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default MainPage;
