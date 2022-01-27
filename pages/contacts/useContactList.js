import { useStore } from "@nuxtjs/composition-api";
import { ref, watch } from '@vue/composition-api'
import useAppConfig from '../../@core/@app-config/useAppConfig'
import { useUtils } from '../../@core/libs/i18n'


export default function useContactList() {
  const countryList = ref([])
  const store = useStore();

  // RTL OR LTR Direction
  const { isRtl } = useAppConfig()
  // i18n
  const { t } = useUtils()

  const loading = ref(false)

  const firstName = ref("");
  const firstNameRules = [
    (v) => !!v || `${t('FirstName')} ${t('isRequired')}`,
    (v) => (v && v.length <= 10) || `${t('FirstName')} ${t('must10Characters')}`,
  ];
  const lastName = ref("");
  const lastNameRules = [
    (v) => !!v || `${t('LastName')} ${t('isRequired')}`,
    (v) => (v && v.length <= 10) || `${t('LastName')} ${t('must10Characters')}`,
  ];
  const email = ref("");
  const emailRules = [
    (v) => !!v || `${t('Email')} ${t('isRequired')}`,
    (v) => /.+@.+..+/.test(v) || `${t('Email')} ${t('mustValid')}`,
  ];
  const phoneNumber = ref("");
  const phoneNumberRules = [
    (v) => !!v || `${t('PhoneNumber')} ${t('isRequired')}`,
    (v) => Number.isInteger(Number(v)) || `${t('PhoneNumber')} ${t('mustValid')}`,
    (v) => v.length > 7 || `${t('PhoneNumber')} ${t('must7Digits')}`,
  ];

  const select = ref(null);

  const message = ref("");
  const messageRules = [(v) => !!v || `${t('Message')} ${t('isRequired')}`];
  const countryRules = [(v)  => !!v || `${t('Country')} ${t('isRequired')}`];

  // Map Data
  const mapData = data => {
    return data.map(element => {
      return {
        name: isRtl.value ? element.translations.ara.common : element.translations.cym.common,
        official: isRtl.value ? element.translations.ara.official : element.translations.cym.official,
        flag: element.flags.png,
        currencies: mapCurrencies(element.currencies)
      }
    });
  }

  // Map Currencies
  const mapCurrencies = (obj) => {
    if (obj !== undefined)
      return Object.keys(obj).map(function (key, index) {
        return `${obj[key].name} (${obj[key].symbol})`;
      })
    return "No Currency"
  }

  // fetch data
  const fetchCountries = () => {
    loading.value = true
    store
      .dispatch('app-contact/fetchCountries')
      .then(response => {
        countryList.value = mapData(response.data)

        // remove loading state
        loading.value = false
      })
      .catch(error => {
        console.log(error)
      })
  }


  watch([isRtl, fetchCountries], () => {
    countryList.value = []
    fetchCountries()
  })

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  return {

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
    fetchCountries,

    t,
  }
}
