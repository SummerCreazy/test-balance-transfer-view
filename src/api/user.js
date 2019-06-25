import axios from '@/libs/api.request'

export const login = ({username, password, orgName}) => {
  let data = {
    'username': username,
    'password': password,
    'orgName': orgName
  }
  return axios.request({
    url: 'users/login',
    data,
    method: 'post'
  })
}

export const register = ({username, orgName}) => {
  let data = {
    'username': username,
    'orgName': orgName
  }
  return axios.request({
    url: 'users/register',
    data,
    method: 'POST'
  })
}
