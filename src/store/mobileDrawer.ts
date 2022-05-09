import { ref } from "vue";

export const drawer = ref(false);

export const setDrawer = (val: boolean) => (drawer.value = val);
