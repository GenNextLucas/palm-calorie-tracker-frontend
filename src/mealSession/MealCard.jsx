import React from 'react';
import { fetchMealById } from '../store/mealSlice';
import { useDispatch } from 'react-redux';

const MealCard = ({ meal }) => {
  const dispatch = useDispatch();  
  
  const handleEdit = (e) => {
    e.stopPropagation();
    dispatch(fetchMealById(meal.id));
  };
    
    return (
      <div className="meal-card-mini" onClick={(e) => handleEdit(e)}>
        <div className="mini-header">
          <h4>{meal.name}</h4>
          <span className="mini-badge">{meal.calories} kcal</span>
        </div>
      
        <p className="mini-foods">{meal.foodItems.join(', ')}</p>
  
        <div className="mini-macros">
          <span className="p-dot">P: {meal.protein}g</span>
          <span className="c-dot">C: {meal.carbs}g</span>
          <span className="f-dot">F: {meal.fat}g</span>
        </div>
      </div>
    );

};

  export default MealCard;