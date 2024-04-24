<script setup lang="ts">

import ArticleView from "../components/article/ArticleView.vue";
import {onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute()
const articleId = ref(1);


onBeforeMount(() => {
  if (route.params.id) {
    articleId.value = Number(route.params.id)
  }
})
</script>

<template>
  <ArticleView :id="articleId"/>
</template>

<style scoped>

</style>
