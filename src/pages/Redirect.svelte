<script lang="ts">
    import TokenStore from "../store/TokenStore";
    import { navigate } from "svelte-routing";
    import type { RouteLocation } from "svelte-routing/types/Route";
    export let location: RouteLocation;

    const query = new URLSearchParams(location.search);

    if (query.has("access_token")) {
        const tokensJson = {
            access_token: query.get('access_token'),
            refresh_token: query.get('refresh_token'),
        };

        localStorage.setItem('tokens', JSON.stringify(tokensJson))

        TokenStore.set(tokensJson);
    }

    navigate('/')
</script>
