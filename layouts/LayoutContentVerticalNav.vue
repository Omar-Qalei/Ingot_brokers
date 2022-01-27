<template>
  <v-app >
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <NuxtLink to="/home/view"><v-btn text>{{t('Home')}}</v-btn></NuxtLink>
      <NuxtLink to="/contacts/view"><v-btn text>{{t('Contact')}}</v-btn></NuxtLink>
      <app-bar-i18n></app-bar-i18n>
    </v-app-bar>
    <v-main>
      <v-container>
        <slot></slot>
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppBarI18n from './AppBarI18n.vue'
import { useUtils } from '../@core/libs/i18n'

export default {
  components: { AppBarI18n, },
  name: 'LayoutContentVerticalNav',

  setup() {
    // i18n
    const { t } = useUtils()

    return {
      // i18n
      t,
    }
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Assignment'
    }
  }
}
</script>
