import React from 'react';
import { Card, CardContent, CardMedia, Typography, makeStyles } from '@material-ui/core';

const Cards = ({ cards }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {cards.map((card, index) => (
        <Card key={index} className={classes.card}>
          <CardMedia
            className={classes.media}
            image={card.image}
            title={card.title}
          />
          <CardContent>
            <Typography variant="h6" component="h2">
              {card.title}
            </Typography>
            <Typography color="textSecondary">
              {card.subtitle}
            </Typography>
            <Typography variant="body2" component="p">
              {card.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Cards;
