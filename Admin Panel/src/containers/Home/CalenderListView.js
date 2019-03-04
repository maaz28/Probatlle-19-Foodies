import React, { Component } from 'react';
import './style.css'
import {connect} from 'react-redux';
import { api_base_url } from '../../config/api-configuration';
import { get_request } from '../../utils/helper';


class CalenderListView extends Component {

    state = {
        calender1 : [
            {
                date : 1,
                interested : 'yes',
                month : 'Jan'
            },
            {
                date : 2,
                interested : 'yes'
            },
            {
                date : 3,
                interested : 'yes'
            },
            {
                date : 4,
                interested : 'yes'
            },
            {
                date : 5,
                interested : 'yes'
            }
        ],
        calender2 : [
            {
                date : 1,
                interested : 'yes',
                month : 'Feb'
            },
            {
                date : 2,
                interested : 'yes'
            },
            {
                date : 3,
                interested : 'yes'
            },
            {
                date : 4,
                interested : 'yes'
            },
            {
                date : 5,
                interested : 'yes'
            }   
        ],
        calenderArray : []
    }

    componentDidMount(){
        get_request(api_base_url + '/event/interested-event/' + this.props.uuid)
        .then(res => {
            console.log(res)
            let array = res.data.results, calenderArr = [];
            for (var i=0; i < array.length; i++){
                let obj = {
                    month: new Date(array[i].date.start).getMonth(),
                    date : new Date(array[i].date.start).getDate(),
                    _id : array[i]._id 
                }
                calenderArr.push(obj);
            }
                    this.setState({
                        calenderArray : calenderArr
                    })
        })
    var monthNames = [ "JAN", "FEB", "MAR", "APR", "May", "JUN",
"JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
    var now = new Date();
    let daysInAMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    let date = now.getDate();
    let loopOneIterator = (daysInAMonth - date) + 1;
    let loopTwoIterator = 20-loopOneIterator;
    //loop1
    let arr1 = []
    let arr2 = []
    for(var i=date; i<loopOneIterator + date; i++){
        var result = this.state.calenderArray.filter((obj, i) => {
            if(obj.month === now.getMonth()){
              return i
            }
          })
          console.log(result)
        let obj = {
            date : i,
            month : monthNames[now.getMonth()]
        }
        arr1.push(obj)
    }
    for(var i=1; i<loopTwoIterator; i++){
        let obj = {
            date : i,
            month : monthNames[now.getMonth()+1]
        }
        arr2.push(obj)
    }
    console.log(arr1, arr2, "arr")
    this.setState({
        calender1 : arr1,
        calender2 : arr2
    })
    }

  render() {
    return (    
    <div class="scrollmenu">
    <span style = {{color : 'white', backgroundColor : '#F50057', padding : '16px', borderRadius : '20px'}}>{this.state.calender1[0].month}</span>
    {
        this.state.calender1.map((item, i) => {
            return (
                <a href="#home">{item.date}</a>   
            )
        })
    }
    <span style = {{color : 'white', backgroundColor : '#F50057', padding : '16px', borderRadius : '20px'}}>{this.state.calender2[0].month}</span>
        {
        this.state.calender2.map((item, i) => {
            return (
                <a href="#home">{item.date}</a>   
            )
        })
    }
  </div>  
    )
  }
}

function mapStateToProp(state) {
    console.log(state.user_reducer.is_login)
    return ({
    //   login : state.user_reducer.is_login,
      uuid : state.user_reducer.uuid
    })
  }


export default connect(mapStateToProp, null)(CalenderListView)
