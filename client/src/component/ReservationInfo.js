import axios from "axios"; //axios 초기 설정 필요
import React, { Component } from "react"; 

class ReservationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo : [        
        {hotelName: "나만의풍경펜션"},
        {hotelName: "나만의풍경펜션"},
        {hotelName: "나만의풍경펜션"}
      ]
    };
  }
  
  componentDidMount() {
    axios.get('http://localhost:4000/mypage/reserveinfo', 
    {headers: { Authorization : `token ${this.props.accessToken}`} })
    .then(res => {
      this.setState({
        userInfo : res
      })
    })
    .catch(err => console.log(err))
  }

  render() {
      const { userInfo } = this.state;
      //const {  } = this.props;

      return (
        <div className='reservationInfoContainer'>
          <div>예약 내역</div>
          {userInfo.map(ele => {
            return(
            <>
              <div>숙소명 : {ele.hotelName}</div>
              {/* <div>체크인 : {ele.checkdIn}</div>
              <div>체크아웃 : {ele.checkdOut}</div>
              <div>인원수 : {ele.adult + ele.child}</div>
              <div>예약 날짜 : {ele.reservedTime}</div> */}
            </>
          )})}
        </div>
      )
  }

}
export default ReservationInfo;

