import React, { Component } from "react"; 

//import Nav from "./Nav";
//import Sitemap from "./Sitemap";
import UserInfo from "./UserInfo";
import ReservationInfo from "./ReservationInfo";

import './Mypage.css'

class Mypage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoDetail: 'user',
    };

    this.reservationInfoChange = this.reservationInfoChange.bind(this);
    this.userInfoChange = this.userInfoChange.bind(this);
  }

  reservationInfoChange() {
    this.setState({
      infoDetail: 'reservation'
    })
  }

  userInfoChange() {
    this.setState({
      infoDetail: 'user'
    })
  }

  render() {
      const { infoDetail } = this.state;

      return (
        <div className='mypageContainer'>
          {/* <Nav></Nav> */}
          <div className='infoContainer'>
            <button className='btnUserInfo' onClick={this.userInfoChange}>
              회원정보
            </button>
            <button className='btnReservationInfo' onClick={this.reservationInfoChange}>
              예약내역
            </button>
            { 
              infoDetail === 'user' ? 
              <UserInfo userInfo={this.props.userInfo} logoutHandler={this.props.logoutHandler}></UserInfo> : //로그인 시 받은 userInfo props 전달 필요
              <ReservationInfo userInfo={this.props.userInfo}></ReservationInfo> //로그인 시 받은 userInfo props 전달 필요
            }
          </div>
          {/* <Sitemap></Sitemap>  */}
        </div>
      )
  }


}

export default Mypage;
