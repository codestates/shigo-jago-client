import React from "react";
import './index.css';
import { withRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Mainpage from './components/Mainpage/Mainpage';
import Mypage from './components/Mypage/Mypage';
import Sitemap from "./components/Sitemap";
import Nav from "./components/Nav";
import SignUpModal from "./components/SignUpModal";
import About from "./components/SiteMapSection/About";
import GetHelp from "./components/SiteMapSection/GetHelp";
import Hire from "./components/SiteMapSection/Hire";
import Refund from "./components/SiteMapSection/Refund";
import Payment from "./components/Payment/Payment";



require('dotenv').config();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      accessToken: '',
      kakaoUserData: null,
      googleUserData: null
    }
    this.logoutHandler = this.logoutHandler.bind(this)
    this.logoutHandlerSimple = this.logoutHandlerSimple.bind(this)
    this.loginHandler = this.loginHandler.bind(this)
    this.kakaoToken = this.kakaoToken.bind(this)
    this.googleToken = this.googleToken.bind(this)
    this.tokenLoadLocal = this.tokenLoadLocal.bind(this)
    this.deleteKakao = this.deleteKakao.bind(this)
    this.deleteGoogle = this.deleteGoogle.bind(this)
  }

  async googleToken(token, pathname) {
    const newthis = this
    fetch("https://www.googleapis.com/oauth2/v3/userinfo?alt=json", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }) // They said that that was the the correct answer
      .then(res => res.json())
      .then(async obj => {
        newthis.setState({
          googleUserData: obj
        })
        if (pathname === "/google/auth") {
          await axios.post(`${process.env.REACT_APP_URL}/user/google`, {
            socialEmail: obj.email,
            socialAccount: obj.sub,
            token: newthis.state.accessToken
          })
            .then(res => {
              newthis.loginHandler(res.data.data.accessToken)
              window.open('/mypage', '_self')
            })
        }
        else {
          const login = await axios.post(`${process.env.REACT_APP_URL}/user/google`, {
            socialEmail: obj.email,
            socialAccount: obj.sub
          })
          if (login.data.message === "ok") {
            newthis.loginHandler(login.data.data.accessToken)
            newthis.props.history.push('/')
          }
          else newthis.props.history.push('/user/signup')
        }

      })
  }


  async kakaoToken(token, pathname) {
    const newthis = this

    window.Kakao.Auth.setAccessToken(token)
    window.Kakao.API.request({
      url: '/v2/user/me',
      data: {
        property_keys: [
          'properties.nickname',
          'kakao_account.email',
        ],
      },
      success: function (response) {
        newthis.setState({
          kakaoUserData: response
        })
        if (pathname === '/kakao') {
          axios.post(`${process.env.REACT_APP_URL}/user/kakao`, {
            socialEmail: response.kakao_account.email,
            socialAccount: response.id,
            token: newthis.state.accessToken
          })
            .then(res => {
              newthis.loginHandler(res.data.data.accessToken)
              window.open('/mypage', '_self')
            })
        }
        else {
          axios.post(`${process.env.REACT_APP_URL}/user/kakao`, {
            socialEmail: response.kakao_account.email,
            socialAccount: response.id,
            token: null
          })
            .then(res => {
              if (res.data.message === "ok") {
                newthis.loginHandler(res.data.data.accessToken)
                window.open('/', '_self')
              }
              else {
                newthis.props.history.push('/user/signup')
              }
            })
        }

      },
      fail: function (error) {
      }
    })
  }

  async tokenLoadLocal() {
    axios.defaults.withCredentials = true
    const load = JSON.parse(sessionStorage.getItem("accessToken"))
    try { 
    if(load) {
      const login = await axios.get(`${process.env.REACT_APP_URL}/mypage/userInfo`,{
        headers: {
          "Authorization": `Bearer ${load}`
        },
      })
      if (login.data.message === "ok") {
        this.setState({
          isLogin: true,
          accessToken: load
        })
      }
    }
  }
    catch(err) {
      if(err.response) {
        if(err.response.status === 401) {
        alert('토큰이 만료됐습니다. \n 다시 로그인 해주세요')
        sessionStorage.clear()      
        }  
      }
    }
  }

  deleteKakao() {
    fetch(`${process.env.REACT_APP_URL}/social/kakao/revoke`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${this.state.accessToken}`
      }
    })
  }

  deleteGoogle() {
    fetch(`${process.env.REACT_APP_URL}/social/google/revoke`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${this.state.accessToken}`
      }
    })
  }

  loginHandler(data) {
    sessionStorage.setItem("accessToken", JSON.stringify(data))
    this.setState({
      isLogin: true,
      accessToken: data
    })
  }

  logoutHandlerSimple() {
    sessionStorage.clear()
    this.setState({
      isLogin: false,
      accessToken: null
    })
  }

  logoutHandler() {
    sessionStorage.clear()
    const { accessToken } = this.props;
    axios.post(`${process.env.REACT_APP_URL}/user/logout`, {},
      { headers: { "Authorization": `Bearer ${accessToken}` } })
      .then((res) => {
        this.setState({
          isLogin: false,
          accessToken: null
        })
      })
      .then(() => {
        this.props.history.push('/');
      })
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JSKEY)
    }
    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout(() => {
      })
    }

  }

  async componentDidMount() {
    this.tokenLoadLocal()

    const url = new URL(window.location.href)
    const authorizationCode = url.searchParams.get('code')

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JSKEY)
    }
    if (authorizationCode && url.pathname === "/kakao") {
      const userInfo = await axios.get(`${process.env.REACT_APP_URL}/mypage/userinfo`, {
        headers: {
          "Authorization": `Bearer ${this.state.accessToken}`
        }
      })
    }
    window.onpageshow = function(event) {
      if ( event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        window.location.replace("/")
      }
    }
  }

  render() {
    const { isLogin, accessToken, kakaoUserData, googleUserData, isAdmin } = this.state;

    return (
      <div className="container">
        <Nav
          isLogin={isLogin}
          loginHandler={this.loginHandler}
          logoutHandler={this.logoutHandler}
          kakaoToken={this.kakaoToken}
          googleToken={this.googleToken}
          deleteKakao={this.deleteKakao}
          deleteGoogle={this.deleteGoogle}
        />
        <Switch>
          <Route path='/user/signup' render={() => <SignUpModal isLogin={isLogin} kakaoUserData={kakaoUserData} googleUserData={googleUserData} />} />
          <Route path="/about" render={() => <About />} />
          <Route path="/gethelp" render={() => <GetHelp isLogin={isLogin} isAdmin={isAdmin} accessToken={accessToken} />} />
          <Route path="/hire" render={() => <Hire />} />
          <Route path="/refund" render={() => <Refund />} />
          
          <Route
            path='/payment'
            render={(obj) => (
              <Payment
                isLogin={isLogin}
                location={obj.location}
                accessToken={accessToken} />
            )} />
          <Route
            path='/mypage'
            render={() => (
              <Mypage
                isLogin={isLogin}
                accessToken={accessToken}
                logoutHandlerSimple={this.logoutHandlerSimple} />
            )} />
          <Route
            path='/'
            render={() => (
              <Mainpage
                accessToken={accessToken}
                loginHandler={this.loginHandler} />
            )} />
        </Switch>   
        <Sitemap />
      </div>
    );
  };
}


export default withRouter(App);
