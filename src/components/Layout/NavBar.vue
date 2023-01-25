<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div
          class="navbar-item is-size-4 is-family-monospace"
          style="cursor: pointer"
          @click="handleClickLogo"
        >
          Take Note
        </div>
        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click.prevent="showMobileNav = !showMobileNav"
          ref="navBarBurgerRef"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': showMobileNav }"
        ref="navbarMenuRef"
      >
        <div class="navbar-end">
          <RouterLink
            to="/"
            class="navbar-item"
            active-class="is-active"
            @click="showMobileNav = false"
            >Notes</RouterLink
          >
          <RouterLink
            to="/stats"
            class="navbar-item"
            active-class="is-active"
            @click="showMobileNav = false"
          >
            Stats
          </RouterLink>
          <button
            class="button is-small is-info mt-3 ml-3"
            @click="onLogout"
            v-if="storeAuth.user"
          >
            Log out {{ storeAuth.user.email }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";
import { useStoreAuth } from "@/stores/storeAuth";

/** Store */
const storeAuth = useStoreAuth();

/**
 * Mobive Nav
 */
const router = useRouter();
const showMobileNav = ref(false);
const handleClickLogo = () => {
  router.push("/");
};

const onLogout = () => {
  storeAuth.logOut();
  showMobileNav.value = false;
};

/**Click Outsie to close */
const navbarMenuRef = ref<HTMLDivElement | null>(null);
const navBarBurgerRef = ref<HTMLAnchorElement | null>(null);
onClickOutside(navbarMenuRef, () => (showMobileNav.value = false), {
  ignore: [navBarBurgerRef],
});
</script>

<style scoped>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
