const api = 'http://localhost:3000/api/meals';

export const saveMeal = async (mealData) => {
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mealData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save meal');
      }
  
      const createdMeal = await response.json();
      return createdMeal;
    } catch (error) {
      console.error("Failed to save meal:", error);
    }
};

export const fetchMeals = async () => {
    try {
      const response = await fetch(api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const meals = await response.json();
      return meals; // This will return an array of MealDTOs
    } catch (error) {
      console.error("Failed to fetch meals:", error);
    }
  };