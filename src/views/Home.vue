<template>
  <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <Login v-if="!challengeRequired" />
              <LoginChallenge v-else />
              <button v-on:click="dev">Dev</button>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
  import store from '../store'
  import Login from '../components/Login.vue'
  import LoginChallenge from '../components/LoginChallenge.vue'

  export default {
    data: () => {
      return {
        challengeRequired: store.state.challengeRequired
      }
    },
    components: {
      Login,
      LoginChallenge
    },
    methods: {
      dev() {
        this.$router.push({ path: '/chats' })
      }
    }
  }
</script>
