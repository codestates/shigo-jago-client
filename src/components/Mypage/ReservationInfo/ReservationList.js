import axios from "axios"; //axios 초기 설정 필요
import React, { Component } from "react"; 
import ReservationListEntry from "./ReservationListEntry";

class ReservationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo : [],

    };
  }
  
  componentDidMount() {
    const { accessToken } = this.props

    axios.get('http://localhost:4000/mypage/reserveinfo', 
    { headers: { "Authorization" : `Bearer ${accessToken}`} })
    .then(res => { this.setState({ userInfo : res.data.data }) })
    .catch(err => console.log(err))
  }

  render() {
      const { userInfo } = this.state;
      const { accessToken } = this.props;

      return (
        <div className='reservationInfoContainer'>
          <div>예약 내역</div>
          {userInfo.map((ele, idx) => {
            return(
              <ReservationListEntry key={idx} ele={ele} accessToken={accessToken} ></ReservationListEntry>
          )})}
        </div>
      )
  }

}
export default ReservationList;
