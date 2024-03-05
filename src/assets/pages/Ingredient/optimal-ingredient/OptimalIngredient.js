import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SidebarCustomer from '../../../components/sidebar/SidebarCustomer';
import Footer from '../../../components/footer/Footer';

const OptimalIngredients = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const [nutritionRequirement, setNutritionRequirement] = useState({});
    const [optimalIngredientsResponse, setOptimalIngredientsResponse] = useState({});
    
    const requestData = location.state.requestData;
    console.log("request data", requestData);

    useEffect(() => {
        // Fetch user profile
        if (!token) {
            navigate('/login');
        } else {
            console.log(requestData);
            calculateOptimalIngredients(requestData);
        }
    }, [token, navigate]);

    const fetchNutritionRequirement = async (animalName) => {
        try {
            const response = await fetch(`http://localhost:8081/api/v2/nutrition-requirement/${animalName}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const nutritionRequirement = await response.json();
                console.log(nutritionRequirement);
                setNutritionRequirement(nutritionRequirement);
            } else {
                console.error('Failed to fetch nutrition requirement');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetch nutrition requirement:', error);
            navigate('/logout');
        }
    }

    const calculateOptimalIngredients = async (request) => {
        console.log("request ", request);
        try {
            
            const response = await fetch('http://localhost:8081/api/v2/ingredient-optimizer', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    listIngredient : request.listIngredient, 
                    animalName : request.animalName,
                    priority : request.priority,
                    numberOfChicken : request.numberOfChicken,
                    listIngredientIdFixedMinAmount : request.listIngredientIdFixedMinAmount,
                    nutritionRequirement : null
                })
            });
            if (response.ok) {
                const optimalIngredients = await response.json();
                console.log(optimalIngredients);
                setOptimalIngredientsResponse(optimalIngredients);
            } else {
                console.error('Failed to calculate optimal ingredients');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error calculate optimal ingredients:', error);
            navigate('/logout');
        }
    }

    return (
        <>
            <SidebarCustomer />
            <h1> HI </h1>
            <Footer />
        </>
    )
}

export default OptimalIngredients;