import axios from "axios"; //axios 초기 설정 필요
import React, { Component } from "react"; 

class WriteReviewlModal extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      message: null
    };

    this.handleInputValue = this.handleInputValue.bind(this);
    this.writeReview = this.writeReview.bind(this)
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key] : e.target.value })
  }

  writeReview() {
    const { accessToken, reservationid } = this.props;
    const { title, description } = this.state;

    axios.post('http://localhost:4000/mypage/writereview',
    { title: title,
      description: description,
      reservationId: reservationid },
    { headers: {"Authorization": `Bearer ${accessToken}`}})
    .then(this.setState({message: '성공적으로 작성되었습니다!'}))
  }
  //to-do : 제목, 후기 작성안됐을때, 후기 인풋 키우기 

  render() {
  const { close } = this.props;
  const { message } = this.state;
  
  return (
    <div className="modal1">
      <div className="loginModal">
        <span className="btnClose" onClick={close}>&times;</span>
          {message ?
          <> 
          <div>{message}</div>
          <button onClick={close}>확인</button>
          </> :
          <>
          <input
            className="title"
            type="text"
            placeholder="리뷰 제목을 작성해주세요."
            style={{
              width:400,
              height:40
            }}
            onChange={this.handleInputValue("title")} />
          <div>
          <textarea
            className="description"
            type="textarea"
            placeholder="숙박 후기를 남겨주세요!"
            style={{
              width:400,
              height:200
            }}
            onChange={this.handleInputValue("description")} />
          </div>
          <button onClick={this.writeReview}>업로드</button> 
          </> }
      </div>
    </div>
    )
  }
}
export default WriteReviewlModal;

