import { getCurrentInstance } from '@vue/composition-api'

export const getVuetify = () => {
  const ins = getCurrentInstance()?.proxy

  return ins && ins.$vuetify ? ins.$vuetify : null
}
