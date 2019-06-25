/* eslint-disable standard/object-curly-even-spacing */
import { createChannel, joinPeers, anchorPeers, invoke, query, byBlockNumber, byTransactionId, byHash, channelInfomation, peerHadJoin} from '@/api/channel'
import { getToken } from '@/libs/util'

export default {
  state: {
    token: getToken()
  },
  actions: {
    createChannel ({commit}, {channelName, channelConfigPath}) {
      return new Promise((resolve, reject) => {
        createChannel({
          channelName,
          channelConfigPath
        }).then(res => {
          if (res !== false) {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    joinPeers ({commit}, {channelName, peers}) {
      return new Promise((resolve, reject) => {
        joinPeers({
          channelName,
          peers
        }).then(res => {
          if (res !== false) {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    anchorPeers ({commit}, {channelName, configUpdatePath}) {
      return new Promise((resolve, reject) => {
        anchorPeers({
          channelName,
          configUpdatePath
        }).then(res => {
          if (res !== false) {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    invoke ({commit}, {peers, chaincodeName, channelName, fcn, args}) {
      return new Promise((resolve, reject) => {
        invoke({
          peers,
          chaincodeName,
          channelName,
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
    query ({commit}, {peer, chaincodeName, channelName, fcn, args}) {
      return new Promise((resolve, reject) => {
        query({
          peer,
          chaincodeName,
          channelName,
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
    byBlockNumber ({commit}, {peer, blockId, channelName}) {
      return new Promise((resolve, reject) => {
        byBlockNumber({
          peer,
          blockId,
          channelName
        }).then(res => {
          if (res !== false) {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    byTransactionId ({commit}, {peer, trxnId, channelName}) {
      return new Promise((resolve, reject) => {
        byTransactionId({
          peer,
          trxnId,
          channelName
        }).then(res => {
          if (res !== false) {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    byHash ({commit}, {peer, hash, channelName}) {
      return new Promise((resolve, reject) => {
        byHash({
          peer,
          hash,
          channelName
        }).then(res => {
          if (res !== false) {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    channelInfomation ({commit}, {peer, channelName}) {
      return new Promise((resolve, reject) => {
        channelInfomation({
          peer,
          channelName
        }).then(res => {
          if (res !== false) {
            resolve(res)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    peerHadJoin ({commit}, {peer}) {
      return new Promise((resolve, reject) => {
        peerHadJoin({
          peer
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
