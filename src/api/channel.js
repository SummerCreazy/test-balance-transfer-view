import axios from '@/libs/api.request'

// Create channel
export const createChannel = ({channelName, channelConfigPath}) => {
  let data = {
    'username': channelName,
    'password': channelConfigPath
  }
  return axios.request({
    url: '/channel/create',
    data,
    method: 'post'
  })
}

// Join channel
export const joinPeers = ({channelName, peers}) => {
  let data = {
    'username': channelName,
    'orgName': peers
  }
  return axios.request({
    url: '/channel/joinPeers',
    data,
    method: 'POST'
  })
}

// Update anchor peers
export const anchorPeers = ({channelName, configUpdatePath}) => {
  let data = {
    'username': channelName,
    'orgName': configUpdatePath
  }
  return axios.request({
    url: '/channel/anchorPeers',
    data,
    method: 'POST'
  })
}

// Invoke transaction on chaincode on target peers
export const invoke = ({peers, chaincodeName, channelName, fcn, args}) => {
  let data = {
    'peers': peers,
    'chaincodeName': chaincodeName,
    'channelName': channelName,
    'fcn': fcn,
    'args': args
  }
  return axios.request({
    url: '/channel/invoke',
    data,
    method: 'POST'
  })
}

// Query on chaincode on target peers
export const query = ({peer, chaincodeName, channelName, fcn, args}) => {
  let data = {
    'peer': peer,
    'chaincodeName': chaincodeName,
    'channelName': channelName,
    'fcn': fcn,
    'args': args
  }
  return axios.request({
    url: '/channel/query',
    data,
    method: 'POST'
  })
}

//  Query Get Block by BlockNumber
export const byBlockNumber = ({peer, blockId, channelName}) => {
  let data = {
    'peer': peer,
    'blockId': blockId,
    'channelName': channelName
  }
  return axios.request({
    url: '/channel/blocks/byBlockNumber',
    data,
    method: 'POST'
  })
}

// Query Post Transaction by Transaction ID
export const byTransactionId = ({peer, trxnId, channelName}) => {
  let data = {
    'peer': peer,
    'trxnId': trxnId,
    'channelName': channelName
  }
  return axios.request({
    url: '/channel/transactions/byTransactionId',
    data,
    method: 'POST'
  })
}

// Query post Block by Hash
export const byHash = ({peer, hash, channelName}) => {
  let data = {
    'peer': peer,
    'hash': hash,
    'channelName': channelName
  }
  return axios.request({
    url: '/channel/blocks/byHash',
    data,
    method: 'POST'
  })
}

// Query for Channel Information
export const channelInfomation = ({peer, channelName}) => {
  let data = {
    'peer': peer,
    'channelName': channelName
  }
  return axios.request({
    url: '/channel/infomation',
    data,
    method: 'POST'
  })
}

// Query for Channel Information
export const peerHadJoin = ({peer}) => {
  let data = {
    'peer': peer
  }
  return axios.request({
    url: '/channel/peerHadJoin',
    data,
    method: 'POST'
  })
}
