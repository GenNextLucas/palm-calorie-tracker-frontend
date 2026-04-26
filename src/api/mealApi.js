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

  export const fetchMealById = async (id) => {
    try {
      // Constructs the URL: http://localhost:3000/api/meals/:id
      const response = await fetch(`${api}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        // If the controller returns 404 or 400, this catches it
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }
  
      const meal = await response.json();
      return meal; // This returns your formatted MealResponseDTO
    } catch (error) {
      console.error(`Failed to fetch meal with id ${id}:`, error);
      throw error; // Rethrow so your UI (Toast) can catch it
    }
};


export const updateMeal = async (id, mealData) => {
  try {
      const response = await fetch(`${api}/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(mealData),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to update meal');
      }

      const updatedMeal = await response.json();
      return updatedMeal;
  } catch (error) {
      console.error(`Failed to update meal with id ${id}:`, error);
      throw error; // Rethrow to handle the error in the component/thunk
  }
};