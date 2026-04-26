import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MealCard from './MealCard';


const MealHistoryList = ({ onClose }) => {
  const meals = useSelector((state) => state.meals.items);

  return (
    <div>
      <div className="history-header">
        <h2>Diet Schedule / History</h2>
        <button onClick={onClose} className="close-button">Close</button>
      </div>

    <div className="overlay-split-content">
    
      <div className="calendar-column">
          {/* Your Calendar Component goes here */}
      </div>

    
      <div className="history-column-mini">
          {meals.map((meal, index) => (
              <MealCard key={index} meal={meal} />
          ))}
      </div>
    </div>   

    </div>
  );
};

export default MealHistoryList;