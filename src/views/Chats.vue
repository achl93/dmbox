<template>
  <v-content>
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex xs4>
            <v-card>
              <div>Column 1</div>
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
  //import Chat from '../components/Chat.vue'

  export default {
    data: () => {
      return {
        loggedIn: store.state.loggedIn
      }
    },
    components: {
      //Chat
    }
  }
</script>