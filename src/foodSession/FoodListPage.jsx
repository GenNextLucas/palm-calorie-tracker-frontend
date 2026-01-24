import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FoodList from './FoodList';
import FoodInputForm from './FoodInputForm';
import { CustomModal } from '../general/CustomModal';
import { fetchFoods, removeFood, addFood, editFood } from '../store/foodSlice';
import { toast } from 'react-toastify';
import '../App.css';

function FoodListPage() {
    const dispatch  = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [foodIdDelete, setFoodIdDelete] = useState(null);
    const[food, setFood] = useState({});

    const foodItems = useSelector((state) => state.foods.items);
    
      useEffect(() => {
        dispatch(fetchFoods())
      }, [dispatch]);
    
    
      const handleAddFood = async (newItem) => {
        try {
          await dispatch(addFood(newItem)).unwrap();
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
          const response = await dispatch(removeFood(foodIdDelete)).unwrap();
          
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
          await dispatch(editFood(food)).unwrap();
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