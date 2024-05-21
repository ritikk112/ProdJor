import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
// import { doc, getDoc } from "firebase/firestore";
import './proposedHome.css';
import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import marketLogo from '../assets/marketLogo.png';
import FutureEdge from '../assets/FutureEdge.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stock from "./stock";
import ExpandableCardList from "./FAQs";

async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
//   const navigate = useNavigate();
//   const toEducatoryForum = () => {
//     navigate('/login');
//   };

const Home = ({ userDetails }) =>{
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
    const handleMarketplaceClick = () => {
        // Define your marketplace click logic here
        console.log("Marketplace button clicked");
      };
    
      const handleEducationClick = () => {
        // Define your education click logic here
        console.log("Education button clicked");
      };
    return(
        <div style={{flex: 1, backgroundColor: 'white', padding: 15, flexWrap: "wrap"}}>
            <AppBar position="static" style={{backgroundColor: "white", color: "black", boxShadow: 'revert'}}>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-around'}}>
                    {/* <Typography variant="h5">
                    FutureEdge.
                    </Typography> */}
                    <img src={FutureEdge} style={{height: '8%', width: '10%'}} />
                    <div style={{ display: 'flex', justifyContent: 'space-around', gap: 10}}>
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={handleMarketplaceClick}
                            className="text-button"
                            style={{ color: 'blue' }}
                        >
                            Marketplace
                        </Button>
                        <Button
                            // variant="outlined"
                            color="inherit"
                            onClick={handleEducationClick}
                            className="text-button"
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
                        Welcome {userDetails.firstName}!
                    </Button>
                    <Menu
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
                    </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img src={marketLogo} />
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignContent: "space-around", gap: 30 }}>
                    <Button variant="text" onClick={() => {handleMarketChange("stock")}}>Stocks</Button>
                    <Button variant="text" onClick={() => {handleMarketChange("forex")}}>Forex</Button>
                    <Button variant="text" onClick={() => {handleMarketChange("future")}}>Future</Button>
                    <Button variant="text" onClick={() => {handleMarketChange("options")}}>Options</Button>
                    {/* <Button variant="text">Stocks</Button> */}
                </div>
                <div>
                    {selectedContent === "stock" && <Stock userDetails={userDetails} />}
                    {selectedContent === "forex" && <div>Forex</div>}
                    {selectedContent === "future" && <div>Future</div>}
                    {selectedContent === "options" && <div>Options</div>}
                </div>
                <ExpandableCardList />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                    src={userDetails.photo}
                    width={"40%"}
                    style={{ borderRadius: "50%" }}
                    alt="Profile Image"
                    />
                </div>
                <h3>Welcome {userDetails.firstName}</h3>
                <div>
                    <p>Email: {userDetails.email}</p>
                    <p>First Name: {userDetails.firstName}</p>
                    <p>Last Name: {userDetails.lastName}</p>
                </div>
                {/* <button className="btn btn-primary" onClick={toEducatoryForum}>
                    Educatory
                </button> */}
                <button className="btn btn-primary" onClick={handleLogout}>
                    Logout
                </button>
            </>
        </div>
    )
    
};
export default Home;