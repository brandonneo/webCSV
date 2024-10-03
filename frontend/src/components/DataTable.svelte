<script lang="ts">
  import { onMount } from 'svelte';
  import { dataStore, fetchData } from '../stores/dataStore'; // Ensure this path is correct

  // Fetch data on component mount
  onMount(() => {
    fetchData(); // Call fetchData to populate dataStore
  });
</script>

{#if $dataStore.length > 0}
  <table>
    <thead>
      <tr>
        <th>Post ID</th>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Body</th>
      </tr>
    </thead>
    <tbody>
      {#each $dataStore as item}
        <tr>
          <td>{item.postId}</td>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.body}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p>No data available.</p>
{/if}
