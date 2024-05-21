import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExpandableCard = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card onClick={handleExpandClick} style={{ cursor: 'pointer' }}>
      <CardContent
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={handleExpandClick}>
          <ExpandMoreIcon />
        </IconButton>
      </CardContent>
      <Collapse in={expanded} unmountOnExit>
        <CardContent>
          <Typography variant="body1">{content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const ExpandableCardList = () => {
  const cardData = [
    {
      title: 'Card 1',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod justo sit amet magna dignissim, vel tincidunt urna varius.',
    },
    {
      title: 'Card 2',
      content:
        'Proin vel metus vel augue tincidunt congue. Nullam euismod euismod nunc, eu commodo lorem tristique vitae.',
    },
    {
      title: 'Card 3',
      content:
        'Fusce venenatis, ipsum non tincidunt volutpat, tellus velit commodo ante, ac posuere nisi mauris vel sapien.',
    },
  ];

  return (
    <>
        <h1 style={{margin: "5%"}}>Frequenty Asked Questions</h1>
      {cardData.map((card, index) => (
        <ExpandableCard
          key={index}
          title={card.title}
          content={card.content}
        />
      ))}
    </>
  );
};

export default ExpandableCardList;