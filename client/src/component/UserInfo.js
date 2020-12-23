//import axios from "axios"; //axios 초기 설정 필요
import React, { Component } from "react"; 

import DeleteAccountModal from "./DeleteAccountModal";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteAccountModalOpen: false
    };

  this.openDeleteAccountModal = this.openDeleteAccountModal.bind(this);  
  this.closeDeleteAccountModal = this.closeDeleteAccountModal.bind(this);
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


  render() {
      //const {  } = this.state;

      return (
        <div className='userInfoContainer'>
          <div className='userInfo'>
            <div>회원정보</div>
            <div className='userName'>이름 : {this.props.userInfo.username}</div>
            <div className='email'>이메일 : {this.props.userInfo.email}</div>
            <div className='mobile'>전화번호 : {this.props.userInfo.mobile}</div>
          </div>
          <button className='deleteAccount' onClick={this.openDeleteAccountModal}>탈퇴하기</button>
          <DeleteAccountModal 
            isOpen={this.state.isDeleteAccountModalOpen} 
            close={this.closeDeleteAccountModal} 
            logoutHandler={this.props.logoutHandler}>
          </DeleteAccountModal>
        </div>
      )
  }


}

export default UserInfo;
