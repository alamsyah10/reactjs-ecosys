import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProfilePage.css'; // Import custom styles
import Footer from '../../components/footer/Footer';
import SidebarCustomer from '../../components/sidebar/SidebarCustomer';
import MapComponent from '../../components/mapComponents/MapComponents';
import SidebarProvider from '../../components/sidebar/SidebarProvider';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [userProfile, setUserProfile] = useState({});
    const token = localStorage.getItem('token');
    const [accountType, setAccountType] = useState(null);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            fetchUserProfile(token);
        }
    }, [state, navigate]);

    const fetchUserProfile = async (token) => {
        try {
            const response = await fetch('http://localhost:8081/api/v2/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const userProfileData = await response.json();
                setUserProfile(userProfileData);
                setAccountType(userProfileData.accountType);
            } else {
                console.error('Failed to fetch user profile');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            navigate('/login');
        }
    };
    return (
        userProfile && userProfile.accountType && (
            userProfile.accountType.toLowerCase() === 'customer' ? (
                <div className="profile-page">
                    <SidebarCustomer />
                    <div className="main-content">
                        <div className="profile-container">
                            {userProfile && (
                                <>
                                    <div className="profile-header">
                                        {userProfile.profilePic && (
                                            <img src={userProfile.profilePic} alt="Profile" />
                                        )}
                                        <h2>{userProfile.username}</h2>
                                    </div>
    
                                    <div className="profile-info">
                                        <p className="profile-type">{userProfile.accountType}</p>
                                        <p className="profile-email">{userProfile.email}</p>
                                        <p className="profile-phone">{userProfile.phoneNumber}</p>
                                        <p className="profile-address">{userProfile.addressName}</p>
                                    </div>
                                    {userProfile && userProfile.latitude && userProfile.longitude && (
                                        <div className="map-container">
                                            <MapComponent latitude={userProfile.latitude} longitude={userProfile.longitude} />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <Footer />
                    </div>
                </div>
            ) : userProfile.accountType.toLowerCase() === 'provider' ? (
                <div className="profile-page">
                    <SidebarProvider />
                    <div className="main-content">
                        <div className="profile-container">
                            {userProfile && (
                                <>
                                    <div className="profile-header">
                                        {userProfile.profilePic && (
                                            <img src={userProfile.profilePic} alt="Profile" />
                                        )}
                                        <h2>{userProfile.username}</h2>
                                    </div>
    
                                    <div className="profile-info">
                                        <p className="profile-type">{userProfile.accountType}</p>
                                        <p className="profile-email">{userProfile.email}</p>
                                        <p className="profile-phone">{userProfile.phoneNumber}</p>
                                        <p className="profile-address">{userProfile.addressName}</p>
                                    </div>
                                    {userProfile && userProfile.latitude && userProfile.longitude && (
                                        <div className="map-container">
                                            <MapComponent latitude={userProfile.latitude} longitude={userProfile.longitude} />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <Footer />
                    </div>
                </div>
            ) : (
                <div></div>
            )
        )
    );
    
    
}

export default ProfilePage;
