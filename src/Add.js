import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from "react-router-dom";

// import {fetchLogin} from './store'

class Add extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            username: '',
            email: '',
            text:''
        }

    }

    handleSubmit(event) {
        alert('Отправленное имя: ' + this.state.username);
        alert('Отправленное имя: ' + this.state.password);
        event.preventDefault();
    }


    handleChange(field) {
        return event =>{
            const t = {};
            t[field] =  event.target.value;
            this.setState(t);
        }
    }


    render() {
        return (
            <form className="login" onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input type="text" required value={this.state.username} onChange={this.handleChange('username')}/>
                </label>
                <label>
                    Email:
                    <input type="email" required value={this.state.email} onChange={this.handleChange('email')}/>
                </label>
                <label>
                    Text:
                    <input type="text" required value={this.state.text} onChange={this.handleChange('text')}/>
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
        // fetchLogin: (page, field, direction) => dispatch(fetchLogin(page, field, direction)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Add))
