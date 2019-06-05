import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";
import {fetchUserToken} from './store'

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            username: '',
            password: ''
        }

    }

    handleSubmit(event) {
        event.preventDefault();
        alert('Отправленное имя: ' + this.state.username);
        alert('Отправленное имя: ' + this.state.password);
        this.props.fetchUserToken(this.state.username, this.state.password);
    }


    handleChange(field) {
        return event => {
            const t = {};
            t[field] = event.target.value;
            this.setState(t);
        }
    }


    render() {
        return (
            <form className="login" onSubmit={this.handleSubmit}>
                <label>
                    Login:
                    <input type="text" required value={this.state.username} onChange={this.handleChange('username')}/>
                </label>
                <label>
                    Password:
                    <input type="password" required value={this.state.password}
                           onChange={this.handleChange('password')}/>
                </label>
                <input type="submit" value="Войти"/>
            </form>

        );
    }
}

const mapStateToProps = store => {
    console.log('storeApp', store)
    return store
}


const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserToken: (username, password) => dispatch(fetchUserToken(username, password)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
