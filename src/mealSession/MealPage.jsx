import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MealForm from './MealForm';
import MealPreviewList from './MealPreviewList';
import '../App.css';
import { toast } from 'react-toastify';
import { addMeal, fetchMeals } from '../store/mealSlice';
import { fetchFoods } from '../store/foodSlice';


function MealPage() {
    const dispatch = useDispatch();

    const foodList = useSelector((state) => state.foods.items);
    
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [mealName, setMealName] = useState('');

    useEffect(() => {
      dispatch(fetchMeals())
      debugger;
      
      if (foodList.length === 0) {
        dispatch(fetchFoods())
      }
    }, [dispatch]);

    const handleSubmit = async () => {
      const mealData = {
        name: mealName || "New Meal",
        items: selectedFoods.map(item => ({
          id: item.originalFoodId, // Mapping back to the Food ID
          name: item.name,
          calories: item.calories,
          protein: item.protein,
          carbs: item.carbs,
          fat: item.fat,
          quantity: item.quantity,
          uom: item.unit
        }))
      };

      try {
        await dispatch(addMeal(mealData)).unwrap();
        toast.success(`the meal ${mealName} was successfully`);
        setSelectedFoods([]);
        setMealName('');
      } catch (error) {
        toast.error('Error adding meal:');
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
       <div>
         <h1>Log your meals</h1>
          <div className="page-container">
              <MealForm 
                 onAddMeal={() => {}} 
                 onMealNameChange={handleMealNameChange} 
                 mealName={mealName} 
                 foodList={foodList} 
                 onAddSelectedFood={addSelectedFoods}/>
              <MealPreviewList mealName={mealName} mealFoods={selectedFoods} onSelectedFoodDelete={handleDeleteFoods} />
              <button className='add-meal-button' onClick={handleSubmit}>Add Meal</button>
          </div>
        </div>
    );
}

export default MealPage;