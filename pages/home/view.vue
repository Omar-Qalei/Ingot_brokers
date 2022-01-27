<template>
<v-lazy
        :options="{
          threshold: .5
        }"
        min-height="200"
        transition="fade-transition"
      >
  <v-data-table
    :headers="tableColumns"
    :items="countryListTable"
    :server-items-length="totalCountryListTable"
    :loading="loading"
    loading-text="Loading... Please wait"
    class="elevation-1"

  >
    <!-- name -->
    <template #[`item.name`]="{ item }">
      <div class="d-flex align-center">
        <v-avatar
          :color="item.flag ? '' : 'primary'"
          :class="item.flag ? '' : 'v-avatar-light-bg primary--text'"
          size="32"
        >
          <v-img v-if="item.flag" :src="item.flag"></v-img>
          <span v-else class="font-weight-medium">{{
            avatarText(item.name)
          }}</span>
        </v-avatar>

        <div class="d-flex flex-column ms-3">
            {{ item.name }}
          <small>@{{ item.name }}</small>
        </div>
      </div>
    </template>
  </v-data-table>
</v-lazy>
</template>

<script>
import { onUnmounted, ref, useStore } from "@nuxtjs/composition-api";
import homeStoreModule from "./homeStoreModule";
import useHomeList from "./useHomeList";
export default {
  setup() {
    const HOME_APP_STORE_MODULE_NAME = "app-home";
    const store = useStore();

    // // Register module
    if (!store.hasModule(HOME_APP_STORE_MODULE_NAME))
      store.registerModule(HOME_APP_STORE_MODULE_NAME, homeStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(HOME_APP_STORE_MODULE_NAME))
        store.unregisterModule(HOME_APP_STORE_MODULE_NAME);
    });

    const {
      countryListTable,
      tableColumns,
      loading,
      totalCountryListTable,
      fetchCountries,
    } = useHomeList();

    return {
      countryListTable,
      tableColumns,
      loading,
      totalCountryListTable,
      fetchCountries,
    };
  },
};
</script>

<style>
</style>
