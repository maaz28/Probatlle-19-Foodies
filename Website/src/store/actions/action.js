export function DetailData(data){
    return dispatch => {
        dispatch({ type: "DETAIL_DATA", payload: data })
        }
}
