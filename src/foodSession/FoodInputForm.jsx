import React, { useEffect, useState } from 'react';

function FoodInputForm({ onAddFood, onEditFood, food }) {
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [carbs, setCarbs] = useState('');
    const [refVal, setRefVal] = useState('');
    const [uom, setUom] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');


    useEffect(() => {
      if(food.id) {
        setFoodName(food.name);
        setCalories(food.calories);
        setCarbs(food.carbs);
        setProtein(food.protein);
        setFat(food.fat);
        setRefVal(food.refVal);
        setUom(food.uom);
      } else {
        setFoodName('');
        setCalories('');
        setCarbs('');
        setProtein('');
        setFat('');
        setRefVal('');
        setUom('');
      }
    }, [food])

    const handleAddFood = () => {
        if (food.id) {
          const editedItem = {
            id: food.id,
            name: foodName,
            calories: parseFloat(calories),
            carbs: parseFloat(carbs),
            protein: parseFloat(protein),
            fat: parseFloat(fat),refVal: parseFloat(refVal),
            uom: uom
          }
          onEditFood(editedItem);
        } else {
          if (foodName && calories && carbs && protein && fat && refVal && uom) {
            const newItem = {
              id: 0,
              name: foodName,
              calories: parseFloat(calories),
              carbs: parseFloat(carbs),
              protein: parseFloat(protein),
              fat: parseFloat(fat),
              refVal: parseFloat(refVal),
              uom: uom
            }
    
            onAddFood(newItem);

            setFoodName('');
            setCalories('');
            setCarbs('');
            setProtein('');
            setFat('');
            setRefVal('');
            setUom('');
          }
        }
      }

      const unitsOfMeasure = [
        //{ value: 'blank', label: '' },
        { value: 'g', label: 'gramas (g)' },
        { value: 'ml', label: 'mililitro (ml)' },
        { value: 'unit', label: 'unit' },
        { value: 'xicara', label: 'xicara' },
        { value: 'copo', label: 'copo' },
        { value: 'colher de sopa', label: 'colher de sopa' },
        { value: 'colher de cha', label: 'colher de cha' },
        { value: 'oz', label: 'ounces (oz)' },
        { value: 'lb', label: 'pounds (lb)' }
      ];


    return (
    
     <div className='meal-form'>
        <h2>Add/Edit food</h2>
        <div className="input-group">
          <label>Food Name</label>
          <input
          type="text"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)} 
          required />
        </div>

        <div className='input-group'>
          <label>Calories</label>
          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            required />
        </div>
        
        <div className='input-group'>
          <label>Protein</label>
          <input
            type="number"
            placeholder="Protein"
            value={protein}
            onChange={(e) => setProtein(e.target.value)} 
            required />
        </div>

        <div className='input-group'>
          <label>Carb</label>
          <input
            type="number"
            placeholder="Carb"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            required />
        </div>
    
        <div className='input-group'>
          <label>Fat</label>
          <input
            type="number"
            placeholder="Fat"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            required />
        </div>
        
        <div className='input-group'>
          <label>Ref Value</label>
          <input
            type="number"
            placeholder="Ref Value"
            value={refVal}
            onChange={(e) => setRefVal(e.target.value)}
            required />
        </div>
        
        <div className='input-group'>
          <label>Unit</label>
          <select
            value={uom}
            onChange={(e) => setUom(e.target.value)}
            className="unit-select"
            required>
              <option value="" disabled>Select Unit</option> 
                {unitsOfMeasure.map((uomOption) => (
                  <option key={uomOption.value} value={uomOption.value}>
                    {uomOption.label}
                  </option>
              ))}
          </select>
        </div>
        

        <button className="add-item-button" onClick={handleAddFood}>{ food.id ? 'Edit Food' : 'Add Food'}</button>
     </div>
     );
}

export default FoodInputForm;