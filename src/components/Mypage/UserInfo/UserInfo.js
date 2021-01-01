import axios from "axios";
import React, { Component } from "react"; 
import { withRouter } from "react-router-dom";
import "./userInfo.css";

import DeleteUserModal from "./DeleteUserModal";
import DeleteKakao from './DeleteKakaoModal'

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteAccountModalOpen: false,
      isDeleteKakaoAccount: false,
      isGoogle: false,
      isKakao: false,
    };

  this.openDeleteAccountModal = this.openDeleteAccountModal.bind(this)
  this.closeDeleteAccountModal = this.closeDeleteAccountModal.bind(this)
  this.openDeleteKakaoModal = this.openDeleteKakaoModal.bind(this)
  this.closeDeleteKakaoModal = this.closeDeleteKakaoModal.bind(this)
  this.goToEditUserInfo = this.goToEditUserInfo.bind(this);
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
    
    axios.get('http://localhost:4000/mypage/userinfo', {
      headers: {"Authorization": `Bearer ${accessToken}`}
    })
    .then(res => { 
      if(res.data.data.Social) {
        res.data.data.Social.map((ele) => {
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
    .catch(err => console.log(err))
  }

  render() {
      const { userInfo, logoutHandlerSimple, accessToken } = this.props;
      const { isDeleteAccountModalOpen, isDeleteKakaoAccount, isGoogle, isKakao } = this.state;       

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
                  <div className='userInfoCTtitle'>{ele.corporation}</div>
                  <div className='userInfoCT'>{ele.socialEmail}</div>
                  </div>) })}
          </div>
          <div className='btnUInfoCtn'> 
          <button className='btnUInfo' onClick={this.goToEditUserInfo}>회원 정보 수정</button>
          { isKakao ? 
          <button className='btnUInfo' onClick={this.openDeleteKakaoModal}>카카오 계정 연결 해제</button> :
          <button className='btnUInfo'>카카오 계정 연동하기</button>
          }
          { isGoogle ? 
          <button className='btnUInfo'>구글 계정 연결 해제</button> :
          <button className='btnUInfo'>구글 계정 연동하기</button>
          } 
          { isDeleteKakaoAccount && 
          <DeleteKakao 
            isOpen={isDeleteKakaoAccount}
            close={this.closeDeleteKakaoModal} />}
          <button className='btnUInfo' onClick={this.openDeleteAccountModal}>탈퇴하기</button>
          { isDeleteAccountModalOpen && 
          <DeleteUserModal 
            close={this.closeDeleteAccountModal} 
            logoutHandlerSimple={logoutHandlerSimple}
            accessToken={accessToken} />}
          </div>
        </div>
      )
  }
}

export default withRouter(UserInfo);
