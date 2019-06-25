/* eslint-disable standard/object-curly-even-spacing */
import { install, instantiate, installType} from '@/api/chaincode'
import { getToken } from '@/libs/util'

export default {
  state: {
    token: getToken()
  },
  actions: {
    install ({commit}, {peers, chaincodeName, chaincodePath, chaincodeVersion, chaincodeType}) {
      return new Promise((resolve, reject) => {
        install({
          peers,
          chaincodeName,
          chaincodePath,
          chaincodeVersion,
          chaincodeType
        }).then(res => {
          if (res !== false) {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    instantiate ({commit}, {peers, chaincodeName, chaincodeVersion, channelName, chaincodeType, fcn, args}) {
      return new Promise((resolve, reject) => {
        instantiate({
          peers,
          chaincodeName,
          chaincodeVersion,
          channelName,
          chaincodeType,
          fcn,
          args
        }).then(res => {
          if (res !== false) {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    installType ({commit}, {peer, type}) {
      return new Promise((resolve, reject) => {
        installType({
          peer,
          type
        }).then(res => {
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
