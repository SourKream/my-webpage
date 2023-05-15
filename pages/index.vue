<template>
  <div>
    <center>
      <h1 class="site-heading">
        Shantanu
      </h1>

      <p class="text">
        Hi. Rebuilding this app using Nuxt3!
      </p>
    </center>

    <h1 class="page-heading">
      Posts
    </h1>

    <ul class="post-list">
      <li
        v-for="post of posts"
        :key="post.path"
      >
        <span class="post-meta">{{ post.date }}</span>
        <NuxtLink
          :to="post.path"
          class="post-link"
        >
          {{ post.title }}
        </NuxtLink>
      </li>
    </ul>

    <center>
      <iframe
        src="https://editor.p5js.org/SourKream/embed/LS_VYq7dC"
        width="600"
        height="600"
        style="border:none;"
      />
    </center>
  </div>
</template>

<script setup>
const router = useRouter()

const posts = router.options.routes?.filter(route => route.path?.startsWith('/posts/')).map(route => ({
  path: route.path,
  title: route.meta?.title,
  date: route.meta?.date
}))
</script>
