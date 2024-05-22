import React from 'react';
import YouTube from 'react-youtube';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@material-ui/core';
import './proposedHome.css';
import AppBar from "@mui/material/AppBar";
import { Toolbar} from "@mui/material";
import Button from '@mui/material/Button';
import marketLogo from '../assets/marketLogo.png';
import FutureEdge from '../assets/FutureEdge.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stock from "./stock";
import ExpandableCardList from "./FAQs";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const Education = () => {
  const classes = useStyles();
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  const featuredVideos = [
    {
      id: 'b0_CsTFjtus&ab_channel=PushkarRajThakur%3ABusinessCoach',
      title: 'Introduction to Sensibull',
      duration: '23:39',
    },
    {
      id: 'b0_CsTFjtus&ab_channel=PushkarRajThakur%3ABusinessCoach',
      title: 'OPEN INTEREST FEATURES EXPLAINED!',
      duration: '14:25',
    },
    {
      id: 'b0_CsTFjtus&ab_channel=PushkarRajThakur%3ABusinessCoach',
      title: "INDIA'S MOST FEATURE RICH STRATEGY BUILDER",
      duration: '10:26',
    },
    {
      id: 'b0_CsTFjtus&ab_channel=PushkarRajThakur%3ABusinessCoach',
      title: 'HOW TO READ FII DATA?',
      duration: '13:55',
    },
  ];

  const playlists = [
    {
      id: 'b0_CsTFjtus&ab_channel=PushkarRajThakur%3ABusinessCoach',
      title: 'HOW TO TRADE OPTIONS',
      itemCount: 10,
    },
    {
      id: 'PLBYsxKiHIBnU0r1wrH2NaqOzC2Uyt04_b',
      title: 'LEARN OPTIONS STRATEGIES',
      itemCount: 9,
    },
    {
      id: 'PLBYsxKiHIBnU4aE5dj7mcPVWdbOBoxXfv',
      title: 'PRACTICAL OPTIONS TRADING',
      itemCount: 8,
    },
    {
      id: 'PLBYsxKiHIBnVQMI6Mn8sOVx_YOjiyn2t4',
      title: 'BE A BETTER TRADER',
      itemCount: 10,
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedContent, setselectedContent] = React.useState("stock");
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMarketChange = (com) =>  {
        setselectedContent(com);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
      const handleMarketplaceClick = () => {
          // Define your marketplace click logic here
  
          // const handleClick = () => {
              navigate("/onboarding");
          // };
          console.log("Marketplace button clicked");
        };
      
        const handleEducationClick = () => {
          // Define your education click logic here
          console.log("Education button clicked");
          navigate("/education");
        };

  return (
    <div>
        <div style={{flex: 1, backgroundColor: 'white', padding: 15, flexWrap: "wrap"}}>
            <AppBar position="static" style={{backgroundColor: "white", color: "black", boxShadow: 'revert'}}>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-around'}}>
                    <img src={FutureEdge} style={{height: '8%', width: '10%'}} />
                    <div style={{ display: 'flex', justifyContent: 'space-around', gap: 10}}>
                        <Button
                            variant="text"
                            color="inherit"
                            onClick={handleMarketplaceClick}
                            className="text-button"
                            
                        >
                            Marketplace
                        </Button>
                        <Button
                            // variant="outlined"
                            color="inherit"
                            variant="outlined"
                            onClick={handleEducationClick}
                            className="text-button"
                            style={{ color: 'blue' }}
                        >
                            Education
                        </Button>
                    </div>
                    <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        variant="contained"
                        color="primary"
                        disableElevation
                        // color="blue"
                    >
                        We learn we Grow!
                    </Button>
                    {/* <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu> */}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    {/* </div> */}
        <Box className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
                Sensibull Tutorials & Demos
            </Typography>
            </Grid>
            <Grid container spacing={3}>
            {featuredVideos.map((video, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className={classes.card}>
                    <YouTube videoId={video.id} opts={opts} />
                    <CardContent>
                    <Typography gutterBottom variant="h6">
                        {video.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {video.duration}
                    </Typography>
                    </CardContent>
                </Card>
                </Grid>
            ))}
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
                Option Trading Video Playlists
            </Typography>
            </Grid>
            <Grid container spacing={3}>
            {playlists.map((playlist, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className={classes.card}>
                    <CardMedia
                    className={classes.cardMedia}
                    image={`https://img.youtube.com/vi/${playlist.id}/mqdefault.jpg`}
                    title={playlist.title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h6">
                        {playlist.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {`${playlist.itemCount} videos`}
                    </Typography>
                    </CardContent>
                </Card>
                </Grid>
            ))}
            </Grid>
        </Grid>
        </Box>
        <Footer />
    </div>
  );
};

export default Education;