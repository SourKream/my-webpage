<template>
  <div>
    <p>
      This post is about how to build a dragon curve
    </p>
    <div id="cube_holder" />
  </div>
</template>

<script setup>
definePageMeta({
  title: 'The Dragon Curve',
  date: 'Jan 09, 2018',
  layout: 'post'
})

const { render } = useOscillatingCube()

onMounted(async () => {
  const { default: P5 } = await import('p5')
  // eslint-disable-next-line no-new
  new P5(render)
})
</script>
