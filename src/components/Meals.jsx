import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

export default function Meals() {

    const {
        data: loadedMeals, isLoading, error
    } = useHttp('http://localhost:3000/meals', {}, [])
    // const [loadedMeals, setLoadedMeals] = useState([]);

    // useEffect(() => {
        // async function fetchMeals() {
        //     try {
        //         const response = await fetch('http://localhost:3000/meals');
    
        //         if (!response.ok) {
        //             console.group("Meals not fetched from Backend!");
        //         }
    
        //         const meals = await response.json();
        //         setLoadedMeals(meals);
        //     } catch {
    
        //     }
        // }
    
    //     fetchMeals();
    // }, []);

    if (isLoading) {
        return (
            <p>Fetching meals!</p>
        )
    }
    return (
        <>
            <ul id="meals">
                {loadedMeals.map((meal) => {
                    return (
                        <MealItem key={meal.id} meal={meal}/>
                    )
                })}
            </ul>
        </>
    )
}