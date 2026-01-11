import React, { useState, useEffect } from 'react';
import FoodList from './FoodList';
import FoodInputForm from './FoodInputForm';
import { getFoods, createFood, updateFood } from '../api/foodApi';
import { toast } from 'react-toastify';
import '../App.css';

function FoodListPage() {
    const [foodItems, setFoodItems] = useState([]);
    
      const[food, setFood] = useState({});
    
      useEffect(() => {
        getFoods()
            .then(data => setFoodItems(data))
            .catch(err => console.error(err));
      }, []);
    
    
      const handleAddFood = async (newItem) => {
        try {
          const savedFood = await createFood(newItem);
          setFoodItems((prevItems) => [...prevItems, savedFood]);
          toast.success(`${newItem.name} added successfully!`);
        } catch (error) {
          toast.error('Error adding food: ' + error.message);
        }
      }
    
      const handleDeleteFood = (id) => {
        setFoodItems(foodItems.filter(item => item.id !== id));
      };
    
      const handleFoodToUpdateDisplay = (id) => {
        const foundFood = foodItems.find(item => item.id === id);
        setFood(foundFood);
      }
    
      const handleFoodEdit = async (food) => {
        try {
          const updatedFood = await updateFood(food);
          const filteredFoods = foodItems.filter(item => item.id !== food.id);    
          setFoodItems([...filteredFoods, updatedFood]);
          setFood({});
          toast.success(`food updated successfully!`);
        } catch(error) {
          toast.error('Error adding food: ' + error.message);
        } 
      }
    
    
    return (
        <div className='food-page-container'>
            <FoodInputForm 
                onAddFood={handleAddFood} 
                onEditFood={handleFoodEdit} 
                food={food}/>

            <FoodList 
               foodItems={foodItems} 
               onDeleteFood={handleDeleteFood} 
               onFoodDisplay={handleFoodToUpdateDisplay}/>
        </div>

    );
}

export default FoodListPage;