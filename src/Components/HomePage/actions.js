export const USER_SEARCH = 'REPOS_SEARCH'

export const search = (txt) => dispatch => {
    dispatch({ type: USER_SEARCH,value:txt });
}



