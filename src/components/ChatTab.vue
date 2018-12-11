<template>
  <div>Chat ID: {{ this.chatId }}</div>
</template>

<script>
  import store from '../store'

  export default {
    props: ['chatId'],
    data: () => {
      return {
        accounts: null
      }
    },
    created() {
      console.log(this.chatId)
      this.accounts = store.state.chatMetas.filter(chat => chat.chatId === this.chatId)[0].accounts
      console.log(this.accounts)
    }
  }
</script>