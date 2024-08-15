import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import About from './About';
import Amenities from './Amenities';
import Services from './Services';
import Team from './Team';
import Exploreproperty from './Exploreproperty';
import SellersRatedPage from './SellersRatedPage';
import './HomePage.css'; // Ensure your CSS file is included

const Homepage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [sellerName, setSellerName] = useState('Guest');
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to handle dropdown visibility

  useEffect(() => {
    // Retrieve the seller's name from local storage
    const name = localStorage.getItem('sellerName');
    setSellerName(name || 'Guest');
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const goToSignin = () => {
    navigate('/login');
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    // Clear the seller's name from local storage
    localStorage.removeItem('sellerName');
    setSellerName('Guest');
    setDropdownVisible(false); // Hide dropdown after logout
    // Redirect to login page or home page
    navigate('/login');
  };

  return (
    <div>
      <div className="homepage">
        <nav className="home-navbar">
          <div className="home-navbar-left">
            <div className="home-logo">
              <img src='/Assets/Images/Home-Haven.jpg' alt="Logo" />
            </div>
            <ul className="home-nav-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#service">Our Services</a></li>
              <li><a href="#Amenities">Amenities</a></li>
              <li><a href="#Properties">Explore Properties</a></li>
              <li><a href="#Contact">Contact Us</a></li>
              <li><a href="#Team">The Team</a></li>
            </ul>
          </div>
          <div className="home-navbar-right">
            {sellerName === 'Guest' ? (
              <>
                <button className="auth-button" onClick={goToSignin}>Login</button>
                <button className="auth-button" onClick={goToSignup}>Signup</button>
              </>
            ) : (
              <div className="dropdown-home">
                <span className="welcome-message" onClick={toggleDropdown}>
                  Welcome {sellerName}
                </span>
                {dropdownVisible && (
                  <div className="dropdown-content">
                    <button onClick={() => navigate('/seller-dashboard')}>Seller Dashboard</button>
                    <button onClick={handleLogout}>Log Out</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
        <br />
        <img src='/Assets/Images/Homepagebanner.jpg' alt="Homepage Banner" />
        <header className="home-hero">
          <div className="home-hero-content">
            <h1>Welcome to HomeHaven</h1>
            <p>Your dream home is just a click away</p>
            <br />
            <a href="#Properties" className="home-hero-button">Explore Now</a>
          </div>
        </header>
      </div>
      <div>
        <About />
        <Services />
        <Amenities />
        <Exploreproperty />
        <SellersRatedPage />
        <Team />
      </div>
      <div className='footer'>
        <div className='footer-content'>
          <div className='footer-section'>
            <h2>Contact Us</h2>
            <p>If you have any questions or feedback, feel free to reach out to us:</p>
            <p>Email: <a href="mailto:admin@estatehub.com">admin@estatehub.com</a></p>
            <p>Phone: <a href="tel:6374453114">+91 6374453114</a></p>
          </div>
          <div className='footer-section'>
            <h2>Follow Us</h2>
            <p>Stay updated with our latest news and updates:</p>
            <div className='social-links'>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className='social-icon'>
                <img src="/Assets/Images/FaceBook.jpg" alt="Facebook" className='soc-logo'/>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className='social-icon'>
                <img src="/Assets/Images/Ex.jpg" alt="Twitter" className='soc-logo'/>
              </a>
              <a href="https://instagram.com/shashvanthere" target="_blank" rel="noopener noreferrer" className='social-icon'>
                <img src="/Assets/Images/Insta.jpg" alt="Instagram" className='soc-logo'/>
              </a>
            </div>
          </div>
          <div className='footer-section'>
            <h2>About Us</h2>
            <p>EstateHub is dedicated to bringing you the best plots and houses to make your search of houses easy and happy. Join our community and enjoy the benefits today!</p>
          </div>
        </div>
        <div className='footer-bottom'>
          <p>&copy; {new Date().getFullYear()} EstateHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
