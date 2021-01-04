import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import './Login.css';
import SHA256 from '../lib/SHA256'
require('dotenv').config();


axios.defaults.withCredentials = true;

class AdminLoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginId: null,
            password: null,
            errorMessage: null
        };
        this.handleInputValue = this.handleInputValue.bind(this)
        this.handleLogin = this.handleLogin.bind(this)

    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    }

    handleLogin() {
        const { loginHandler, close } = this.props;
        console.log(SHA256(this.state.password))
        if (!(this.state.loginId && this.state.password)) {
            this.setState({ errorMessage: '아이디와 비밀번호를 모두 채워주세요.' })
        } else {
            axios.post('http://localhost:4000/admin/login',
                { loginId: this.state.loginId, password: SHA256(this.state.password) },
                { headers: { "Content-Type": "application/json" } })
                .then(res => {
                    loginHandler(res.data.data.accessToken)
                }).then(() => {
                    this.props.history.push('/')

                })
                .catch(err => {
                    if (err.response.data.error) this.setState({ errorMessage: '아이디 또는 비밀번호가 틀립니다.' })
                });
        }
    }

    componentDidMount() {
        this.setState({ errorMessage: null })
    }

    render() {
        const { close } = this.props;
        const { errorMessage } = this.state;

        return (
            <div className="modal1">
                <div className="loginModal">
                    <span className="btnClose" onClick={close}>&times;</span>
                    <div className="loginModalContents" >
                        {errorMessage ? <div>{errorMessage}</div> : null}
                        <input
                            className="email"
                            type="text"
                            placeholder="id"
                            onChange={this.handleInputValue("loginId")} />
                        <input
                            className="password"
                            type="password"
                            placeholder="Password"
                            onChange={this.handleInputValue("password")} />
                        <button className="btnLogin" onClick={this.handleLogin}>로그인</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminLoginModal);