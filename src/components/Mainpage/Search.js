import React, { Component } from 'react';
import './Search.css';
import { Link } from "react-router-dom";
//import ResultList from '../ResultList/ResultList';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areacode: "",
            sigungucode: "",
            checkIn: "",
            checkOut: "",
            adult: 0,
            child: 0
        };

        this.searchInputValue = this.searchInputValue.bind(this);

    }
    searchInputValue = (key) => (e) => {
        this.setState({ [key]: e.target.value });
    };

    render() {

        return (
            <div className="section">
                <div className="search__box">
                    <div className="search__title">
                        코로나 시국에도 편안하고<br />안전한 숙소를 예약하세요.
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="search__sub__title">시</td>
                                    <td className="search__sub__title">구</td>
                                </tr>
                                <tr>
                                    <td><input className="search__input" type="text" placeholder=" 시 "
                                        onChange={this.searchInputValue("areacode")} /></td>
                                    <td><input className="search__input" type="text" placeholder=" 구 "
                                        onChange={this.searchInputValue("sigungucode")} /></td>
                                </tr>
                                <tr>
                                    <td className="search__sub__title">체크인</td>
                                    <td className="search__sub__title">체크아웃</td>
                                </tr>
                                <tr>
                                    <td><input className="search__input" type="date"
                                        onChange={this.searchInputValue("checkIn")} /></td>
                                    <td><input className="search__input" type="date"
                                        onChange={this.searchInputValue("checkOut")} /></td>
                                </tr>
                                <tr>
                                    <td className="search__sub__title">성인</td>
                                    <td className="search__sub__title">아동</td>
                                </tr>
                                <tr>
                                    <td>
                                        <select className="search__input" onChange={this.searchInputValue("adult")}>
                                            <option>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select className="search__input" onChange={this.searchInputValue("child")}>
                                            <option>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="search__button">
                            <Link to='/resultlist'>검색</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Search