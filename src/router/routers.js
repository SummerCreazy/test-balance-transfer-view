import Main from '@/view/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: 'Register - 注册',
      hideInMenu: true
    },
    component: () => import('@/view/register/register.vue')
  },
  {
    path: '/',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/channel',
    name: '通道',
    meta: {
      type:'menu',
      notCache: true,
      hideInMenu:false,
      icon: 'md-key',
      title: '通道'
    },
    component: Main,
    children: [
      {
        path: '/create',
        name: '创建通道',
        meta: {
          icon: 'md-contacts',
          title: '创建通道',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/channel/create-channel.vue')
      },
      {
        path: '/join',
        name: '加入通道',
        meta: {
          icon: 'md-person',
          title: '加入通道',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/channel/join-channel.vue')
      },
      {
        path: '/byBlockNumber',
        name: '区块高度查询',
        meta: {
          icon: 'md-person',
          title: '区块高度',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/channel/blockNumber-channel.vue')
      },
      {
        path: '/byTransactionId',
        name: '交易哈希查询',
        meta: {
          icon: 'md-person',
          title: '交易哈希查询',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/channel/transactionId-channel.vue')
      },
      {
        path: '/byHash',
        name: '区块哈希查询',
        meta: {
          icon: 'md-person',
          title: '区块哈希查询',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/channel/hash-channel.vue')
      },
      {
        path: '/channelInfomation',
        name: '通道信息查询',
        meta: {
          icon: 'md-person',
          title: '通道信息查询',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/channel/infomation-channel.vue')
      },
      {
        path: '/peerHadJoin',
        name: '节点所在通道',
        meta: {
          icon: 'md-person',
          title: '节点所在通道',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/channel/peerHadJoin-channel.vue')
      }
    ]
  },
  {
    path: '/channel',
    name: '合约',
    meta: {
      type: 'menu',
      notCache: true,
      hideInMenu: false,
      icon: 'md-key',
      title: '合约'
    },
    component: Main,
    children: [
      {
        path: '/install',
        name: '安装合约',
        meta: {
          icon: 'md-contacts',
          title: '安装合约',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/chaincode/install-chaincode.vue')
      },
      {
        path: '/instantiate',
        name: '实例化合约',
        meta: {
          icon: 'md-contacts',
          title: '实例化合约',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/chaincode/instantiate-chaincode.vue')
      },
      {
        path: '/invoke',
        name: '交易操作',
        meta: {
          icon: 'md-person',
          title: '交易操作',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/chaincode/invoke-chaincode.vue')
      },
      {
        path: '/query',
        name: '查询操作',
        meta: {
          icon: 'md-person',
          title: '查询操作',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/chaincode/query-chaincode.vue')
      },
      {
        path: '/installType',
        name: '合约集合',
        meta: {
          icon: 'md-person',
          title: '合约集合',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/chaincode/installType-chaincode.vue')
      }
    ]
  },
  {
    path: '/client',
    name: '客户端',
    meta: {
      type: 'menu',
      notCache: true,
      hideInMenu: false,
      icon: 'md-key',
      title: '客户端'
    },
    component: Main,
    children: [
      {
        path: '/peers',
        name: '查询节点',
        meta: {
          icon: 'md-contacts',
          title: '查询节点',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/client/getPeers-client.vue')
      },
      {
        path: '/netConfig',
        name: '网络配置',
        meta: {
          icon: 'md-person',
          title: '网络配置',
          hideInMenu: false,
          notCache: true
        },
        component: () => import('@/view/client/getNetConfig-client.vue')
      }
    ]
  }
]
