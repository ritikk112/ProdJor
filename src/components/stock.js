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
import FullscreenImageViewer from './FullScreenImageViewer';
import ExpandableCardList from "./FAQs";

const stockImages = [`${"https://th.bing.com/th?id=OVFT.D5oo7SLxWHSb1gckqoLioy&pid=News&w=234&h=132&c=14&rs=2&qlt=90"}`, `${"https://th.bing.com/th?id=OVFT.dt9jqpeopPr5ANh4eI6HRC&pid=News&w=234&h=132&c=14&rs=2&qlt=90"}`, `${"https://th.bing.com/th?id=OVFT.VilJh_vnomiPh0EFsBrLDi&pid=News&w=234&h=132&c=14&rs=2&qlt=90"}`];

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


const cardData = [
	{
	  title: 'Indian stock market hits $5 trn for the first time ever; volatility expected ahead of election results',
	  description: 'The m-Cap of all BSE-listed companies touched $5 trillion for the first time in intraday trade, rising from $4 trillion in ...',
	},
	{
	  title: 'Rs. 8.50/Share Dividend: Payable Between 29th August To 21st September; Buy/Sell The BSE 200 Stock?',
	  description: 'One well-known and internationally renowned automobile component maker is Endurance Technologies. For the fiscal year ...',
	},
	{
	  title: 'Jio Financial Services Share Price Live Updates: Jio Financial Services Sees Price Dip to Rs 358.45, EMA3 at 369.84 Amidst Market Volatility',
	  description: 'Stay up-to-date with the Jio Financial Services Stock Liveblog, your comprehensive source for real-time updates and detailed',
	},
  ];
  
  const NewsCard = ({ title, description, index }) => {
	return (
	  <Card style={{display: 'flex', alignItems: 'center', gap: '1rem', margin: "2%"}}>
		<CardContent>
		  <Typography variant="h6" component="h2">
			{title}
		  </Typography>
		  <Typography variant="body2" component="p">
			{description}
		  </Typography>
		</CardContent>
		<CardMedia
			component="img"
			src={stockImages[index]}
			alt={title}
			style={{ width: '40%', height: '70%', margin: '30px' }}
		/>
	  </Card>
	);
  };


const Stock = ({ userDetails }) => {
	const [selectedImg, setSelectedImg] = React.useState(Prototype1);
	const [curSubs, setCurSubs] = React.useState("REL");
	const [isLoading, setIsLoading] = React.useState(false);
  	const [isFullscreen, setIsFullscreen] = React.useState(false);
	  const toggleFullscreen = () => {
		setIsFullscreen(!isFullscreen);
	  };
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
			<div style={{ display: 'flex', gap: '1rem', margin: '40px' }}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderColor:"black", border: "0.5px",  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)', padding: '10px', width: "auto" }}>
					<h3>~News Flash~</h3>
					{cardData.map((data, index) => (
						<NewsCard key={index} index={index} title={data.title} description={data.description} style = {{width: '500px'}} />
					))}
				</div>
				<div style={{display: 'flex', flexDirection: 'column', gap: '1rem', padding: '5', margin: '10', justifyContent: 'center', alignContent: 'center'}}>
					<Button color="success" variant="contained" style={{width: "50%", marginLeft: "30%"}}>Direction: Up</Button>
						{isFullscreen ? (
						<FullscreenImageViewer src={selectedImg} onClose={toggleFullscreen} />
						) : (
						<img
							src={selectedImg}
							style={{ height: '60%', width: '75%', cursor: 'pointer', marginLeft: '15%' }}
							onClick={toggleFullscreen}
							alt="Selected"
						/>
						)}
					<Button
					color="secondary"
					onClick={handleSubscribe}
					disabled={isLoading}
					style={{width: "20%", marginLeft: "43%"}}
					>
						{isLoading ? 'Subscribing...' : 'Subscribe!'}
					</Button>
				</div>
			</div>
			{/* <ExpandableCardList /> */}
			{/* <Button
			color="secondary"
			onClick={handleSubscribe}
			disabled={isLoading}
			>
				{isLoading ? 'Subscribing...' : 'Subscribe!'}
			</Button> */}
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