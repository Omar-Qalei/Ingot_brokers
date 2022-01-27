import { getVuetify } from '@core/utils/index'
import { computed } from '@vue/composition-api'

export default () => {
  const rootThemeClasses = computed(() => {
    const $vuetify = getVuetify()

    return {
      'theme--dark': $vuetify.theme.dark,
      'theme--light': !$vuetify.theme.dark,
    }
  })

  return {
    rootThemeClasses,
  }
}
