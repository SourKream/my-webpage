<template>
  <div>
    <h1 class="page-heading">Posts</h1>

    <ul class="post-list">
      <li v-for="post of posts" :key="post.path">
        <span class="post-meta">{{ post.date }}</span>
        <NuxtLink :to="post.path" class="post-link">
          {{ post.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const router = useRouter();

const posts = router.options.routes
  ?.filter((route) => route.path?.startsWith("/posts/"))
  .map((route) => ({
    path: route.path,
    title: route.meta?.title,
    date: route.meta?.date,
  }));
</script>
