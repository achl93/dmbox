<template>
  <div>
    <button @click="this.selectChat">
      <div style="font-weight:bold">{{ this.chatMeta._params.title }}</div>
      <div style="color:gray">{{ this.chatMeta.items[0]._params.itemType === "text" ? this.chatMeta.items[0]._params.text : "Shared Media" }}</div>
    </button>
  </div>
</template>

<script>
  import store from '../store'

  export default {
    props: ['chatId'],
    data: () => {
      return {
        chatMeta: null
      }
    },
    created() {
      this.chatMeta = store.state.chatMetas.filter(chat => chat.id === this.chatId)[0]
    },
    methods: {
      selectChat() {
        console.log(this.chatId)
        store.commit('toggleSelectedChat', this.chatId)
      }
    }
  }
</script>