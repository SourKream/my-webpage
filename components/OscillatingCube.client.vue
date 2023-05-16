<template>
  <div id="cube_holder" />
</template>

<script setup>
const { render } = useOscillatingCube("cube_holder");

onMounted(async () => {
  const { default: P5 } = await import("p5");
  // eslint-disable-next-line no-new
  new P5(render);
});
</script>
