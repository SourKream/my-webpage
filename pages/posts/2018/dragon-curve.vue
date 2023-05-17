<template>
  <div>
    <div id="curve_holder" />

    <div class="my-3 form-group col-4">
      <label for="distance-input">Distance</label>
      <input id="distance-input" v-model="distanceVal" class="form-control" />
    </div>
    <div class="my-3 form-group col-4">
      <label for="decay-input">Decay</label>
      <input id="decay-input" v-model="decayVal" class="form-control" />
    </div>
    <div class="my-3 form-group col-4">
      <label for="lat-decay-input">Lat Decay</label>
      <input id="lat-decay-input" v-model="latDecayVal" class="form-control" />
    </div>

    <button
      type="button"
      class="btn btn-primary btn mr-3"
      @click="() => iterate(sketch)"
    >
      Iterate
    </button>
    <button
      type="button"
      class="btn btn-secondary btn mx-3"
      @click="() => resetPoints(sketch)"
    >
      Reset
    </button>
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
