import axios from 'axios';
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './GetHelp.css';
class GetHelp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            subject: "",
            message: "",
        }
        this.handleInputValue = this.handleInputValue.bind(this)
        this.wirteInquire = this.wirteInquire.bind(this)
    }

    handleInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    }

    wirteInquire = async () => {
        const { email, name, subject, message } = this.state
        const { accessToken } = this.props
        console.log(this.state)
        try {

            const writeInfo = await axios.post('http://localhost:4000/mypage/writeinquire', {
                email: email,
                name: name,
                subject: subject,
                message: message
            }, { headers: { "Authorization": `Bearer ${accessToken}` } })
            console.log(writeInfo)
            if (writeInfo.status === 201) {
                alert('문의가 등록되었습니다')
                this.props.history.push('/')
            }

        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div className="sg-main">
                <div className="sg-content">
                    <h1>저희는 고객님의 의견을 환영합니다</h1>
                    <div className="sg-main__scarcity">
                        <span>자주 묻는 질문(FAQ)에서 고객님께 필요한 답변을 찾으시면 시간을 절약하실 수 있습니다.</span>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}  >

                        <div className="helpEmail">
                            <label htmlFor="helpEmail">이메일 주소</label>
                            <br></br>

                            <input
                                type="email"
                                name="helpEmail"
                                placeholder="e-mail 주소를 입력해주세요"
                                onChange={this.handleInputValue("email")}
                            ></input>

                        </div>
                        <div className="helpnName">
                            <label htmlFor="helpnName">이름</label>
                            <br></br>
                            <input
                                type="text"
                                name="helpnName"
                                placeholder="이름을 입력해주세요"
                                onChange={this.handleInputValue("name")}
                            ></input>
                        </div>
                        <div className="helpTopic">
                            <label htmlFor="helpTopic">주제</label>
                            <select className="search__input" type='text'
                                name="helpTopic"
                                onChange={this.handleInputValue("subject")}
                            >
                                <option>일반적인 내용</option>
                                <option>부정확한 가격 정보를 발견했습니다.</option>
                                <option>내 데이터 삭제</option>
                                <option>환불관련</option>
                                <option>변경 및 취소</option>
                                <option>결제 및 영수증</option>
                            </select>

                        </div>
                        <div className="helpMessage">
                            <label htmlFor="helpMessage">메시지</label>
                            <br></br>
                            <textarea id="message" name="helpMessage" rows="8" cols="80"
                                onChange={this.handleInputValue("message")} placeholder="메시지를 적어주세요">
                            </textarea>
                        </div>

                        <button
                            className="GetHelp"
                            onClick={this.wirteInquire}
                        >
                            피드백 제출
                                </button>
                    </form>

                </div>
            </div>

        )
    }
}

export default withRouter(GetHelp); 