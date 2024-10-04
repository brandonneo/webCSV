// src/stores/dataStore.ts
import { writable } from "svelte/store";

// Create a writable store for holding CSV data
export const dataStore = writable<any[]>([]);

// Function to fetch data from the backend
export const fetchData = async () => {
  const response = await fetch("http://localhost:3001/csv");
  if (response.ok) {
    const data = await response.json();
    dataStore.set(data);
  } else {
    console.error("Failed to fetch data:", response.status);
  }
};
// Function to delete data by UID
export const deleteData = async (uid: number) => {
  const response = await fetch(`http://localhost:3001/csv/delete/${uid}`, {
    method: "DELETE",
  });
  if (response.ok) {
    // Refresh data after successful deletion
    fetchData();
  } else {
    console.error("Failed to delete data:", response.status);
  }
};

// Function to update data
export const updateData = async (uid: number, updatedData: any) => {
  const response = await fetch(`http://localhost:3001/csv/update/${uid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (response.ok) {
    // Refresh data after successful update
    fetchData();
  } else {
    console.error("Failed to update data:", response.status);
  }
};
