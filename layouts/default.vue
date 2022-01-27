<template>
  <layout-content-vertical-nav>
    <KeepAlive :exclude="['modal']">
    <RouterView />
  </KeepAlive>
  </layout-content-vertical-nav>
</template>

<script>
import LayoutContentVerticalNav from "./LayoutContentVerticalNav.vue";
export default {
  components: { LayoutContentVerticalNav },
  name: "DefaultLayout",
};
</script>
