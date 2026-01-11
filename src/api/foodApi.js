const API_URL = 'http://localhost:3000/api/foods';

export const getFoods = async () => {
    const response = await fetch(API_URL);
    if (!response) throw new Error('Network response was not ok');
    return response.json();
};

export const createFood = async (food) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify(food)
    });
    return response.json();
}

export const updateFood = async (food) => {
    const response = await fetch(API_URL, {
       method: 'PUT',
       headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(food)  
    });

    if (response.status === 409) {
        const errorData = await response.json();
        throw new Error(error.message || '')
    }

    if (!response.ok) throw new Error('Failed to update food');

    return response.json();
}