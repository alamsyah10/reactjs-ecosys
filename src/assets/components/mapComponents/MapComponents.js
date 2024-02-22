import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import L from 'leaflet'; // Import Leaflet library
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


const MapComponent = ({ latitude, longitude }) => {
  useEffect(() => {
    // Initialize map
    const map = L.map('map').setView([latitude, longitude], 14);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add marker
    L.marker([latitude, longitude], {
        icon: L.icon({
          iconUrl: icon,
          shadowUrl: iconShadow,
        })
      })
      .addTo(map)
      .bindPopup('Location')
      .openPopup();

    // Cleanup
    return () => map.remove();
  }, [latitude, longitude]); // Dependency array to re-run effect when latitude or longitude changes

  return <div id="map" style={{ height: '400px' }}></div>; // Render map container
};

export default MapComponent;
