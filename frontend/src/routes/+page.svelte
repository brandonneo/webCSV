<script lang="ts">
    import Upload from '../components/Upload.svelte';
    import DataTable from '../components/DataTable.svelte';
    
    let dataRefreshNeeded = false;

    const handleUploadSuccess = () => {
    dataRefreshNeeded = true; // Trigger data refresh
    };
</script>

<div class="app-container">
    <h1>CSV Data Uploader</h1>
    <Upload on:uploadSuccess={handleUploadSuccess}/>
    <DataTable refresh={dataRefreshNeeded}/>
</div>