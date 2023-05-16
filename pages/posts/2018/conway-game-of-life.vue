<template>
  <div>
    <div id="gol_holder" />
  </div>

  <p>You can use these keys to interact with the game,</p>

  <ul>
    <li>`P` : Pause iterations</li>
    <li>`F` : Increase the speed of iterations</li>
    <li>`S` : Reduce the speed of iterations</li>
    <li>`R` : Reset to default speed of iterations</li>
    <li>`T` : Randomize the board</li>
    <li>`W` : Toggle wrap around the edges</li>
    <li>`C` : Clear the board</li>
    <li>`1` : Spawn Gosper Gun at mouse position</li>
    <li>`2` : Spawn Pentadecathlon at mouse position</li>
  </ul>

  <p>
    You can also use the mouse to drag and draw on the board when the iterations
    are paused. Use the `SHIFT` key while dragging to erase the colonies.
  </p>
</template>

<script setup>
definePageMeta({
  title: "Conway's Game of Life",
  date: "Jan 09, 2018",
  layout: "post",
});

let sketch = null;
const { render } = useGameOfLife();

onMounted(async () => {
  const { default: P5 } = await import("p5");
  sketch = new P5(render, "gol_holder");
});

onUnmounted(() => {
  sketch?.remove();
});
</script>
