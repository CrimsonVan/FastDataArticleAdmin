<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div style="border:1px solid #ccc ;border-radius: 20%;">俺是组件</div>
</template>

<style scoped>

</style>
