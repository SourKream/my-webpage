<template>
  <div>
    <div id="curve_holder" />
    <div>
      <label for="distance-input">Distance</label>
      <input id="distance-input" v-model="distanceVal" />
    </div>
    <div>
      <label for="decay-input">Decay</label>
      <input id="decay-input" v-model="decayVal" />
    </div>
    <div>
      <label for="lat-decay-input">Lat Decay</label>
      <input id="lat-decay-input" v-model="latDecayVal" />
    </div>

    <button @click="() => resetPoints(sketch)">Reset</button>
    <button @click="() => iterate(sketch)">Iterate</button>
  </div>
</template>

<script setup>
definePageMeta({
  title: "The Dragon Curve",
  date: "Jan 10, 2018",
  layout: "post",
});

const distanceVal = ref(1);
const decayVal = ref(1);
const latDecayVal = ref(1);

let sketch = null;
const { render, resetPoints, iterate } = useDragonCurve(
  distanceVal,
  decayVal,
  latDecayVal
);

onMounted(async () => {
  const { default: P5 } = await import("p5");
  sketch = new P5(render, "curve_holder");
});

onUnmounted(() => {
  sketch?.remove();
});
</script>
