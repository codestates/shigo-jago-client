import axios from "axios";
import React, { Component } from "react"; 
import { withRouter } from "react-router-dom";
import "./userInfo.css";
import google from '../../../images/google.png'
import kakao from '../../../images/kakao.png'

import DeleteUserModal from "./DeleteUserModal";
import DeleteKakao from './DeleteKakaoModal'
import DeleteGoogle from './DeleteGoogleModal'
import AuthKakao from './AuthKakaoModal'
import AuthGoogle from './AuthGoogleModal'

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteAccountModalOpen: false,
      isDeleteKakaoAccount: false,
      isDeleteGoogleAccount: false,
      isGoogle: false,
      isKakao: false,
      isAuthKaKao: false,
      isAuthGoogle: false
    }
    this.openDeleteAccountModal = this.openDeleteAccountModal.bind(this)
    this.closeDeleteAccountModal = this.closeDeleteAccountModal.bind(this)
    this.openDeleteKakaoModal = this.openDeleteKakaoModal.bind(this)
    this.closeDeleteKakaoModal = this.closeDeleteKakaoModal.bind(this)
    this.openDeleteGoogleModal = this.openDeleteGoogleModal.bind(this)
    this.closeDeleteGoogleModal = this.closeDeleteGoogleModal.bind(this)
    this.openAuthGoogleModal = this.openAuthGoogleModal.bind(this)
    this.closeAuthGoogleModal = this.closeAuthGoogleModal.bind(this)
    this.openAuthKakaoModal = this.openAuthKakaoModal.bind(this)
    this.closeAuthKakaoModal = this.closeAuthKakaoModal.bind(this)
    this.goToEditUserInfo = this.goToEditUserInfo.bind(this)
  }

  openAuthGoogleModal() {
    this.setState({
      isAuthGoogle: true
    })
  }

  closeAuthGoogleModal() {
    this.setState({
      isAuthGoogle: false
    })
  }

  openAuthKakaoModal() {
    this.setState({
      isAuthKaKao: true
    })
  }

  closeAuthKakaoModal() {
    this.setState({
      isAuthKaKao: false
    })
  }

  openDeleteAccountModal() {
    this.setState({
      isDeleteAccountModalOpen: true
    })
  }

  closeDeleteAccountModal() {
    this.setState({
      isDeleteAccountModalOpen: false
    })
  }

  openDeleteKakaoModal() {
    this.setState({
      isDeleteKakaoAccount: true
    })
  }

  closeDeleteKakaoModal() {
    this.setState({
      isDeleteKakaoAccount: false
    })
  }

  openDeleteGoogleModal() {
    this.setState({
      isDeleteGoogleAccount: true
    })
  }

  closeDeleteGoogleModal() {
    this.setState({
      isDeleteGoogleAccount: false
    })
  }

  goToEditUserInfo() {
    this.props.history.push('/mypage/useredit');
  }
  
  buttonUpKaKao() {
    this.setState({isKakao: true})
  }

  buttonUpGoogle() {
    this.setState({isGoogle: true})
  }

  componentDidMount() {
    const { accessToken, userInfoHandler } = this.props;
    
    axios.get(`${process.env.REACT_APP_URL}/mypage/userinfo`, {
      headers: {"Authorization": `Bearer ${accessToken}`}
    })
    .then(res => { 
      if(res.data.data.Social) {
        res.data.data.Social.forEach(ele => {
          if(ele.corporation ==='kakao') {
            this.buttonUpKaKao()
          }
          if(ele.corporation ==='google') {
            this.buttonUpGoogle()
          }
        })
      }
      userInfoHandler(res.data.data) 
    })
    .catch(err => err)
  }

  render() {
      const { userInfo, logoutHandlerSimple, accessToken } = this.props;
      const { isDeleteAccountModalOpen, isDeleteKakaoAccount, isDeleteGoogleAccount, isGoogle, isKakao, isAuthGoogle, isAuthKaKao } = this.state;       

      return (
        <div className='userInfoContainer'>
          <div className='userInfo'>
            <div className='userInfoCTtitle'>이름</div>
            <div className='userInfoCT'>{userInfo.name}</div>
            <div className='userInfoCTtitle'>이메일</div>
            <div className='userInfoCT'>{userInfo.loginId}</div>
            <div className='userInfoCTtitle'>전화번호</div>
            <div className='userInfoCT'>{userInfo.mobile}</div>
            <div className='userInfoCTtitle'>소셜 연결 계정</div>
            { userInfo.social && 
              userInfo.social.map((ele,idx) => {
                return (
                  <div key={idx}>
                  <div className='userInfoCTsocial'>{ele.corporation}</div>
                  <div className='userInfoCT'>{ele.socialEmail}</div>
                  </div>) })}
          </div>
          <div className='btnUInfoCtn'> 
          <button className='btnUInfo' onClick={this.goToEditUserInfo}>회원 정보 수정</button>
          
          { isKakao ? 
          <div className="kakaobtn" onClick={this.openDeleteKakaoModal}>
          <img className="kakaoLogo" src={kakao} alt='kakao' />
          <div className='kakaoUI' >연결 해제</div> 
          </div>  :
          <div className="kakaobtn" onClick={this.openAuthKakaoModal}>
          <img className="kakaoLogo" src={kakao} alt='kakao' />
          <div className='kakaoUI'>계정 연동</div>
          </div>
          }
          { isGoogle ? 
          <div className="googlebtn" onClick={this.openDeleteGoogleModal}>
          <img className="googleLogo" src={google} alt='google' />
          <div className='googleUI' >연결 해제</div>
          </div> :
          <div className="googlebtn" onClick={this.openAuthGoogleModal}>
          <img className="googleLogoUI" src={google} alt='google' />
          <div className='googleUI'>계정 연동</div>
          </div>
          }
          { isAuthGoogle &&
          <AuthGoogle
            isOpen={isAuthGoogle}
            close={this.closeAuthGoogleModal} />}
          { isAuthKaKao && 
          <AuthKakao
            isOpen={isAuthKaKao}
            close={this.closeAuthKakaoModal}
            userInfo={userInfo} />}
          { isDeleteGoogleAccount &&
          <DeleteGoogle 
            isOpen={isDeleteGoogleAccount}
            close={this.closeDeleteGoogleModal} />}
          { isDeleteKakaoAccount && 
          <DeleteKakao 
            isOpen={isDeleteKakaoAccount}
            close={this.closeDeleteKakaoModal} />}
          { isDeleteAccountModalOpen && 
          <DeleteUserModal 
            close={this.closeDeleteAccountModal} 
            logoutHandlerSimple={logoutHandlerSimple}
            accessToken={accessToken} />}
            <button className='btnUInfo' onClick={this.openDeleteAccountModal}>탈퇴 하기</button>
          </div>
        </div>
      )
  }
}

export default withRouter(UserInfo);
