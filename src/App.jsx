import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FoodListPage from './foodSession/FoodListPage';
import MealPage from './mealSession/MealPage';
import Navbar from './general/Navbar';



function App() {
  

  return (
    <Router>
        <Navbar />
        <div className="app-container">
          <ToastContainer position='bottom-right' autoClose={3000} />
          <Routes>
            <Route
             path="/"
             element={
              <FoodListPage />
             }
            />
            
            <Route
             path="/meals"
             element={
              <MealPage
                foodList={[]}
                onAddMeal={()=> {}}/>
             }/>
          </Routes>   
        </div>
    </Router>
    
  )
}

export default App
