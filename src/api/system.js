import axios from '@/libs/api.request'

// Install chaincode on target peers
export const getSystemMessage = () => {
  return axios.request({
    url: '/sys/getSystemMessage',
    method: 'post'
  })
}
