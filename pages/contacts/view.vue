<template>
  <v-card class="pa-4 ma-4">
    <v-card-title>{{ t("Contact") }}</v-card-title>
    <v-col>
      <v-form ref="form" v-model="valid" lazy-validation>
        <!-- First Name -->
        <v-text-field
          v-model="firstName"
          :rules="[
            (v) => !!v || `${$t('FirstName')} ${$t('isRequired')}`,
            (v) =>
              (v && v.length <= 10) ||
              `${$t('FirstName')} ${$t('must10Characters')}`,
          ]"
          :label="t('FirstName')"
          required
          outlined
          dense
          hide-details="auto"
          class="mb-6"
        ></v-text-field>

        <!-- Last Name -->
        <v-text-field
          v-model="lastName"
          :rules="[
            (v) => !!v || `${$t('LastName')} ${$t('isRequired')}`,
            (v) =>
              (v && v.length <= 10) ||
              `${$t('LastName')} ${$t('must10Characters')}`,
          ]"
          :label="t('LastName')"
          required
          outlined
          dense
          hide-details="auto"
          class="mb-6"
        ></v-text-field>

        <!-- Email -->
        <v-text-field
          v-model="email"
          :rules="[
            (v) => !!v || `${$t('Email')} ${$t('isRequired')}`,
            (v) => /.+@.+..+/.test(v) || `${$t('Email')} ${$t('mustValid')}`,
          ]"
          :label="t('Email')"
          required
          outlined
          dense
          hide-details="auto"
          class="mb-6"
        ></v-text-field>

        <!-- Phone Number -->
        <v-text-field
          v-model="phoneNumber"
          :rules="[
            (v) => !!v || `${$t('PhoneNumber')} ${$t('isRequired')}`,
            (v) =>
              Number.isInteger(Number(v)) ||
              `${$t('PhoneNumber')} ${$t('mustValid')}`,
            (v) =>
              v
                ? v.length > 7
                : v || `${$t('PhoneNumber')} ${$t('must7Digits')}`,
          ]"
          :label="t('PhoneNumber')"
          required
          outlined
          dense
          hide-details="auto"
          class="mb-6"
        ></v-text-field>

        <!-- Country -->
        <v-select
          v-model="select"
          :items="countryList"
          :rules="[(v) => !!v || `${$t('Country')} ${$t('isRequired')}`]"
          :label="t('Country')"
          required
          :item-text="'name'"
          hide-details="auto"
          class="mb-6"
          outlined
          dense
        ></v-select>

        <!-- Message -->
        <v-textarea
          v-model="message"
          :rules="[(v) => !!v || `${$t('Message')} ${$t('isRequired')}`]"
          :label="t('Message')"
          outlined
          rows="3"
        ></v-textarea>

        <!-- Submit Button -->
        <div class="mt-4">
          <v-btn :disabled="!valid" color="success" @click="validate">
            {{ t("Submit") }}
          </v-btn>
        </div>
      </v-form>
    </v-col>

    <!-- Alert Message Thanks -->
    <v-snackbar v-model="snackbar">
      {{
        `${t('Thanks')} ${date}, ${t('TimeZone')} UTC${utcTime}`
      }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { onUnmounted, ref, useStore } from "@nuxtjs/composition-api";
import contactStoreModule from "./contactStoreModule";
import useContactList from "./useContactList";
import { useUtils } from "../../@core/libs/i18n";
import moment from "moment";

export default {
  setup() {
    const CONTACT_APP_STORE_MODULE_NAME = "app-contact";
    const store = useStore();

    // i18n
    const { t } = useUtils();

    // // Register module
    if (!store.hasModule(CONTACT_APP_STORE_MODULE_NAME))
      store.registerModule(CONTACT_APP_STORE_MODULE_NAME, contactStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CONTACT_APP_STORE_MODULE_NAME))
        store.unregisterModule(CONTACT_APP_STORE_MODULE_NAME);
    });

    const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
    const form = ref(null);
    const valid = ref(true);
    const snackbar = ref(false);
    const date = ref(moment(Date.now()).format("YYYY-MM-DD hh:mm:ss"));
    const utcTime = ref(moment.utc().format('hh:mm'));

    const validate = () => {
      if (form.value.validate()) {
        snackbar.value = true;
        reset();
      }
    };
    const reset = () => {
      form.value.reset();
    };

    const resetValidation = () => {
      form.value.resetValidation();
    };

    const {
      countryList,
      loading,
      firstName,
      firstNameRules,
      lastName,
      lastNameRules,
      email,
      emailRules,
      phoneNumber,
      phoneNumberRules,
      countryRules,
      select,
      message,
      messageRules,
    } = useContactList();

    return {
      form,
      select,
      items,
      validate,
      valid,
      reset,
      resetValidation,
      snackbar,
      date,
      utcTime,

      countryList,
      loading,
      firstName,
      firstNameRules,
      lastName,
      lastNameRules,
      email,
      emailRules,
      phoneNumber,
      phoneNumberRules,
      countryRules,
      message,
      messageRules,

      t,
    };
  },
};
</script>
