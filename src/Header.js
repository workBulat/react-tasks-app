import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

class Header extends Component {


    render() {
        return (
            <div>
                <h1><Link to='/'>Задачи</Link></h1>
                <p><Link to='/login'>Войти</Link></p>
            </div>

        );
    }
}

export default Header
