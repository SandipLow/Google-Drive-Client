<script lang="ts">
    import { links } from "svelte-routing";

</script>

<nav use:links>
    <a href="/">Home</a>
    <a href="/auth">SignIn</a>
    <a href="/folder">Go to Drive</a>
</nav>

<style>
    nav {
        position: fixed;
        width: 100vw;
        top: 0;
        z-index: 1000;
        font-size: 1rem;
        padding: 0 1rem;
    }

    nav a {
        display: inline-block;
        margin: 0.5rem 0;
        padding: 10px 6px;
    }

    nav a:hover {
        background-color: aqua;
    }
</style>
