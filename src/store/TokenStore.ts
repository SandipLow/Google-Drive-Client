import { writable } from 'svelte/store';

const initialData = JSON.parse(localStorage.getItem('tokens'))

const TokenStore = writable(initialData);

export default TokenStore;