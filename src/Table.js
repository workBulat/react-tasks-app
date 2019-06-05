import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchNPageTasks, setCurrentPage, setCurrentSort, setCurrentSortDirection} from './store'

class Table extends Component {


    constructor(props) {
        super(props);
        this.props.getNPageTasks();
        this.sortBy = this.sortBy.bind(this);
        this.getPagesList = this.getPagesList.bind(this);
    }

    getPagesList(n) {
        if (this.props.totalTaskCount)
            return [...Array(Math.ceil(this.props.totalTaskCount / 3)).keys()].map(i => i + 1)
        else
            return []
    }

    sortBy(field) {
        return e => {
            const params = {
                currentPage: this.props.currentPage,
                currentSort: this.props.currentSort,
                correntSortDirection: this.props.currentSortDirection
            }
            if (field === this.props.currentSort) {
                params.currentSortDirection = this.props.currentSortDirection === 'asc' ? 'desc' : 'asc'
                this.props.setCurrentSortDirection(params.currentSortDirection);
            } else {
                params.currentSort = field;
                params.currentSortDirection = 'asc';
                this.props.setCurrentSort(params.currentSort);
                this.props.setCurrentSortDirection(params.currentSortDirection);
            }
            this.props.setCurrentSort(field);
            this.props.getNPageTasks(params.currentPage, params.currentSort, params.currentSortDirection);
        }

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
                <p>{this.props.currentPage}</p>
                <p>{this.props.currentSort}</p>
                <p>{this.props.currentSortDirection}</p>
                <table className="tasks-table">
                    <tr>
                        <th>ID</th>
                        <th onClick={this.sortBy('username')} className='sort'>Имя пользователя</th>
                        <th onClick={this.sortBy('email')} className='sort'>email</th>
                        <th>Тест задачи</th>
                        <th onClick={this.sortBy('status')} className='sort'>Статус</th>

                    </tr>
                    {this.props.tasks &&
                    this.props.tasks.map(task => {
                        return <tr>
                            <td>{task.id}</td>
                            <td>{task.username}</td>
                            <td>{task.email}</td>
                            <td>{task.text}</td>
                            <td>{task.status ? 'Выполнена' : 'Не выполнена'}</td>
                        </tr>
                    })}


                </table>

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

export default connect(mapStateToProps, mapDispatchToProps)(Table)
