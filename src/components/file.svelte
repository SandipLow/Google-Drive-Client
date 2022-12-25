<script lang="ts">
    import {Link} from 'svelte-routing'
    interface File {
        id: string,
        kind: string,
        name: string,
        mimeType: string
    }
    export let file: File
</script>

<Link to={'file/'+file.id}>
    <div class="file">
        <i class="file_icon fa-solid fa-file-lines"></i>
        <span>{file.name}</span>
    </div>
</Link>


<style>
    .file {
        display: inline-block;
        margin: 0 1rem;
        width: 6rem;
        text-align: center;
    }

    .file_icon {
        font-size: 5rem;
        display: block;
        color: slategrey;
    }
</style>