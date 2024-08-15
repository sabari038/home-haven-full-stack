import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PropertyList.css'; // Ensure this file has the correct styles

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

const getRandomImage = (type) => {
  const images = propertyImages[type] || [];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex] || 'https://example.com/default.jpg'; // Default image if none available
};

const PropertyList = () => {
  const { type } = useParams();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/properties/propertyType/${type}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = response.data;
        console.log("Fetched properties:", data); // Debugging
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [type]);

  return (
    <div className="property-list">
      <h2>{type ? type.toUpperCase() : 'Properties'}</h2>
      {properties.length > 0 ? (
        <ul>
          {properties.map((property) => (
            <li key={property.id} className='properties-detials'>
              <img
                src={getRandomImage(property.propertyType)}
                alt={`${property.propertyType} image`}
                className="property-image"
              />
              <div className='list-details'>
              <strong>Location:</strong> {property.location}<br/>
              <strong>Size:</strong> {property.size}<br/>
              <strong>Price:</strong> {property.price}<br/>
              <strong>For Sale:</strong> {property.sale ? 'Yes' : 'No'}<br/>
              <strong>For Rent:</strong> {property.rent ? 'Yes' : 'No'}<br/>
              <strong>Details:</strong> {property.details}<br/>
              <strong>Agent Name:</strong> {property.agentName}<br/>
              <strong>Agent Contact:</strong> {property.agentContact}<br/>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties found for this type.</p>
      )}
    </div>
  );
};

export default PropertyList;
