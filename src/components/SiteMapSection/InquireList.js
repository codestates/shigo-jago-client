import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import InquireListEntry from "./InquireListEntry";


class InquireList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inquireInfo: [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/mypage/inquireInfo',
            { headers: { "Authorization": `Bearer ${accessToken}` } })
            .then(res => { this.setState({ inquireInfo: res.data.data }) })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                {
                    () => {
                        < InquireListEntry />
                    }
                }
            </div>
        )
    }
}

export default withRouter(InquireList);
