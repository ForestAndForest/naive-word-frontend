<script setup lang="ts">

import ArticleCard from "../components/article/ArticleCard.vue";
import {useRouter} from "vue-router";
import {ref} from "vue";
import LinksCard from "../components/article/LinksCard.vue";
import {useArticleStore} from "../store";
import {hotIncrement} from "../api/note.ts";

const router = useRouter()
const articleStore = useArticleStore()


const activeName = ref('hot')
const dropDownOptions = [
  {
    label: "按金币排序",
    key: '1',
    children: [
      {
        label: "升序",
        key: '10'
      },
      {
        label: "降序",
        key: '11'
      }
    ]
  }
]

function click(id: number) {
  hotIncrement(id)
  router.push('/notes/' + id)
}


</script>
<template>
  <div class="head">
    <h1>Naive Word</h1>
    <span class="subhead">{{ $t('welcome') }}</span>
  </div>

  <div style="margin: 1rem 2%;display: flex;">
    <n-card class="shadow">
      <n-tabs type="line" animated v-model:value="activeName">
        <n-tab-pane name="concern" :tab="$t('concern')">
          关注
        </n-tab-pane>
        <n-tab-pane name="beatles" :tab="$t('beatles')">
          推荐
        </n-tab-pane>
        <n-tab-pane name="hot" :tab="$t('hot')">
          <article-card v-for="card in articleStore.state.hotArticleCardList" :key="card.id" :card="card"
                        @click="click(card.id)"/>
        </n-tab-pane>
        <n-tab-pane name="help" tab="求助">
          求助
        </n-tab-pane>
        <n-tab-pane name="reward" tab="悬赏">
          悬赏
        </n-tab-pane>
        <template #suffix>
          <n-dropdown
              :options="dropDownOptions"
              placement="bottom-start"
              trigger="hover"
              @select="()=>{}"
          >
            <n-button text>排序</n-button>
          </n-dropdown>
        </template>
      </n-tabs>
    </n-card>
    <n-space vertical class="sider">
      <links-card/>
      <links-card/>
    </n-space>
  </div>

</template>

<style scoped>

.subhead {
  font-size: 2.2cap;
  font-style: italic;
  color: #0085ae;
  position: relative;
}

.subhead:after {
  content: "---------2024-03-31";
  position: absolute;
  bottom: -40px;
  right: -30px;
}

.head {
  width: 100%;
  height: 40vh;
  background-image: url("../assets/bg.jpg");
  background-position: bottom left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  animation: bgAn 30s linear infinite;
}

@keyframes bgAn {
  0% {
    background-position: bottom left;
  }
  50% {
    background-position: top right;
  }
  100% {
    background-position: bottom left;
  }
}

.head h1 {
  font-size: 50px;
  position: relative;
  color: #fff;
}

.head h1:after {
  content: "";
  position: absolute;
  height: 3px;
  width: 60%;
  background-color: #c01a1a;
  bottom: 10px;
  left: 20%;
}

.sider {
  width: 350px;
  margin-left: 20px;
}


@media screen and (max-width: 520px) {
  .sider {
    display: none;
  }
}
</style>
