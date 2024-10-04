<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let item = {
    name: '',
    email: '',
    body: '',
    // other properties as necessary...
  };
    //export let showModal: boolean;
    // export let onClose: () => void;
    // export let onUpdate: (updatedItem: any) => void;
  
    let updatedName = item.name;
    let updatedEmail = item.email;
    let updatedBody = item.body;
  
    const handleUpdate = () => {
    dispatch('update', { ...item }); // Dispatch update event with updated data
    dispatch('close'); // Close modal after update
  };

  const handleClose = () => {
    dispatch('close'); // Dispatch close event
  };

  </script>
  
  <div class="modal" on:click={handleClose}>
    <div class="modal-content" on:click|stopPropagation>
      <h2>Update Item</h2>
  
      <label>Name:</label>
      <input type="text" bind:value={item.name} />
  
      <label>Email:</label>
      <input type="email" bind:value={item.email} />
  
      <label>Body:</label>
      <textarea bind:value={item.body}></textarea>
  
      <button on:click={handleUpdate}>Update</button>
      <button on:click={handleClose}>Cancel</button>
    </div>
  </div>
  
<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Ensure it's above everything else */
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
    max-width: 100%;
  }
</style>
  