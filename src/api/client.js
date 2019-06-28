import axios from '@/libs/api.request'

// get Peers from client
export const getPeers = ({peer}) => {
  let data = {
    'peer': peer
  }
  return axios.request({
    url: '/client/getPeers',
    data,
    method: 'post'
  })
}
// get Net Config Setting
export const getNetConfig = () => {
  return axios.request({
    url: '/client/getNetConfig',
    method: 'post'
  })
}
