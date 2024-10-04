<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let item: any; // The item to update
    export let showModal: boolean;
    export let onClose: () => void;
    export let onUpdate: (updatedItem: any) => void;
  
    let updatedName = item.name;
    let updatedEmail = item.email;
    let updatedBody = item.body;
  
    const handleUpdate = () => {
      const updatedData = { ...item, name: updatedName, email: updatedEmail, body: updatedBody };
      onUpdate(updatedData);
      onClose(); // Close modal after updating
    };
  </script>
  
  {#if showModal}
    <div class="modal">
      <div class="modal-content">
        <h2>Update Item</h2>
        <label>
          Name:
          <input type="text" bind:value={updatedName} />
        </label>
        <label>
          Email:
          <input type="text" bind:value={updatedEmail} />
        </label>
        <label>
          Body:
          <textarea bind:value={updatedBody}></textarea>
        </label>
        <button on:click={handleUpdate}>Update</button>
        <button on:click={onClose}>Cancel</button>
      </div>
    </div>
  {/if}
  
  <style>
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }
  </style>
  