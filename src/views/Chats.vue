<template>
  <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs4>
            <v-card v-for="(chat, index) in chats" v-bind:key="index">
              <ChatTab v-bind:chatId="chat.id" />
              <br />
            </v-card>
          </v-flex>
          <v-flex xs8>
            <v-card :key="this.selectedChat">
              <Chat />
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
  import store from '../store'
  import axios from 'axios'
  import ChatTab from '../components/ChatTab.vue'
  import Chat from '../components/Chat.vue'

  export default {
    watch: {
      selectedChat(newVal, oldVal) {
        console.log(newVal, oldVal)
      }
    },
    data: () => {
      return {
        chats: [],
      }
    },
    computed: {
      selectedChat() {
        return store.state.selectedChat
      }
    },
    created () {
      this.getChats()
    },
    components: {
      ChatTab,
      Chat
    },
    methods: {
      getChats() {
        axios.get('http://localhost:5000/chats').then((res) => {
          res.data.chats.forEach(element => {
            store.commit('storeChatMeta', element)
            this.chats.push(element)
          })
        })
      }
    }
  }
</script>