import React, { Component } from 'react';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Paper,
  Grid,
  CircularProgress
} from '@material-ui/core';
import {delete_request, get_request} from '../../../utils/helper';
import { api_base_url } from '../../../config/api-configuration';

export default class RestaurantsList extends Component {

  state = {
    list : [
      {name : 'loading', remove : false }
    ]
  }

  componentDidMount = () => {
    get_request(api_base_url+"/places/all").then((res) => {
      this.setState({
        list : res.data.results
      })
    })
  }

  acceptHandler = () => {
    window.location.href = "http://localhost:3000"
  }

  removePlaceHandler = (id) => {
    this.setState({
      remove : true
    })
    delete_request(api_base_url + '/admin/place/' + id)
        .then(res => {
          window.location.reload();
        })
  }

    render(){
        return(

          <Grid container spacing={24}>
            {(!this.state.remove) ? (
                <React.Fragment>
                {
                  this.state.list.map((item, i) => {
                    return(
                        <Grid item xs={6} sm={3} key = {i}>
                          <Paper>
                            <Card >
                              <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image={item.banner_image}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                  <Typography gutterBottom variant="h5" component="h2">
                                    {item.name}

                                  </Typography>
                                  <Typography component="p">
                                    {item.formatted_address_short}
                                  </Typography>
                                  <Typography component="p">
                                    {item.description}
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                              <CardActions>
                                <Button size="small" color="primary" onClick = {this.acceptHandler}>
                                  View Details
                                </Button>
                                <Button size="small" color="primary" onClick = {() => { this.removePlaceHandler(item._id) }}>
                                  Remove
                                </Button>

                              </CardActions>
                            </Card>
                          </Paper>
                        </Grid>
                    )
                  })
                }
                  </React.Fragment>
                  ) : (
                <span> <CircularProgress /> </span>
            ) }

        </Grid>
        )
    }
}