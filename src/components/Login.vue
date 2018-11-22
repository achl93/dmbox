<template>
  <v-card-text>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        prepend-icon="person"
        v-model="username"
        label="Username"
        required
      ></v-text-field>
      <v-text-field
        prepend-icon="lock"
        v-model="password"
        label="Password"
        :type="'password'"
        required
      ></v-text-field>
      <v-btn
        :disabled="!valid"
        @click="submit"
      >
        submit
      </v-btn>
    </v-form>
  </v-card-text>
</template>

<script>
  import axios from 'axios'

  //TODO: 
  //  Use bcrypt to hash/sync sensitive info
  export default {
    data: () => ({
      valid: true,
      username: '',
      password: ''
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          axios.post('http://localhost:5000/login', {
            username: this.username,
            password: this.password,
          }).then((res) => {
            console.log(res)
            if (res.data.challengeId === '') {
              this.$router.push({ path: '/chats' })
            } else {
              // Challenge is required, change state and re-render
              this.toggleChallenge(res.data.challengeId)
            }
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      },
      toggleChallenge(challengeId) {
        store.commit('toggleChallenge', challengeId)
      }
    }
  }
</script>