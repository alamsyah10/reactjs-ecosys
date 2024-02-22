import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import L from 'leaflet'; // Import Leaflet library
import './ProfilePage.css'; // Import custom styles
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Sidebar from '../../components/sidebar/Sidebar';
import MapComponent from '../../components/mapComponents/MapComponents';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        // Redirect to login page if hasToken is false
        if (!state || !state.token) {
            navigate('/login');
        } else {
            fetchUserProfile(state.token);
        }
    }, [state, navigate]);

   
    const fetchUserProfile = async (token) => {
        try {
            const response = await fetch('http://localhost:8081/api/v2/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const userProfileData = await response.json();
                setUserProfile(userProfileData);
            } else {
                console.error('Failed to fetch user profile');
                // Handle error or redirect to login page
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            // Handle error or redirect to login page
            navigate('/login');
        }
    };


    return (
        <>
            <Sidebar />
            <div className="profile-container">
                {userProfile && (
                    <>
                        <div className="profile-type">{userProfile.accountType}</div>
                        <div className="profile-name">{userProfile.username}</div>
                        <div className="profile-email">{userProfile.email}</div>
                        <div className="profile-phone">{userProfile.phoneNumber}</div>
                        <div className="profile-address">{userProfile.addressName}</div>
                        <div className="map-container">
                            <MapComponent latitude={userProfile.latitude} longitude={userProfile.longitude} />
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
}

export default ProfilePage;
