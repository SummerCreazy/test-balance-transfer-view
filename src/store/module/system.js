import { getSystemMessage } from '@/api/system'
import { getToken } from '@/libs/util'
export default {
  state: {
    token: getToken()
  },
  actions: {
    getSystemMessage () {
      return new Promise((resolve, reject) => {
        getSystemMessage().then(res => {
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
