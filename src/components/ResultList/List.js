import React, { Component } from "react"; 
import axios from "axios";

import Listentry from "./Listentry"
import ListMap from "./ListMap"

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [], 
      price: {
        adult: [20000, 23000, 30000, 31000, 38000, 40000],
        child: [8000, 10000, 12000]
      }
    };
    this.getPrice = this.getPrice.bind(this);
    this.numberWithCommas = this.numberWithCommas.bind(this);
    this.toDate = this.toDate.bind(this);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  toDate(str) {
    const year = str.substr(0,4);
    const month = str.substr(5,2);
    const date = str.substr(8,10);

    return new Date(Number(year), Number(month), Number(date));
  }

  getPrice() {
    const reservation = JSON.parse(localStorage.getItem("reservation"));
    const { adult, child, checkIn, checkOut } = reservation
    const { price } = this.state
    
    return (adult * price.adult[Math.floor(Math.random() * price.adult.length)] + 
     child * price.child[Math.floor(Math.random() * price.child.length)]) *
    ((this.toDate(checkOut) - this.toDate(checkIn)) / 86400000) //숙박일수 계산
  }

  async componentDidMount() {

    try{
      const reservation = JSON.parse(localStorage.getItem("reservation"));
      
      const hotelList = await axios.post(`${process.env.REACT_APP_URL}/search/list`, {
        areacode: reservation.areacode,
        sigungucode: reservation.sigungucode
      },{
        timeout: 5000
        })
    
      await hotelList.data.data.map((ele) => (
        ele.price = this.getPrice()
      ))

      await hotelList.data.data.forEach(ele => {
        if(!ele.image1) {
          ele.image1 = 'http://image.pensionlife.co.kr/penimg/pen_1/pen_19/1977/9734f7418fcc01a2321ba800b1f2c7ee.jpg'      
        }
      })

      const newData = await hotelList.data.data.filter((ele) => (
        (ele.title === "고추잠자리" || ele.title === "꼬뜨도르 호텔" || ele.title === "나이스호텔" || ele.title === "더럭펜션") ? false : true
      ))
      
      this.setState({
        list: newData
      })
    }
    
    catch (err) {
      alert(err)
      window.open('/', '_self')
    }
  }
  
  render() {
    const { list } = this.state
    const localReservation = JSON.parse(localStorage.getItem("reservation"));
    const { checkIn, checkOut } = localReservation
    
    const date = (this.toDate(checkOut) - this.toDate(checkIn)) / 86400000;

    return (
      <>
      {list.map((ele, idx) => (
        <Listentry list={ele} reservation={localReservation} key={idx} date={date} />
      ))}
      {list.length > 0 && <ListMap list={list} />}
      </>
    )
  }


}

export default List;
