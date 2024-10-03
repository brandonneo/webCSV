// src/stores/dataStore.ts
import { writable } from 'svelte/store';

// Create a writable store for holding CSV data
export const dataStore = writable<any[]>([]);

// Function to fetch data from the backend
export const fetchData = async () => {
  const response = await fetch('http://localhost:3000/csv');
  if (response.ok) {
    const data = await response.json();
    dataStore.set(data);
  } else {
    console.error('Failed to fetch data:', response.status);
  }
};
