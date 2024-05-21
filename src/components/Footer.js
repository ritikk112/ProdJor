import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{backgroundColor: '#333', padding: '20px', display: 'flex', flexDirection: 'column', color: '#fff', maxWidth: '12000px', height: '240px', justifyContent: 'space-between'}}>
        <div style = {{display: 'flex', flexDirection: 'row', gap: '30%'}}>
            <div style = {{display: 'flex', flexDirection: 'column', margin: '40px'}}>
                <h1>FuturEdge</h1>
                <div style={footerStyles.social}>
                    <a href="#" style={footerStyles.socialLink}>
                        <FaFacebook />
                    </a>
                    <a href="#" style={footerStyles.socialLink}>
                        <FaLinkedin />
                    </a>
                    <a href="#" style={footerStyles.socialLink}>
                        <FaTwitter />
                    </a>
                    <a href="#" style={footerStyles.socialLink}>
                        <FaInstagram />
                    </a>
                </div>
            </div>
            <div style = {{display: 'flex', flexDirection: 'column'}}>
                <p style={{fontSize: '10px'}}>

                <p style={{fontWeight: 'bold'}}>This information is presented for educational purposes only and should not be interpreted as financial advice.</p>  We aim to provide informative content that can help you learn about various financial concepts and strategies. However, your personal financial situation, risk tolerance, and investment goals are unique. It's crucial to understand these factors before making any investment decisions. We strongly recommend consulting with a qualified financial advisor who can assess your specific needs and develop a personalized investment plan.

<p style={{fontWeight: 'bold'}}>Remember, investing involves inherent risks.</p> Past performance is not a guarantee of future results, and there's always the possibility of losing money.  By utilizing this information, you acknowledge that you are solely responsible for your investment decisions and the associated risks. We make no guarantees or warranties regarding the accuracy or completeness of the information presented.

<p style={{fontWeight: 'bold'}}>Our goal is to empower you with knowledge, not to dictate your financial choices.</p> We encourage you to conduct thorough research, consult with a professional, and make informed decisions based on your own circumstances.

                </p>
            </div>
            {/* <div style = {{display: 'flex', flexDirection: 'column'}}>
                <h1>FuturEdge</h1>
                <p>This is a trading bot</p>
            </div> */}
        </div>
    </footer>
  );
};

const footerStyles = {
    footer: {
      backgroundColor: '#333',
      color: '#fff',
      padding: '20px',
      textAlign: 'center',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    social: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    socialLink: {
      color: '#fff',
      fontSize: '24px',
      marginRight: '20px',
      textDecoration: 'none',
    },
  };
  


export default Footer;