import React, {
    Component
  } from 'react';
  import history from '../config/history'
  import menuIconImg from '../assets/menu-icon.png'
  import logo from '../assets/logo.png'


  
  class CustomNavbar extends Component {
    constructor(props) {
      super(props);
      this.state = { open: false, contentStyle : {width : '40%', padding : '15px'}, onMobileDevice : false };
    }
  
      
  
    // ********************************* functions for modal ************************************
  
    openModal = (ev) => {
      ev.preventDefault();
      var useragent = navigator.userAgent;
      this.setState({ open: true });
      if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
          this.setState({onMobileDevice : true, contentStyle : {width : '80%', padding : '15px'}})
      }
    };
  
    closeModal = () => {
      this.setState({ open: false });
    };
  
    logoutHandler = () => {
      this.callBackendAPI().then((res) => console.log(res)); 
      this.props.isUserLogin(false)
    }
  
      // ********************************* Routes Handler ************************************
    ContactUsEventHandler(ev) {
      history.push('/contactUs')
    }
    aboutUsEventHandler(ev) {
      history.push('/aboutUs')
    }
    HomebtnHandler(ev) {
      history.push('/')
    }
    addListingbtnHandler(ev) {
      history.push('/addlisting')
    }
  
    // ********************************* update login state ************************************
    updateLoginState = (data) => {
        this.props.isUserLogin(true);
        this.props.userData(data);
        window.location.reload();
    }
  
    tokenHandler = (token) => {
      this.props.saveTokenHandler(token)
    }
    clickHandler = () => {
      history.push('/')
    }
  

    registerHandler = () => {
      console.log('in register')
      window.location.href = "http://localhost:3001"
    }

    render() {
      return (
    <div>
        <nav className="navbar navbar-expand-lg fixed-top" style={{paddingLeft: '5%',paddingTop:'1%', position:'absolute'}}>
                <img src={logo} className="logo" onClick = {this.clickHandler}/>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" style = {{backgroundImage : 'url('+menuIconImg+')'}}></span>
                </button>
  
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {
                    <form className="form-inline my-2 my-lg-0" style = {{marginRight : '15px'}}>
                            <button className="btn my-2 my-sm-0" id="setting-margin" style={ {margin : '0 auto',backgroundColor: '#4B0082',color: 'white',padding:'4%',width: '200px', cursor:'pointer', float : 'right', fontSize:'14px',border:'#ffffffa6 solid', borderWidth:'thin'}} onClick = {this.registerHandler}> Register Your Restaurant </button>
                          </form>
                        }
                </div>
        </nav>
    </div>
      )
    }
  }

  
  
  
  export default (CustomNavbar);