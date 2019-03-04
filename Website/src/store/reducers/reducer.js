const INITIAL_STATE = {
    detail_data : {}
} 

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DETAIL_DATA':
        return({
            ...state,
            detail_data : action.payload
        })
        default:
            return state;
    }
}