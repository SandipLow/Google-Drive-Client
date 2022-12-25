<script lang="ts">
  import { Route, Router } from 'svelte-routing'
  import Home from './pages/Home.svelte';
  import Drive from './pages/Drive.svelte';
  import Auth from './pages/Auth.svelte';
  import Redirect from './pages/Redirect.svelte';
  import Navbar from './components/Navbar.svelte';
  
  export let url = ""
  
</script>

<Router {url}>
  <Navbar />
  <main>
    <Route path="/" component={Home} />
    <Route path="/auth" component={Auth} />
    <Route path="/folder" component={Drive} />
    <Route path="/folder/:folderId" let:params>
      <Drive folderId={params.folderId} />
    </Route>

    <!-- Redirect URI for OAuth2 -->
    <Route path="/redirect" component={Redirect} />
  </main>
</Router>
