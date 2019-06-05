const queryString = require('query-string');

const baseURL = 'https://uxcandy.com/~shapoval/test-task-backend/v2';
const developer = 'Name';

const FETCH_N_PAGE_TASKS_SUCCESS = 'FETCH_N_PAGE_TASKS_SUCCESS';
const FETCH_N_PAGE_TASKS_ERROR = 'FETCH_N_PAGE_TASKS_ERROR';

const FETCH_USER_TOKEN_SUCCESS = 'FETCH_USER_TOKEN_SUCCESS';
const FETCH_USER_TOKEN_ERROR = 'FETCH_USER_TOKEN_ERROR';

const FETCH_EDIT_SUCCESS = 'FETCH_EDIT_SUCCESS';
const FETCH_EDIT_ERROR = 'FETCH_EDIT_ERROR';


const SET_CURRENT_SORT = "SET_CURRENT_SORT";
const SET_CURRENT_SORT_DIRECTION = "SET_CURRENT_SORT_DIRECTION";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

//actions

// export const fetchNPageTasks = n => {
//     return (dispatch, getState) => {
//         return dispatch(fetchNPageTasksAsync(n));
//     }
// };


export function fetchNPageTasks(n = 1, sortField = 'id', sortDirection = 'asc') {
    return (dispatch,) => {
        console.log('feth', {
            page: n,
            developer: developer,
            sort_field: sortField,
            sort_direction: sortDirection
        })
        dispatch({type: FETCH_N_PAGE_TASKS_SUCCESS, payload: {f: 1}})
        fetch(baseURL + '/?' + queryString.stringify({
            page: n,
            developer: developer,
            sort_field: sortField,
            sort_direction: sortDirection
        }))
            .then(res => res.json()

                .then(data => {
                    console.log(data);
                    if (data.status === 'ok') {
                        console.log('ok');
                        dispatch({
                            type: FETCH_N_PAGE_TASKS_SUCCESS, payload: {
                                tasks: data.message.tasks,
                                totalTaskCount: data.message.total_task_count
                            }
                        })
                    } else {
                        console.log('error')
                        dispatch({type: FETCH_N_PAGE_TASKS_ERROR, errors: data.message})
                    }

                })
                .catch(errors => dispatch({type: FETCH_N_PAGE_TASKS_ERROR, errors: errors})))
    }
}


export function fetchUserToken(username, password) {
    return (dispatch,) => {
        const formdata = new FormData();
        formdata.append('username', username);
        formdata.append('password', password);

        fetch(baseURL + '/login?' + queryString.stringify({
            developer: developer,
        }), {

            method: "POST",
            body: formdata

        })
            .then(res => res.json()

                .then(data => {
                    console.log(data);
                    if (data.status === 'ok') {
                        console.log('ok');
                        dispatch({
                            type: FETCH_USER_TOKEN_SUCCESS, payload: {
                                token: data.message.token,
                            }
                        })
                    } else {
                        console.log('error');
                        dispatch({type: FETCH_USER_TOKEN_ERROR, errors: data.message})
                    }

                })
                .catch(errors => dispatch({type: FETCH_USER_TOKEN_ERROR, errors: errors})))
    }
}


export function fetchCreate(username, email, text) {
    return (dispatch,) => {
        const formdata = new FormData();
        formdata.append('username', username);
        formdata.append('email', email);
        formdata.append('text', text);

        fetch(baseURL + '/create?' + queryString.stringify({
            developer: developer,
        }), {

            method: "POST",
            body: formdata

        })
            .then(res => res.json()

                .then(data => {
                    console.log(data);
                    if (data.status === 'ok') {
                        console.log('ok');
                        dispatch({
                            type: FETCH_USER_TOKEN_SUCCESS, payload: {
                                token: data.message.token,
                            }
                        })
                    } else {
                        console.log('error');
                        dispatch({type: FETCH_USER_TOKEN_ERROR, errors: data.message})
                    }

                })
                .catch(errors => dispatch({type: FETCH_USER_TOKEN_ERROR, errors: errors})))
    }
}


export function fetchEdit(id, text, status) {
    return (dispatch,) => {
        const formdata = new FormData();
        formdata.append('text', text);
        formdata.append('status', status);

        fetch(baseURL + `/edit/${id}?` + queryString.stringify({
            developer: developer,
        }), {

            method: "POST",
            body: formdata

        })
            .then(res => res.json()

                .then(data => {
                    console.log(data);
                    if (data.status === 'ok') {
                        console.log('ok');
                        dispatch({
                            type: FETCH_EDIT_SUCCESS, payload: {
                                token: data.message.token,
                            }
                        })
                    } else {
                        console.log('error');
                        dispatch({type: FETCH_EDIT_ERROR, errors: data.message})
                    }

                })
                .catch(errors => dispatch({type: FETCH_EDIT_ERROR, errors: errors})))
    }
}


export function setCurrentSort(field = 'id') {
    return {type: SET_CURRENT_SORT, payload: field}
}

export function setCurrentSortDirection(direction = 'asc') {
    return {type: SET_CURRENT_SORT_DIRECTION, payload: direction}
}

export function setCurrentPage(field = 'id') {
    return {type: SET_CURRENT_PAGE, payload: field}
}


export function reducer(state = {
    tasks: [],
    totalTaskCount: 0,
    currentPage: 1,
    currentSort: 'id',
    currentSortDirection: 'asc',
}, action) {
    switch (action.type) {

        case FETCH_N_PAGE_TASKS_SUCCESS:
            return Object.assign({}, state,
                {
                    tasks: action.payload.tasks,
                    totalTaskCount: action.payload.totalTaskCount,
                }
            );

        case FETCH_USER_TOKEN_SUCCESS:
            return Object.assign({}, state,
                {
                    token: action.payload.token,
                }
            );

        case FETCH_EDIT_SUCCESS:
            return Object.assign({}, state,
                {
                    token: action.payload.token,
                }
            );

        case SET_CURRENT_SORT:
            return Object.assign({}, state,
                {
                    currentSort: action.payload,
                }
            );

        case SET_CURRENT_SORT_DIRECTION:
            return Object.assign({}, state,
                {
                    currentSortDirection: action.payload,
                }
            );

        case SET_CURRENT_PAGE:
            return Object.assign({}, state,
                {
                    currentPage: action.payload,
                }
            );


        default:
            return state
    }
}

