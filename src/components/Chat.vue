<template>
  <div>
    <p v-for="(message, index) in messages" v-bind:key="index">{{ message._params.itemType === "text" ? message._params.text : "Shared Media" }}</p>
  </div>
</template>

<script>
  import store from '../store'
  import axios from 'axios'

  export default {
    data: () => {
      return {
        messages: []
      }
    },
    created() {
      console.log('Chat.vue created')
      this.getChat()
    },
    methods: {
      getChat() {
        console.log(store.state.selectedChat)
        axios.get(`http://localhost:5000/chat/${store.state.selectedChat}`)
          .then((res) => {
            console.log(res)
            res.data.chat.items.forEach((chat) => {
              this.messages.push(chat)
            })
          })
        this.messages.reverse()
        console.log(this.messages)
      }
    }
  }
</script>