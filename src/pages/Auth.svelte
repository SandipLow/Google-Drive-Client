<script lang="ts">
    import TokenStore from "../store/TokenStore";
    import { onDestroy } from "svelte";

    let token = localStorage.getItem("tokens");

    const unsub = TokenStore.subscribe((data) => {
        token = data;
    });

    const signIn = ()=> {
        window.open('http://localhost:5000/google', '_self')
    }

    const signOut = ()=> {
        localStorage.removeItem('tokens')
        TokenStore.set(null)
    }

    onDestroy(() => {
        unsub();
    });
</script>

<h1>This is Auth Page</h1>
{#if token}
    <button on:click={signOut}>Sign Out</button>
{:else}
    <button on:click={signIn}>Sign In</button>
{/if}

<style>
    h1 {
        margin: 4rem 0 0 1rem;
    }
    button {
        margin: 1rem;
        padding: 1rem;
    }
</style>
