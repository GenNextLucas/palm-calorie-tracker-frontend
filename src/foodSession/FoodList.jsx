import React, { useMemo } from 'react';

function FoodList({ foodItems, onDeleteFood, onFoodDisplay }) {

    const sortedFoods = useMemo(() => {
      return [...foodItems].sort((a,b) => b.id - a.id);
    }, [foodItems]);

    return (
      <div className="food-list">
        <h3>Logged Foods:</h3>
        {foodItems.length === 0 ? (
            <p className="no-food-message">No food logged yet. Add some!</p>
        ) : 
    
        (  sortedFoods.map((item) => (
                <div key={item.id} className="food-item">
                  <div className='food-info'>
                    <span className='food-name'>{item.name}</span>
                    <div className='food-stats'>
                      <span className="badge badge-calories"> {item.calories} kcal</span>
                      <span className="badge"> P: {item.protein}g</span>
                      <span className="badge"> C: {item.carbs}g</span>
                      <span className="badge"> F: {item.fat}g</span>
                    </div>
                  </div>
                  
                  
                  <div className="action-control">
                      <button className="edit-button" onClick={() => onFoodDisplay(item.id)}>Edit</button>
                      <button className="delete-button" onClick={() => onDeleteFood(item.id)}>Delete</button>
                  </div>
                </div>
            )))
    }
  </div>);

}

export default FoodList