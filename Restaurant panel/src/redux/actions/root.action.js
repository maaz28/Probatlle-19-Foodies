

export const LOGGEDIN = 'LOGGEDIN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const USER_EMAIL_AND_PASSWORD = 'USER_EMAIL_AND_PASSWORD';

  export function USER_LOGGEDIN(data){
    console.log(data);
    return { type: LOGGEDIN, payload : data }
  }

  export function USER_EMAIL_PASSWORD(data){
    console.log(data);
    return { type: USER_EMAIL_AND_PASSWORD, payload : data }
  }

  export function USER_LOGGEDOUT(){
    return { type: LOGGED_OUT }
  }