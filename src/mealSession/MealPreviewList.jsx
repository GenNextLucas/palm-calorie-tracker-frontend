import React, { useState, useEffect } from 'react';

function MealPreviewList({ mealName, mealFoods, onSelectedFoodDelete }) {
    const handleRemoveFood = (foodId) => {
        onSelectedFoodDelete(foodId);
        console.log('todo remove food id ', foodId);
    }

    const totals = mealFoods.reduce((acc, food) => {
        return {
          calories : acc.calories + (Number(food.calories) || 0),
          protein: acc.protein + (Number(food.protein) || 0),
          carbs: acc.carbs + (Number(food.carbs) || 0),
          fat: acc.fat + (Number(food.fat) || 0)
        };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
    
    return (
      <>
         {mealFoods.length > 0 && (
         <div className="meal-items-preview">
             <h4>Items in {mealName || 'New Meal'} ({mealFoods.length}):</h4>
             <ul className="meal-items-list">
                {mealFoods.map(food => (
                  <li key={food.id} className="meal-preview-item">
                    <span className="item-details">
                        {food.name}: {food.quantity}{food.unit} ({food.calories} kcal)
                    </span>
                    <button 
                       className="remove-item-button"
                       onClick={() => handleRemoveFood(food.id)}
                       title="Remove item">
                       X
                   </button>
                  </li>
             ))}
           </ul>

             <div className='meal-summary-footer'>
                  <div className="total-calories">
                    <strong>Total: {totals.calories} kcal</strong>
                  </div>
                  
                  <div className="macro-grid">
                    
                     <div className="macro-item">
                       <span className="macro-label">Protein:</span>
                        <span className="macro-value">{totals.protein}g</span>
                     </div>
                      
                      <div className="macro-item">
                        <span className="macro-label">Carb:</span>
                        <span className="macro-value">{totals.carbs}g</span>
                      </div>
                      
                      <div className="macro-item">
                        <span className="macro-label">Fat:</span>
                        <span className="macro-value">{totals.fat}g</span>
                      </div>
                   </div>
             </div>

          </div>) }
          </>
    );
    

}

export default MealPreviewList;