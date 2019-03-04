import React, { Component } from 'react';
import '../../css/contactStyling/style.css'
import { connect } from 'react-redux';
import Footer from '../footer';
import '../../css/SinglepageIcon.css';
import CustomNavbar from '../Navbar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import banner1 from '../../assets/restaurantsbanners/banner1.jpg'
import banner2 from '../../assets/restaurantsbanners/banner2.jpg'

var ratingValue = 0;
const ratingChanged = (newRating) => {
    ratingValue = newRating
}

class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: [],
            expand: false,
            shortPhotosArr: [],
            rating: 0,
            reviewed: false,
            reviewArr: [],
            update: false
        }
    }


    componentDidMount() {
        console.log(this.props.detail_data)
        let arr = [];
        arr.push(this.props.detail_data);
        this.setState({
            detail: arr
        })
    };





    createTable = (cost) => {
        let table = [];
        let p = [];
        let str = '';
        for (let j = 0; j < cost; j++) {
            str += '$';
        }
        let remainingStr = ''
        for (let i = 0; i < 3 - cost; i++) {
            remainingStr += '$';
        }
        table.push(<p><span>{str}</span>{remainingStr}</p>)

        // }
        return table
    }



    removeRestaurantName(str) {
        let splitStr = str.split('/');
        return splitStr[0];
    }


    render() {
        return (
            <div>
                <CustomNavbar />
                {
                    (!(Object.keys(this.props.detail_data).length === 0 && this.props.detail_data.constructor === Object)) ? (
                        this.state.detail.map(function (item, i) {
                            return (
                                <div key={i}>
                                    <div style={{ backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '400px', overflow: 'hidden', backgroundImage: 'url(' + banner2 + ')' }}>
                                    </div>
                                    <section className="reserve-block">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h3 style={{ padding: '0%', margin: '0%', display: 'inline' }}>{item.name}</h3>
                                                    {this.createTable(item.cost)}
                                                    <br />
                                                    <p className="reserve-description">{item.food_type}</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="reserve-seat-block">
                                                        {<div className="reserve-rating">
                                                            <span style={{ color: 'white' }}>{
                                                                (item.rating) ? (
                                                                    item.rating
                                                                ) : (
                                                                        4.2
                                                                    )
                                                            }
                                                            </span>
                                                        </div>}
                                                        {<div className="review-btn">
                                                        </div>}
                                                        <div className="reserve-btn">
                                                            <div className="featured-btn-wrap">
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="light-bg booking-details_wrap">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-7 responsive-wrap">
                                                    <div className="booking-checkbox_wrap">
                                                        <div className="booking-checkbox">
                                                            <p>{item.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="booking-checkbox_wrap mt-4">
                                                        {
                                                            item.menu.map((item, i) => (
                                                                <div className="menu-item">
                                                                <div style={{display:'inline-block'}}>
                                                                    <h4>{item.name}<br /></h4>
                                                                    {item.description}
                                                                </div>
                                                                <div style={{display:'inline-block', float: 'right', fontSize: '20px', lineHeight: '44px'}}>
                                                                    {'Rs.'+item.price}
                                                                </div>
                                                                </div>

                                                            ))


                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-5 responsive-wrap">
                                                    <div className="contact-info">
                                                        <div>
                                                        </div>
                                                        <div className="address">
                                                            <span className="fas fa-map-marker-alt"></span>
                                                            <p> {item.formatted_address}</p>
                                                        </div>
                                                        {
                                                            (item.formatted_phone_number) ? (
                                                                <div className="address">
                                                                    <span className="fas fa-mobile-alt"></span>
                                                                    <p> {item.formatted_phone_number}</p>
                                                                </div>
                                                            ) :
                                                                (null)
                                                        }

                                                        {
                                                            (item.website) ? (
                                                                <div className="address">
                                                                    <span className="fas fa-link"></span>
                                                                    <p>
                                                                        <a href={item.website} target="_blank">{item.website}</a>
                                                                    </p>
                                                                </div>
                                                            ) : (null)
                                                        }
                                                        {
                                                            (item.facebook_url) ? (
                                                                <div className="address">
                                                                    <span className="fab fa-facebook"></span>
                                                                    <p>
                                                                        <a href={item.facebook_url} target="_blank">{item.facebook_url}</a>
                                                                    </p>
                                                                </div>
                                                            ) : (null)
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                            )
                        }.bind(this))
                    ) : (
                            <div style={{ marginTop: '100px' }}>
                                <div class="loader" style={{ margin: '0 auto' }}></div>

                            </div>
                        )
                }
                <Footer />
            </div>
        );
    }
}

function mapStateToProp(state) {
    return ({
        detail_data: state.root.detail_data,
    })
}


export default connect(mapStateToProp, null)(Single);