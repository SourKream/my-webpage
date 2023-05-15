<template>
  <div>
    <div class="page-content">
      <div class="wrapper">
        <div class="post">
          <br>

          <header class="post-header">
            <h1 class="post-title">
              {{ route.meta.title }}
            </h1>
            <p class="post-meta">
              {{ route.meta.date }}
            </p>
          </header>

          <br><br>

          <article class="post-content">
            <slot />
          </article>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
const route = useRoute()
</script>
