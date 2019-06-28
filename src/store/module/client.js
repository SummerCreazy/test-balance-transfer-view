/* eslint-disable standard/object-curly-even-spacing */
import { getPeers, getNetConfig} from '@/api/client'
import { getToken } from '@/libs/util'

export default {
  state: {
    token: getToken()
  },
  actions: {
    getPeers ({commit}, {peer}) {
      return new Promise((resolve, reject) => {
        getPeers({
          peer
        }).then(res => {
          if (res !== false) {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    getNetConfig ({commit}) {
      return new Promise((resolve, reject) => {
        getNetConfig().then(res => {
          if (res !== false) {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
