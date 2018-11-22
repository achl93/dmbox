<template>
  <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <Login v-if="!challengeRequired" />
              <LoginChallenge v-else />
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
      challengeRequired: store.state.challengeRequired
    },
    components: {
      Login
    }
  }
</script>
