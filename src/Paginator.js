import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchNPageTasks, setCurrentPage, setCurrentSort, setCurrentSortDirection} from './store'

class Paginator extends Component {


    constructor(props) {
        super(props);
        this.getPagesList = this.getPagesList.bind(this);
    }

    getPagesList(n) {
        if (this.props.totalTaskCount)
            return [...Array(Math.ceil(this.props.totalTaskCount / 3)).keys()].map(i => i + 1)
        else
            return []
    }

    setPage(page) {
        return e => {
            this.props.setCurrentPage(page);
            this.props.getNPageTasks(page, this.props.currentSort, this.props.currentSortDirection);
        }

    }

    render() {
        return (
            <div>
                <div className='paginator'>
                    {this.getPagesList().map(p => {
                        return (
                            <button onClick={this.setPage(p)} className={this.props.currentPage===p?'active':''}> {p} </button>
                        )
                    })
                    }
                </div>
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
        getNPageTasks: (page, field, direction) => dispatch(fetchNPageTasks(page, field, direction)),
        setCurrentPage: n => dispatch(setCurrentPage(n)),
        setCurrentSort: field => dispatch(setCurrentSort(field)),
        setCurrentSortDirection: direction => dispatch(setCurrentSortDirection(direction)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Paginator)
