import '../App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MealForm from './MealForm';
import MealPreviewList from './MealPreviewList';
import MealHistoryList from './MealHistoryList';
import { toast } from 'react-toastify';
import { addMeal, fetchMeals, clearSelectedMeal, updateMeal } from '../store/mealSlice';
import { fetchFoods } from '../store/foodSlice';


function MealPage() {
    const dispatch = useDispatch();

    const { selectedMeal } = useSelector((state) => state.meals);
    const foodList = useSelector((state) => state.foods.items);
    
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [mealName, setMealName] = useState('');
    const [showHistory, setShowHistory] = useState(false);

    const [editingFoodId, setEditingFoodId] = useState(null);
    const [newQuantity, setNewQuantity] = useState('');

    const handleUpdateQuantity = (foodId, newQty) => {
      const parsedQuantity = Number(newQty);
      
    // 1. Find the item and the base data first
    const targetItem = selectedFoods.find(item => item.id === foodId);
    if (!targetItem) return;

    const baseFood = foodList.find(f => f.id === (targetItem.originalFoodId || targetItem.id));
    if (!baseFood) return;

    // 2. Prepare the calculated values
    const scaleFactor = parsedQuantity / baseFood.refVal;
    
    const updatedMacros = {
        calories: Math.round(baseFood.calories * scaleFactor),
        protein: Math.round(baseFood.protein * scaleFactor * 10) / 10,
        carbs: Math.round(baseFood.carbs * scaleFactor * 10) / 10,
        fat: Math.round(baseFood.fat * scaleFactor * 10) / 10,
    };
      
    setSelectedFoods(prev => prev.map(item => 
      item.id === foodId 
          ? { ...item, quantity: parsedQuantity, ...updatedMacros } 
          : item
    ));
    
    setEditingFoodId(null); // Exit edit mode
  };


    useEffect(() => {
      dispatch(fetchMeals())
      
      if (foodList.length === 0) {
        dispatch(fetchFoods())
      }
    }, [dispatch]);

    useEffect(() => {
      if (selectedMeal) {
        setMealName(selectedMeal.name);
        setSelectedFoods(selectedMeal.items); 
      }
    }, [selectedMeal]);

    const handleSubmit = async () => {
      const mealData = {
        ...(selectedMeal && {id: selectedMeal.id}),
        name: mealName || "New Meal",
        items: selectedFoods.map(item => ({
          id: item.id || item.originalFoodId, // Mapping back to the Food ID
          name: item.name,
          calories: item.calories,
          protein: item.protein,
          carbs: item.carbs,
          fat: item.fat,
          quantity: item.quantity,
          uom: item.uom || item.unit
        }))
      };

      try {
        if (selectedMeal) {
          await dispatch(updateMeal({id: selectedMeal.id, mealData } )).unwrap();
          dispatch(clearSelectedMeal());
          toast.success(`The meal ${mealName} was updated successfully!`);
        } else {
          await dispatch(addMeal(mealData)).unwrap();
          toast.success(`the meal ${mealName} was added successfully`);
        }

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
      <div className="meal-page-layout">
        <div className="button-group">
          {!showHistory && (
            <button className="add-diet-schedule-btn" onClick={() => setShowHistory(true)}>
              Add Diet Schedule
            </button>
          )}
        </div>
  
      <div className={`content-wrapper ${showHistory ? 'history-open' : ''}`}>
        
        <div className="form-section">
          <h1>Log your meals</h1>
          <MealForm 
             onMealNameChange={handleMealNameChange} 
             mealName={mealName} 
             foodList={foodList} 
             onAddSelectedFood={addSelectedFoods} 
          />
          <MealPreviewList 
             mealName={mealName} 
             mealFoods={selectedFoods} 
             onSelectedFoodDelete={handleDeleteFoods}
             onUpdateFoodQuantity={handleUpdateQuantity} // New prop
             editingFoodId={editingFoodId}
             setEditingFoodId={setEditingFoodId}
          />
          <button className='add-meal-button' onClick={handleSubmit}>{selectedMeal ? 'Update Meal' : 'Add Meal'}</button>
        </div>
  
        {showHistory && (
          <div className="history-section-sidebar">
            <MealHistoryList onClose={() => setShowHistory(false)} />
          </div>
        )}
       </div>
     </div>
    );
}

export default MealPage;