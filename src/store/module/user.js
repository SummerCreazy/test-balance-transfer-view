import { login, register} from '@/api/user'
import { setToken} from '@/libs/util'

export default {
  state: {
    username: '',
    secret: '',
    token: ''
  },
  mutations: {
    setUsername (state, username) {
      state.username = username
    },
    setSecret (state, secret) {
      state.secret = secret
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    login ({commit}, {username, password, orgName}) {
      username = username.trim()
      password = password.trim()
      orgName = orgName.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
          orgName
        }).then(res => {
          if (res.result === true) {
            let data = res
            console.log(data)
            localStorage.setItem('auth_info', data.data.user.username)
            commit('setToken', data.token)
            commit('setUsername', data.data.user.username)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    register ({commit}, {username, orgName}) {
      username = username.trim()
      orgName = orgName.trim()
      return new Promise((resolve, reject) => {
        register({
          username,
          orgName
        }).then(res => {
          if (res.result === true) {
            let data = res
            localStorage.setItem('auth_info', data.data.user.username)
            commit('setUsername', data.data.user.username)
            commit('setToken', data.token)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({state, commit}) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   // removeToken()
        //   localStorage.removeItem('auth_info')
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        // commit('setAccess', [])
        localStorage.removeItem('auth_info')
        resolve()
      })
    }
  }
}
