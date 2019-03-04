import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import {
     DetailData
} from '../../store/actions/action';
import history from '../../config/history';

class SearchedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodListLocal: [
        ],
            category : 'true'
        }
    }

    componentDidMount() {
        this.callBackendAPI("http://localhost:9000/places/all")
            .then(res => {
                this.setState({
                    foodListLocal: res.data.results
                }); 
            })
            .catch(err => console.log(err));
    }
    callBackendAPI = async (fetchRoute) => {
        var route = fetchRoute;
        const response = await fetch(route);
        const body = await response.json();
        return body;
    }; 

    changeRouteHandler(data){
        console.log(data);
        this.props.DetailData(data);
        history.push('/single-details')
    }

    renderImage(ref){
        let route = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&maxheight=500&photoreference='+ref+'&key=AIzaSyDqZXfHYD0qkwhpv-mqQ7lK1cp0F4S60bE';
        return(
            <div style = {{height : '200px', overflow : 'hidden'}}>
            <img src = {route} style = {{minHeight : '100%', width: '100%'}}/>
            </div>
        )
    }


    render() {

        for (var key in this.state.foodListLocal) {
            if (this.state.foodListLocal.hasOwnProperty(key)) {
                 this.state.foodListLocal[key]
            }
        }

        return (
            <div>
{            (!(Object.keys(this.state.foodListLocal).length === 0 && this.state.foodListLocal.constructor === Object )) ? (
<section className="dorne-features-restaurant-area bg-default" style={{ backgroundColor : 'white', padding: '12px 35px'}} >
                <div className="container">
                <br/><br/>
                    <div className="row">
                        <div className="col-12">
                            <div className="section-heading text-center">
                                
                                <h4>Searched Places</h4>
                            </div> 
                        </div>
                    </div> 
                    <div className="row">
                    {
                        this.state.foodListLocal.map((item, i) => {
                            return(
                                <div className="col-md-4 col-lg-3 featured-responsive" key={i}>
                                <div className="featured-place-wrap">
                                    <a onClick={ () => { this.changeRouteHandler(item) } }>
                                      { 
                                           (typeof item.photos !== "undefined") ? (
                                            this.renderImage(item.photos[0].photo_reference)
                                        ) : (
                                            <div style = {{height : '200px', overflow : 'hidden'}}>
                                                <img src= {item.banner_image} alt="displayImage" style = {{minHeight : '100%', width : '100%'}}/>
                                            </div>
                                        )
                                        }
      
                                        <div className="featured-title-box">
                                            <h6 title = {item.name}>{item.name}</h6>
                                           <div style = {{ whiteSpace : 'nowrap', overflow:'hidden'}}>
                                           {/* <p>{this.removingUnderScore(item.types[0])} </p> <span>• </span> */}
                                            {/* {
                                           ( typeof item.opening_hours !== "undefined" ) ? (
                                               (item.opening_hours.open_now) ? (
                                                  <p><span>Open Now</span></p>
                                               ) : (
                                                   <p><span>Closed Now</span></p>
                                               )
                                           ) : null
                                            } */}
                                           </div>
                                        
                                            <ul>
                                                <li style = {{ whiteSpace : 'nowrap', overflow:'hidden'}}><span className="fas fa-map-marker-alt"></span>
                                                { 
                                                item.formatted_address_short 
                                                }
                                                </li>
                                                
                                            </ul>
                                            
                                        </div>
                                    </a>
                                </div>
                      </div>
                            )
                        })
                    }
               
                    </div>
                </div>
                </section>
) : (
    <div style = {{marginTop : '100px'}}>
    <div className="loader" style ={{margin : '0 auto'}}></div>
    </div>
)
}
                
            </div>
        )
    }
}


function mapDispatchToProp(dispatch) {
    return ({
        DetailData : (data) => {
            dispatch(DetailData(data))
        }
    })
}

function mapStateToProp(state) {
    return ({
        listingRoute : state.root.listingRoute,
        foodListSorted : state.root.foodListSorted,

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(SearchedList);