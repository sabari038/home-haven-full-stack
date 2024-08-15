import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PropertyDetailsPage.css';

// Mapping property types to images
const propertyImages = {
  Villa: [
    'https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg',
    'https://images.pexels.com/photos/816198/pexels-photo-816198.jpeg',
    'https://images.pexels.com/photos/32870/pexels-photo-32870.jpeg',
    'https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg',
    'https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg',
    'https://images.pexels.com/photos/5997992/pexels-photo-5997992.jpeg',
  ],
  House: [
    'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg',
    'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
    'https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg',
  ],
  Plot: [
    'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg',
    'https://images.pexels.com/photos/4215110/pexels-photo-4215110.jpeg',
    'https://images.pexels.com/photos/4303919/pexels-photo-4303919.jpeg',
  ],
  Commercial : [
    'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg',
    'https://images.pexels.com/photos/248188/pexels-photo-248188.jpeg',
    'https://images.pexels.com/photos/8851856/pexels-photo-8851856.jpeg',
    'https://images.pexels.com/photos/210726/pexels-photo-210726.jpeg',
    'https://images.pexels.com/photos/6138694/pexels-photo-6138694.jpeg',
  ],
  Rental: [
    'https://images.pexels.com/photos/11264535/pexels-photo-11264535.jpeg',
    'https://images.pexels.com/photos/25884924/pexels-photo-25884924/free-photo-of-stairs-to-house-in-town.jpeg',
    'https://images.pexels.com/photos/25913263/pexels-photo-25913263/free-photo-of-trees-near-house-building.jpeg',
  ],
  Flat: [
    'https://images.pexels.com/photos/2834211/pexels-photo-2834211.jpeg',
    'https://images.pexels.com/photos/53782/pexels-photo-53782.jpeg',
    'https://images.pexels.com/photos/3762497/pexels-photo-3762497.jpeg',
    'https://images.pexels.com/photos/2077937/pexels-photo-2077937.jpeg',
    'https://images.pexels.com/photos/205078/pexels-photo-205078.jpeg',
    'https://images.pexels.com/photos/3825673/pexels-photo-3825673.jpeg',
  ]
};

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const amenities = [
    "Swimming pool",
    "Gym",
    "24/7 Security",
    "Parking",
    "Garden",
    "Playground",
    "Clubhouse"
  ];

  const getRandomImage = (type) => {
    const images = propertyImages[type] || [];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex] || 'https://example.com/default.jpg'; // Default image if none available
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8080/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        setError('Error fetching property details');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!property) {
    return <p>No property found.</p>;
  }

  return (
    <div className="property-details-page">
      {/* Display an image based on property type */}
      <img
        src={getRandomImage(property.propertyType)}
        alt={`${property.propertyType}`}
        className="property-image"
      />
      <div className="property-details-container">
        <h2>{property.propertyType} in {property.location}</h2>
        <div className="property-bhk"><strong>BHK:</strong> {property.bhk}</div>
        <div className="property-size"><strong>Size:</strong> {property.size}</div>
        <div className="property-price"><strong>Price:</strong> {property.sale ? `Buy at ${property.price}` : `Rent at ${property.price}`}</div>
        <div className="property-agent">
          <strong>Agent:</strong> {property.agentName}, {property.agentContact}
        </div>
        <div className="property-details"><strong>Details:</strong> {property.details}</div>
        <div className="property-features">
          <h3>Features:</h3>
          <ul>
            {property.features && property.features.length > 0 ? (
              property.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))
            ) : (
              <li>No features listed</li>
            )}
          </ul>
        </div>
        <div className="property-amenities">
          <h3>Amenities:</h3>
          <ul>
            {amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
