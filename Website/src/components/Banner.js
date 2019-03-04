import React, { Component } from 'react';
import backgroundImg from '../assets/banner-img.jpg';
class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 'food',
            area : '',
            locationAddress : ''
        }
    }
    
    categoryHandler(ev) {
        this.setState({
            category: ev.target.value
        })
    }

    areaHandler = (val) => {
        console.log(val)
        let str =  val.lat+"/"+val.lng

        this.setState({
            area : str
        })
    }

    searchBtnHandler(ev){
        ev.preventDefault();
        if(this.state.area){
        }
    }

    locationBtnHandler = () => {
        var options = {
            enableHighAccuracy: true,
            timeout: 6000,
            maximumAge: 0 
          };
        navigator.geolocation.getCurrentPosition((pos) => {
            var lat = pos.coords.latitude;
            var lng = pos.coords.longitude;
            console.log(pos)

            this.callBackendAPI('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key=AIzaSyDqZXfHYD0qkwhpv-mqQ7lK1cp0F4S60bE')
            .then(res => {
                console.log(res)
                console.log(res.results[0].formatted_address)
                this.setState({
                    area : lat+'/'+lng,
                    locationAddress : res.results[0].formatted_address
                })
            })
            .catch(err => console.log(err));

        }, (err) => {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          , options);
    }
        callBackendAPI = async (url) => {
            const response = await fetch(url);
            const body = await response.json();
            if (response.status !== 200) {
                throw Error(body.message)
            }
            return body;
        };

    render() {
        return (
        <div>
            <section className="dorne-welcome-area bg-img bg-overlay" style={{backgroundImage: 'url('+backgroundImg+ ')', height : '100vh'}}>
                <div className="container h-100">
                    <div className="row h-100 align-items-center justify-content-center">
                        <div className="col-12 col-md-10">
                            <div className="hero-content">
                                    <h2 style={{textAlign:'center'}} id="banner-head">Restaurants of your choice !</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-social-btn">
                </div>
            </section>
        </div>
        )
    }  
}

export default (Banner);