import React, { useState } from 'react';

function MealForm({onMealNameChange, onAddMeal, mealName, foodList, onAddSelectedFood}) {
    const [selectedFoodId, setSelectedFoodId] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleFoodSubmitSelection = () => {
      const selectedFood = foodList.find(food => food.id === parseInt(selectedFoodId));
      const parsedQuantity = parseFloat(quantity);
      const scaleFactor = selectedFood.refVal > 0 ? parsedQuantity / selectedFood.refVal : 0;

      const foodInstance = {
        // Unique ID for this instance
        id: Date.now(),
        name: selectedFood.name,
        calories: Math.round(selectedFood.calories * scaleFactor),
        carbs: Math.round(selectedFood.carbs * scaleFactor * 10) / 10,
        protein: Math.round(selectedFood.protein * scaleFactor * 10) / 10,
        fat: Math.round(selectedFood.fat * scaleFactor * 10) / 10,
        quantity: parsedQuantity,
        unit: selectedFood.unit,
        originalFoodId: selectedFood.id,
      };

      onAddSelectedFood(foodInstance)

      setSelectedFoodId('');
      setQuantity('');

    }
    
    return (
        <div className="meal-form">
            
            <div className="input-group">
                <label>Meal Name</label>
                <input 
                    type="text"
                    placeholder="Enter Meal Name (e.g, Breakfast)"
                    value={mealName}
                    onChange={(e) => onMealNameChange(e.target.value)}/>
            </div>
            
            
            <div className="input-group">
                <label>Food Name</label>
                <select
                    value={selectedFoodId}
                    onChange={(e) => setSelectedFoodId(e.target.value)}>
                    <option value="" disabled>Select a Food</option>
                        {foodList.map(food => (
                            <option key={food.id} value={food.id}>
                                {food.name} ({food.calories} kcal per {food.refVal} {food.uom})
                    </option>
                    ))}
                </select>
            </div>

            <div className="input-group">
                <label>Quantity</label>
                <input 
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="0.1"
                    step="0.1"
                    required
                />
            </div>
            
            <button onClick={handleFoodSubmitSelection} className="add-item-button">Add Item</button>  
        </div>
    );
}

export default MealForm;