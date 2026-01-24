import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MealForm from './MealForm';
import MealPreviewList from './MealPreviewList';
import '../App.css';


function MealPage() {
    const fullState = useSelector((state) => state);
    const foodList = useSelector((state) => state.foods.items);
    
    console.log("Full Redux State:", fullState);
    console.log("MealPage foodList:", foodList);
    
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [mealName, setMealName] = useState('');

    const handleSubmit = () => {
        if(mealName) {
           onAddMeal({
             id: Date.now(),
             name: mealName,
             foods: []
           });
        }
    };

    const handleMealNameChange = (newName) => {
      setMealName(newName)
    }

    const handleDeleteFoods = (foodId) => {
      setSelectedFoods(selectedFoods.filter(item => item.id !== foodId));
    } 

    const addSelectedFoods = (foodItem) => {
      setSelectedFoods((prevItems) => [...prevItems, foodItem]);
    }

    return(
        <div className="page-container">
            <h2>Log Your Meals</h2>
            <MealForm 
               onAddMeal={() => {}} 
               onMealNameChange={handleMealNameChange} 
               mealName={mealName} 
               foodList={foodList} 
               onAddSelectedFood={addSelectedFoods}/>
            <MealPreviewList mealName={mealName} mealFoods={selectedFoods} onSelectedFoodDelete={handleDeleteFoods} />
            <button className='add-meal-button'>Add Meal</button>
        </div>
    );
}

export default MealPage;