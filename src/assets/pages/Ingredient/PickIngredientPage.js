import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarCustomer from '../../components/sidebar/SidebarCustomer';
import Footer from '../../components/footer/Footer';
import './IngredientPage.css'; // Import custom styles

const Ingredients = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [userProfile, setUserProfile] = useState({});
    const [ingredientInputDTO, setIngredientInputDTO] = useState({
        listIngredient: [],
        priority: 'none',
        numberOfChicken: '',
        animalName: 'chicken'
    });
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch user profile
        if (!token) {
            navigate('/login');
        } else {
            fetchUserProfile(token);
        }
    }, [token, navigate]);

    useEffect(() => {
        // Fetch ingredient list
        if (token) {
            fetchIngredientList(token);
            console.log(ingredientInputDTO);
        }
    }, [token]);

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
            } else {
                console.error('Failed to fetch user profile');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            navigate('/logout');
        }
    };

    const fetchIngredientList = async (token) => {
        try {
            const response = await fetch('http://localhost:8081/api/v2/provider-ingredients/ingredient-amount', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const ingredientListFetch = await response.json();
                setIngredientInputDTO(prevState => ({
                    ...prevState,
                    listIngredient: ingredientListFetch
                }));
            } else {
                console.error('Failed to fetch ingredient list');
                navigate('/logout');
            }
        } catch (error) {
            console.error('Error fetching ingredient list:', error);
            navigate('/login');
        }
    };

    const handleCheckAll = (event) => {
        const { checked } = event.target;
        setIngredientInputDTO(prevState => ({
            ...prevState,
            listIngredient: prevState.listIngredient.map(ingredient => ({
                ...ingredient,
                checked: checked
            }))
        }));
    };

    const handleMinAmountChange = (index, event) => {
        const { value } = event.target;
        const newMinAmount = parseInt(value);
        const maxAmount = ingredientInputDTO.listIngredient[index].totalAmount;
        
        if (newMinAmount > maxAmount) {
            alert('Min amount cannot be greater than max amount');
            return;
        }
    
        setIngredientInputDTO(prevState => ({
            ...prevState,
            listIngredient: prevState.listIngredient.map((ingredient, idx) => idx === index ? { ...ingredient, minAmount: value } : ingredient)
        }));
    };
    
    const handleRowClick = (index) => {
        const updatedList = [...ingredientInputDTO.listIngredient];
        updatedList[index].checked = !updatedList[index].checked;
        setIngredientInputDTO(prevState => ({
            ...prevState,
            listIngredient: updatedList
        }));
    };    

    const handleCheckboxChange = (index, event) => {
        const { checked } = event.target;
        setIngredientInputDTO(prevState => ({
            ...prevState,
            listIngredient: prevState.listIngredient.map((ingredient, idx) => idx === index ? { ...ingredient, checked: checked } : ingredient)
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const checkedIngredientsCount = ingredientInputDTO.listIngredient.filter(ingredient => ingredient.checked).length;
    
        if (checkedIngredientsCount < 2) {
            alert('Please pick at least two ingredients.');
            return;
        }

        var checkedIngredients = ingredientInputDTO.listIngredient.filter(ingredient=>ingredient.checked);
        var request = {
            listIngredient : [],
            priority : ingredientInputDTO.priority,
            numberOfChicken : parseInt(ingredientInputDTO.numberOfChicken),
            animalName : ingredientInputDTO.animalName,
            listIngredientIdFixedMinAmount : [],
            nutritionRequirement : null
        };
        var listIngredient = [];
        for (var ingredient_index in checkedIngredients) {
            if (!checkedIngredients[ingredient_index].hasOwnProperty('minAmount') ) {
                listIngredient.push({
                    "ingredient": {
                        "id" : checkedIngredients[ingredient_index].ingredient.id
                    },
                    "maxAmount" : checkedIngredients[ingredient_index].totalAmount,
                    "minAmount" : 0
                });
            } else {
                let minAmount = 0;
                
                if (checkedIngredients[ingredient_index].minAmount === '' || checkedIngredients[ingredient_index].minAmount === undefined) {
                    
                } else {
                    minAmount = parseInt(checkedIngredients[ingredient_index].minAmount);
                    request.listIngredientIdFixedMinAmount.push(checkedIngredients[ingredient_index].ingredient.id)
                    if (minAmount === checkedIngredients[ingredient_index].totalAmount) {
                        minAmount = minAmount-1;
                    }
                }
                
                listIngredient.push({
                    "ingredient": {
                        "id" : checkedIngredients[ingredient_index].ingredient.id
                    },
                    "maxAmount" : checkedIngredients[ingredient_index].totalAmount,
                    "minAmount" : minAmount
                })
            }
        }
        // console.log(listIngredient);
        request.listIngredient = listIngredient;
        console.log(request);
        navigate('/optimal-ingredients', { state: { requestData: request } });
        // Your form submission logic here
    };

    return (
        <>
            <SidebarCustomer />
            <div className="content-container mt-5">
                <h1 className="heading">利用可能な材料</h1>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="checkAllIngredients"
                        checked={ingredientInputDTO.listIngredient.every(ingredient => ingredient.checked)}
                        onChange={handleCheckAll}
                    />
                    <label className="form-check-label" htmlFor="checkAllIngredients">全て選択</label>
                </div>

                <form onSubmit={handleSubmit}>
                    <table className="ingredient-table">
                        <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Max Amount</th>
                                <th>Min Amount</th>
                                <th>Pick</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredientInputDTO.listIngredient.map((ingredient, index) => (
                                <tr key={index} className={ingredient.checked ? 'form-check selected-row' : 'form-check'} onClick={() => handleRowClick(index)}>
                                    <td>{ingredient.ingredient.ingredientName}</td>
                                    <td>{ingredient.totalAmount}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={ingredient.minAmount}
                                            onChange={(event) => handleMinAmountChange(index, event)}
                                            min="0"
                                            className="form-control"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={ingredient.checked}
                                            onChange={(event) => handleCheckboxChange(index, event)}
                                            className="ingredient-checkbox"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="form-group">
                        <label htmlFor="priority">Choose Priority:</label>
                        <select id="priority" value={ingredientInputDTO.priority} onChange={(event) => setIngredientInputDTO(prevState => ({ ...prevState, priority: event.target.value }))} className="form-control">
                            <option value="none">None</option>
                            <option value="protein">Protein</option>
                            <option value="fat">Fat</option>
                            <option value="fiber">Fiber</option>
                            <option value="ash">Ash</option>
                            <option value="calcium">Calcium</option>
                            <option value="phosphor">Phosphor</option>
                            <option value="energy">Energy</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="numberOfChicken">Number of Animal:</label>
                        <input type="number" id="numberOfChicken" value={ingredientInputDTO.numberOfChicken} onChange={(event) => setIngredientInputDTO(prevState => ({ ...prevState, numberOfChicken: event.target.value }))} required className="form-control" />

                        <label htmlFor="animalName">Select animal:</label>
                        <select id="animalName" value={ingredientInputDTO.animalName} onChange={(event) => setIngredientInputDTO(prevState => ({ ...prevState, animalName: event.target.value }))} className="form-control">
                            <option value="chicken">鳥</option>
                            <option value="pig">豚</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Ingredients;
