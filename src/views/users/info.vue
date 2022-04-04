<template>
  <div>
    详情页 当前用户ID: {{ id }}
    <p>
      这是来自 model的数据：<span style="color: red">{{ msg }}</span>
    </p>
    <a-button :loading="loading" @click="onChangeModelMsg">
      2秒后改变model数据
    </a-button>
  </div>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();

    const id = route.query.id;
    const msg = computed(() => store.state.users.msg);

    const loading = ref(false);

    const onChangeModelMsg = async () => {
      loading.value = true;
      await store.dispatch("users/setMsg", "大家好");
      loading.value = false;
    };

    return {
      id,
      msg,
      loading,
      onChangeModelMsg,
    };
  },
});
</script>
