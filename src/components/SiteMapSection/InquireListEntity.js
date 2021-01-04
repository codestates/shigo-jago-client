import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class InquireListEntry extends Component {
    constructor(props) {
        super(props);

    }
    render() {

        return (
            <div className='RLEctn'>
                <div className='RLEctnDetail'>
                    <div className='RLEtitle'>이름</div><div className='RLEcontent'>{ele.hotelName}</div>
                    <div className='RLEtitle'>이메일</div><div className='RLEcontent'>{ele.checkedin}</div>
                    <div className='RLEtitle'>주제</div><div className='RLEcontent'>{ele.checkedout}</div>
                </div>
                <div className='abrqqq'>
                    메시지
                <textarea cols="50" row="50" />
                </div>
            </div>
        )
    }
}

export default withRouter(InquireListEntry);
