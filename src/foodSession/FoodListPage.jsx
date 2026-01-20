import React, { useState, useEffect } from 'react';
import FoodList from './FoodList';
import FoodInputForm from './FoodInputForm';
import { CustomModal } from '../general/CustomModal';
import { getFoods, createFood, updateFood, deleteFood } from '../api/foodApi';
import { toast } from 'react-toastify';
import '../App.css';

function FoodListPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [foodIdDelete, setFoodIdDelete] = useState(null);
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
    
      const handleDeleteClick = (id) => {
        setFoodIdDelete(id);
        setIsModalOpen(true);
      }
      
      const handleDeleteFood = async () => {
        try {
          const response = await deleteFood(foodIdDelete);
          debugger;
          setFoodItems(foodItems.filter(item => item.id !== foodIdDelete));
          setFoodIdDelete(null);
          setIsModalOpen(false);
          toast.success(response.message);
        } catch (error) {
          toast.error(`Error: ${error.message}`);
        }
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
               onDeleteFood={handleDeleteClick} 
               onFoodDisplay={handleFoodToUpdateDisplay}/>

            <CustomModal
              isOpen={isModalOpen}
              title='Are you sure?'
              message={`This will permanently remove this food from your list.`}
              onConfirm={handleDeleteFood}
              onCancel={() => setIsModalOpen(false)}
              />
        </div>

    );
}

export default FoodListPage;