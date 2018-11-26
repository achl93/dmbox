<template>
  <v-card-text>
    <div>A verification code from Instagram has been sent to your SMS!</div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        prepend-icon="lock"
        v-model="code"
        label="Code"
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
  import store from '../store'
  import axios from 'axios'

  export default {
    data: () => ({
      valid: true,
      code: '',
      challengeId: store.state.challengeId
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          axios.post('http://localhost:5000/login-challenge', {
            code: this.code
          }).then((res) => {
            console.log(res)
            if (res.data.error === '') {
              this.$router.push({ path: '/chats' })
            } else {
              //TODO: Handle challenge failed
            }
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>