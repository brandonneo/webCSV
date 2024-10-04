<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    let file: File | null = null;
    let uploading: boolean = false; // Add uploading state
    let errorMessage: string | null = null; // To store error messages
  
    const uploadFile = async () => {
      if (!file) {
        alert('Please select a file.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      uploading = true; // Start uploading
      errorMessage = null; // Reset error message
  
      try {
        const response = await fetch('http://localhost:3001/csv/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          console.log(response);
          // Handle success
          dispatch('uploadSuccess');
          alert('Upload successful!'); // Notify user
        } else {
          // Handle server errors
          const errorResponse = await response.json();
          errorMessage = errorResponse.message || 'Upload failed.';
        }
      } catch (error) {
        // Handle network errors
        errorMessage = 'Upload failed: ' + error.message;
      } finally {
        uploading = false; // End uploading
      }
    };
  </script>
  
  <input type="file" accept=".csv" on:change={(e) => (file = e.target.files[0])} />
  <button on:click={uploadFile} disabled={uploading}>
    {uploading ? 'Uploading...' : 'Upload CSV'}
  </button>
  
  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}
  