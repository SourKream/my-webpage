<template>
  <div>
    <div id="curve_holder" />
  </div>
</template>

<script setup>
definePageMeta({
  title: "The Dragon Curve",
  date: "Jan 09, 2018",
  layout: "post",
});

const { render } = useDragonCurve("curve_holder");

onMounted(async () => {
  const { default: P5 } = await import("p5");
  // eslint-disable-next-line no-new
  new P5(render);
});
</script>
