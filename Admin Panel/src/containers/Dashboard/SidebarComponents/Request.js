import React, { Component } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Paper, Grid } from '@material-ui/core';
import { get_request, post_request, put_request } from '../../../utils/helper';
import { api_base_url } from '../../../config/api-configuration';

export default class Request extends Component {

  state = {
    list : []
  }

  componentDidMount = () => {
    get_request(api_base_url + "/admin/place-request").then((res) => {
      this.setState({
        list : res.data.result
      })
    })
  }

  acceptHandler = (id) => {
    put_request(api_base_url + '/admin/place-request/'+ id)
    .then((res) => {
      window.location.reload();
    })
  }

    render(){
        return(

          <Grid container spacing={24}>
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
            <Button size="small" color="primary" onClick = { () => {this.acceptHandler(item._id)}} >
              Accept
            </Button>
          </CardActions>
        </Card>
                </Paper>
              </Grid>
              )
            })
          }
          </Grid>

        )
    }
}