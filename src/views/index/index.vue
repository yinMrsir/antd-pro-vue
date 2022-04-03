<template>
  <div>
    {{data.message}}
      <component :is="$antIcons['TransactionOutlined']" :style="{ color: 'red' }" :rotate="60" :spin="true" />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'


export default defineComponent({
  setup() {
    const data = reactive({
      message: 'welcome'
    })

    return {
      data
    }
  }
})
</script>
