<template>
  <div>
    <div id="curve_holder" />
  </div>
</template>

<script setup>
definePageMeta({
  title: "The Dragon Curve",
  date: "Jan 10, 2018",
  layout: "post",
});

let sketch = null;
const { render } = useDragonCurve();

onMounted(async () => {
  const { default: P5 } = await import("p5");
  sketch = new P5(render, "curve_holder");
});

onUnmounted(() => {
  sketch?.remove();
});
</script>
