<script lang="ts">
  import { onMount } from 'svelte';
  import { dataStore, fetchData, deleteData, updateData } from '../stores/dataStore'; // Ensure this path is correct
  import type { Data } from '../types'; // Adjust based on your type definitions
  import UpdateModal from './UpdateModal.svelte';



  let showModal = false;
  let currentItem: null;

  // Fetch data on component mount
  onMount(() => {
    fetchData(); // Call fetchData to populate dataStore
  });

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      await deleteData(id); // Call the delete function from your store
    }
  };

  const handleEdit = (item) => {
    currentItem = item;
    showModal = true;
  };

  const handleModalClose = () => {
    showModal = false;
  };

  const handleModalUpdate = (event) => {
    updateData(currentItem.id, event.detail); // Update data
    showModal = false; // Close modal after update
  };
</script>

{#if $dataStore.length > 0}
  <table>
    <thead>
      <tr>
  
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Body</th>
      </tr>
    </thead>
    <tbody>
      {#each $dataStore as item}
        <tr>
     
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.body}</td>
        </tr>
        <!-- <Button on:click={() => handleEdit(item)}>Update</Button>
          <Button on:click={() => handleDelete(item.id)}>Remove</Button> -->
          <button on:click={() => handleEdit(item)}>Update</button>
        <button on:click={() => handleDelete(item.id)}>Remove</button>
      {/each}
    </tbody>
  </table>
  {#if showModal}
  <UpdateModal 
    item={currentItem} 
    on:close={handleModalClose} 
    on:update={handleModalUpdate} 
  />
{/if}
{:else}
  <p>No data available.</p>
{/if}
