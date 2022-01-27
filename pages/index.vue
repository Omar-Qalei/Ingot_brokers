<template>
<KeepAlive :exclude="['modal']">
    <RouterView />
  </KeepAlive>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
