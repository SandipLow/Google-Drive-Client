<script lang="ts">
    import File from "../components/file.svelte";
    import { navigate } from "svelte-routing";
    import Folder from "../components/folder.svelte";

    export let folderId: string = null;

    interface file {
        id: string,
        kind: string,
        name: string,
        mimeType: string
    }

    let files: file[] = [];

    let error: any = null;

    let access_token = localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')).access_token : null

    if (access_token) {
        fetch('http://localhost:5000/drive/getfiles'+(folderId?('/'+folderId):""), {
            method: 'POST',
            headers: {
                access_token: access_token
            }
        }).then(res=>{
            // console.log(res);
            if(res.status !== 200) {
                return 
            }
            return res.json()
        }).then(data=> {
            console.log(data);
            if(data)
                files = data.files
        }).catch(err=>{
            console.log(err);
            error = err
        })
    }
    else {
        alert('Have to Log in first..!')
        navigate('/auth')  
    }
    
</script>

<h1>This is Drive</h1>
<span class="current_folder">Viewing Folder : {folderId ? folderId : 'My Drive'}</span>

<div>

{#if !error}

{#each files as file}
    {#if file.mimeType=="application/vnd.google-apps.folder"}
        <Folder {file}/>
    {:else}
        <File {file}/>
    {/if}
{/each}

{:else}
    <p>Some Error Occured... Please Check If the file exist</p>
{/if}

</div>

<style>
    h1 {
        margin: 4rem 0 0 1rem;
    }
    .current_folder {
        display: block;
        margin: 1rem;
        padding: 1rem;
    }
</style>