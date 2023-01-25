<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li
          :class="{ 'is-active': !register }"
          @click.prevent="register = false"
        >
          <a>Login</a>
        </li>
        <li :class="{ 'is-active': register }" @click.prevent="register = true">
          <a>Register</a>
        </li>
      </ul>
    </div>
    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>
        <form @submit.prevent="onSubmit">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="email"
                placeholder="Email"
                v-model="credentials.email"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input"
                type="password"
                placeholder="Password"
                v-model="credentials.password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">{{ formTitle }}</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { ICredential } from "@/types/NoteTypes";
import { useStoreAuth } from "@/stores/storeAuth";

/** Store */
const storeAuth = useStoreAuth();

/** Register/Login */
const register = ref(false);

/** Form title */
const formTitle = computed(() => (register.value ? "Register" : "Login"));

/** Submit form */
const onSubmit = () => {
  if (!credentials.email || !credentials.password) {
    alert("Please enter an email and password");
  } else {
    if (register.value) {
      storeAuth.registerUser(credentials);
    } else {
      storeAuth.loginUser(credentials);
    }
  }
};

/**Credential */

const credentials: ICredential = reactive({
  email: "",
  password: "",
});
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
