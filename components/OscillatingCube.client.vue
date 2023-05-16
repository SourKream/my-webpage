<template>
  <div id="cube_holder" />
</template>

<script setup>
let sketch = null;
const { render } = useOscillatingCube();

onMounted(async () => {
  const { default: P5 } = await import("p5");
  sketch = new P5(render, "cube_holder");
});

onUnmounted(() => {
  sketch?.remove();
});
</script>
