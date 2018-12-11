<template>
  <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs4>
            <v-card v-for="(chat, index) in chats" v-bind:key="index">
              <ChatTab v-bind:chatId="chat.chatId" />
              <br />
            </v-card>
          </v-flex>
          <v-flex xs8>
            <v-card>
              <div>Column 2</div>
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
  //import Chat from '../components/Chat.vue'

  export default {
    data: () => {
      return {
        chats: []
      }
    },
    created () {
      this.getChats()
    },
    components: {
      ChatTab,
      //Chat
    },
    methods: {
      getChats() {
        axios.get('http://localhost:5000/chats').then((res) => {
          console.log(res)
          res.data.chats.forEach(element => {
            let tmp = {
              accounts: element.accounts,
              chatId: element.id
            }
            //this.storeChatMeta(tmp)
            store.commit('storeChatMeta', tmp)
            this.chats.push(tmp)
          })
        })
      }
    }
  }
</script>