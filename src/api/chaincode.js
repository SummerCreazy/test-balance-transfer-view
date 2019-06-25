import axios from '@/libs/api.request'

// Install chaincode on target peers
export const install = ({peers, chaincodeName, chaincodePath, chaincodeVersion, chaincodeType}) => {
  let data = {
    'peers': peers,
    'chaincodeName': chaincodeName,
    'chaincodePath': chaincodePath,
    'chaincodeVersion': chaincodeVersion,
    'chaincodeType': chaincodeType
  }
  return axios.request({
    url: '/chaincode/install',
    data,
    method: 'post'
  })
}

// Instantiate chaincode on target peers
export const instantiate = ({peers, chaincodeName, chaincodeVersion, channelName, chaincodeType, fcn, args}) => {
  let data = {
    'peers': peers,
    'chaincodeName': chaincodeName,
    'chaincodePath': chaincodePath,
    'chaincodeVersion': chaincodeVersion,
    'chaincodeType': chaincodeType,
    'fcn': fcn,
    'args': args
  }
  return axios.request({
    url: '/chaincode/instantiate',
    data,
    method: 'POST'
  })
}

// Query to fetch all Installed/instantiated chaincodes
export const installType = ({peer, type}) => {
  let data = {
    'peer': peer,
    'type': type
  }
  return axios.request({
    url: '/chaincode/type',
    data,
    method: 'POST'
  })
}
