import React, {Component} from 'react'
import {connect} from 'react-redux'
import Table from './Table';
import {fetchNPageTasks} from './store'
import Paginator from "./Paginator";

class App extends Component {


    constructor (props) {
        super(props);
        this.props.getNPageTasks();
    }
    render() {
        return (
            <div className="app">
                    <Table/>
                    <Paginator />
            </div>
        );
    }


}

const mapStateToProps = store => {
    console.log('storeApp', store)
    return store
}


const mapDispatchToProps = (dispatch) => {
    return {
        getNPageTasks: () => dispatch(fetchNPageTasks()),
    }
};


// export default withRouter(connect(mapStateToProps)(App))
export default connect(mapStateToProps, mapDispatchToProps)(App)
