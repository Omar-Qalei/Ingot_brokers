import { useStore, } from "@nuxtjs/composition-api";
import { ref, watch } from '@vue/composition-api'
import useAppConfig from '../../@core/@app-config/useAppConfig'
import { useUtils } from '../../@core/libs/i18n'

export default function useHomeList() {
  const countryListTable = ref([])
  const store = useStore();

  // RTL OR LTR Direction
  const { isRtl } = useAppConfig()
  // i18n
  const { t } = useUtils()

  const tableColumns = [
    { text: t('CountryName'), value: 'name' },
    { text: t('OfficialName'), value: 'official' },
    { text: t('Currencies'), value: 'currencies', sortable: false },
    // {
    //   text: 'ACTIONS',
    //   value: 'actions',
    //   align: 'center',
    //   sortable: false,
    // },
  ]
  const loading = ref(false)
  const totalCountryListTable = ref(0)


  // Map Data
  const mapData = data => {
    return data.map(element => {
      return {
        name: isRtl.value? element.translations.ara.common : element.translations.cym.common,
        official: isRtl.value? element.translations.ara.official : element.translations.cym.official,
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
      .dispatch('app-home/fetchCountries')
      .then(response => {
        countryListTable.value = mapData(response.data)
        totalCountryListTable.value = response.data.length

        // remove loading state
        loading.value = false
      })
      .catch(error => {
        console.log(error)
      })
  }


  watch([isRtl, fetchCountries], () => {
    countryListTable.value = []
    totalCountryListTable.value = []
    fetchCountries()
  })

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  return {
    countryListTable,
    tableColumns,
    loading,
    totalCountryListTable,
    fetchCountries,
  }
}
