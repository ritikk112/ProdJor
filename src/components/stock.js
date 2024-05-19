import React from "react";
import { Paper, Box, Typography, Button, CardActionArea } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Card, CardContent, CardMedia, } from '@material-ui/core';
import Prototype1 from '../assets/Prototype1.jpg';
import Prototype2 from '../assets/Prototype2.jpg';
import Prototype3 from '../assets/Prototype3.jpg';
import Rel from '../assets/Thumbnails/Stock_Reliance.svg';
import Tata from '../assets/Thumbnails/Stock_Tata.svg';
import HDFC from '../assets/Thumbnails/Stock_HDFC.svg';
import SBI from '../assets/Thumbnails/Stock_SBI.svg';
import Airtel from '../assets/Thumbnails/Stock_Airtel.svg';
import ICICI from '../assets/Thumbnails/Stock_ICICI.svg';




const exampleItems = [
  {
    first: "Reliance INDS",
	thumbFirst: Rel,
	firstImg: Prototype1,
	shortFirst: "REL",
	second: "Tata Consultancy S",
	thumbSecond: Tata,
	secondImg: Prototype2,
	shortSecond: "TATA",
	third: "HDFC BANK",
	thumbThird: HDFC,
	thirdImg: Prototype3,
	shortThird: "HDFC",
  },
  {
	first: "STATE BK OF INDIA",
	firstImg: Prototype1,
	thumbFirst: SBI,
	shortFirst: "SBI",
	second: "BHARTI AIRTEL LTD",
	secondImg: Prototype2,
	thumbSecond: Airtel,
	shortSecond: "ARTL",
	third: "ICICI BANK",
	thirdImg: Prototype3,
	thumbThird: ICICI,
	shortThird: "ICIC",
  },
];

const Stock = ({ userDetails }) => {
	const [selectedImg, setSelectedImg] = React.useState(Prototype1);
	const [curSubs, setCurSubs] = React.useState("REL");
	const [isLoading, setIsLoading] = React.useState(false);
	const handleSubscribe = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`users/${curSubs}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: userDetails.email }),
			});

			if (response.ok) {
			console.log('Subscription successful');
			} else {
			console.error('Subscription failed');
			}
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setIsLoading(false);
		}
	};
  return (
	<div>
		<Carousel
		animation="slide"
		indicators={false}
		timeout={1000}
		autoPlay={false}
		navButtonsAlwaysVisible={false}
		navButtonsAlwaysInvisible={false}
		cycleNavigation={true}
		//   fullHeightHover={false}
		sx={{
			maxWidth: "100%",
			margin: "auto",
			mt: 5,
		}}
		>
		{exampleItems.map((item, i) => (
			<Item 
				key={i}
			 	item={item}
				selectedImg={selectedImg}
				setSelectedImg={setSelectedImg}
				curSubs={curSubs}
				setCurSubs={setCurSubs}
			/>
		))}
		</Carousel>
		<div>
			<img src = {selectedImg} style={{margin: "1%"}}/>
			<Button
			color="secondary"
			onClick={handleSubscribe}
			disabled={isLoading}
			>
				{isLoading ? 'Subscribing...' : 'Subscribe!'}
			</Button>
			{/* <Button color="secondary" onClick={() => {console.log(curSubs)}}>Subscribe!</Button> */}
		</div>
	</div>
  );
};

function Item(props) {
	const handleImgChange = (imgChange, curChange) => {
		props.setSelectedImg(imgChange); // Update state in Stock
		props.setCurSubs(curChange);
		// console.log(imgChange);
	};
	
  return (
    <Paper
      sx={{
        position: "relative",
        color: "#fff",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        justifyContent: "space-around",
        alignItems: "center",
        height: "300%",
        display: "flex",
        flexDirection: "row",
        borderRadius: "10px",
      }}
    >
		<CardActionArea onClick={() => {handleImgChange(props.item.firstImg, props.item.shortFirst)}} style={{height: "40%", width: "30%"}}>
			<Card>
			<CardContent style={{display: "flex", flexDirection: "row", gap: "5%"}}>
					<img src = {props.item.thumbFirst} style={{borderRadius: "30px"}}/>
					<Typography variant="h6" component="h2">
					{props.item.first}
					</Typography>
					<Typography variant="body2" component="p">
					{props.item.description}
					</Typography>
			</CardContent>
			</Card>
		</CardActionArea>
		<CardActionArea onClick={() => {handleImgChange(props.item.secondImg, props.item.shortSecond)}} style={{height: "40%", width: "30%"}}>
		<Card>
			<CardContent style={{display: "flex", flexDirection: "row", gap: "5%"}}>
					<img src = {props.item.thumbSecond} style={{borderRadius: "30px"}}/>
					<Typography variant="h6" component="h2">
					{props.item.second}
					</Typography>
					<Typography variant="body2" component="p">
					{props.item.description}
					</Typography>
			</CardContent>
			</Card>
		</CardActionArea>
		<CardActionArea onClick={() => {handleImgChange(props.item.thirdImg, props.item.shortThird)}} style={{height: "40%", width: "30%"}}>
			<Card >
			<Card>
			<CardContent style={{display: "flex", flexDirection: "row", gap: "5%"}}>
					<img src = {props.item.thumbThird} style={{borderRadius: "30px"}}/>
					<Typography variant="h6" component="h2">
					{props.item.third}
					</Typography>
					<Typography variant="body2" component="p">
					{props.item.description}
					</Typography>
			</CardContent>
			</Card>
			</Card>
		</CardActionArea>
    </Paper>
  );
}

export default Stock;