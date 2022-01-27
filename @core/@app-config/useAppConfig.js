import { getVuetify } from '../utils/index'
import { computed } from '@vue/composition-api'

export default function useAppConfig() {
  const $vuetify = getVuetify()

  const isRtl = computed({
    get: () => $vuetify.rtl,
    set: value => {
      $vuetify.rtl = value
    },
  })

  return {
    isRtl,
  }
}
