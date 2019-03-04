import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
    <div>
        <footer className="dorne-footer-area">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 d-md-flex align-items-center justify-content-between">
                        <div className="footer-text">
                            <p>
                                Copyright &copy;
                                <script>
                                    document.write(new Date().getFullYear());
                                </script> All rights reserved | This website is made by
                                <a href="" target="_blank">Team Casper</a>

                            </p>
                        </div>
                        <div className="footer-social-btns">
                            <a href="javascript:void(0)">
                            For Listing your restaurant on <b>Foodies</b> <a href = "http://localhost:3001" target="_blank">Click Here</a> 
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
        )
    } 
}


export default (Footer);
