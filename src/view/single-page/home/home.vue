<template>
  <div>
    <Card style="width:100%">
      <div style="text-align:left">
        <h5>当前Hyperledger Fabric网络配置</h5>
      </div>
    </Card>
    <Row :gutter="16" style="margin-top: 16px;margin-bottom: 16px">
      <i-col span="8" class="card">
        <Card>
          <div style="text-align:left">
            <h4>组织总数</h4>
            <h3>{{orgNumber}}</h3>
            <h5>即当前网络的 org 数量</h5>
          </div>
        </Card>
      </i-col>
      <i-col span="8" class="card">
        <Card>
          <div style="text-align:left">
            <h4>排序服务总数</h4>
            <h3>{{ordererNumber}}</h3>
            <h5>即当前网络的 orderer 数量</h5>
          </div>
        </Card>
      </i-col>
      <i-col span="8" class="card">
        <Card>
          <div style="text-align:left">
            <h4>节点服务总数</h4>
            <h3>{{peerNumber}}</h3>
            <h5>即当前网络的 peer 数量</h5>
          </div>
        </Card>
      </i-col>
      <i-col span="8" class="card">
        <Card>
          <div style="text-align:left">
            <h4>证书节点服务总数</h4>
            <h3>{{caNumber}}</h3>
            <h5>即当前网络的 ca server 数量</h5>
          </div>
        </Card>
      </i-col>
      <i-col span="8" class="card">
        <Card>
          <div style="text-align:left">
            <h4>通道总数</h4>
            <h3>{{channelNumber}}</h3>
            <h5>即当前网络的 channel 数量</h5>
          </div>
        </Card>
      </i-col>
      <i-col span="8" class="card">
        <Card>
          <div style="text-align:left">
            <h4>合约总数</h4>
            <h3>{{chaincodeNumber}}</h3>
            <h5>即当前网络的 chaincode 数量</h5>
          </div>
        </Card>
      </i-col>
      <i-col span="16" class="card">
        <div style="text-align: center;background-color: ghostwhite">
          <Table stripe :columns="columns" :data="blocks"></Table>
          <Page size='small' style="font-size:10px;margin-top: 13px" :total="pageTotal" :current="pageNum" :page-size="pageSize" :page-size-opts="[5]" show-elevator show-sizer show-total
                placement="top" @on-change="handlePage" @on-page-size-change="handlePageSize" />
        </div>
      </i-col>
      <i-col span="8" class="card">
        <Card>
          <h3>系统信息</h3>
          系统类型：
          <h5>{{sysName}}</h5>
          cpu架构：
          <h5>{{arch}}</h5>
          内存使用率：
          <Progress :percent="mem"  stroke-color="#5cadff" />
          cpu使用率：
          <Progress :percent="cpu"  stroke-color="#2b85e4"/>
          磁盘使用率：
          <Progress :percent="disk"  stroke-color="#ff9900"/>
          网络使用率：
          <Progress :percent="internet"  stroke-color="#00CC33"/>
        </Card>
      </i-col>
    </Row>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
let moment = require('moment')
export default {
  data () {
    return {
      sysName: '',
      arch: '',
      mem: 0,
      cpu: 0,
      disk: 90,
      internet: 40,
      pageTotal: 0,
      pageNum: 1,
      pageSize: 5,
      channelName: 'mychannel',
      peer: 'peer0.org1.example.com',
      block: {
        number: '',
        previous_hash: '',
        timestamp: '',
        creator: ''
      },
      chaincodeNumber: 0,
      channelNumber: 0,
      caNumber: 0,
      peerNumber: 0,
      ordererNumber: 0,
      orgNumber: 0,
      columns: [
        {
          title: '区块高度',
          key: 'number',
          width: 90
        },
        {
          title: '前一块hash',
          key: 'previous_hash',
          align: 'center',
          width: 300
        },
        {
          title: '时间戳',
          key: 'timestamp',
          align: 'center'
        },
        {
          title: '创建者',
          key: 'creator',
          align: 'center',
          width: 100
        }
      ],
      blocks: []
    }
  },
  mounted () {
    this.getBlockTab(this.channelName, this.peer)
    this.getNetConfigSetting()
    this.getSys()
  },
  methods: {
    ...mapActions([
      'getNetConfig',
      'channelInformation',
      'byBlockNumber',
      'getSystemMessage'
    ]),
    getSys () {
      this.getSystemMessage().then(res => {
        if (res.result === true) {
          this.cpu = res.data.cpu * 100
          this.arch = res.data.arch
          this.mem = (res.data.totalMem - res.data.freeMem) / res.data.totalMem * 100
          this.sysName = res.data.sysName
        }
      })
    },
    getNetConfigSetting: function () {
      this.getNetConfig().then(res => {
        if (res.result === true) {
          this.chaincodeNumber = this.getChaincodeNum(res.data.channels)
          this.channelNumber = this.getJsonLength(res.data.channels)
          this.caNumber = this.getJsonLength(res.data.certificateAuthorities)
          this.peerNumber = this.getJsonLength(res.data.peers)
          this.ordererNumber = this.getJsonLength(res.data.orderers)
          this.orgNumber = this.getJsonLength(res.data.organizations)
        }
      })
      this.channelInformation({peer: this.peer, channelName: this.channelName}).then(res => {
        console.log(res)
        if (res.result === true) {
          this.pageTotal = res.data.height.low
          this.getBlockTab(this.channelName, this.peer, res.data.height.low)
        }
      })
    },
    getJsonLength (obj) {
      let i = 0
      for (var k in obj) {
        if (k !== '' && obj[k] !== null) {
          i++
        }
      }
      return i
    },
    getChaincodeNum (obj) {
      let i = 0
      for (var k in obj) {
        i = i + obj[k].chaincodes.length
      }
      return i
    },
    handlePage (value) {
      this.pageNum = value
      this.getBlockTab(this.channelName, this.peer, this.pageTotal)
    },
    handlePageSize (value) {
      this.pageSize = value
      this.getBlockTab(this.channelName, this.peer, this.pageTotal)
    },
    getBlockTab (channelName, peer, total) {
      console.log(total)
      var blocks = []
      if (this.pageNum === 1) {
        if (total <= this.pageSize) {
          for (let i = this.pageTotal; i > 1; i--) {
            blocks.push(this.getBlock(peer, i - 1, channelName))
          }
          for (let j = 0; j <= this.pageSize - this.pageTotal; j++) {
            blocks.push(this.block)
          }
        } else if (total > this.pageSize) {
          for (let i = total; i > total - this.pageSize; i--) {
            blocks.push(this.getBlock(peer, i - 1, channelName))
          }
        }
      } else {
        let start = total - this.pageSize * (this.pageNum - 1)
        let end = start - this.pageSize
        if (end <= 0) {
          end = 1
        }
        for (let i = start; i > end; i--) {
          blocks.push(this.getBlock(peer, i - 1, channelName))
        }
        for (let j = 0; j <= this.pageSize - start; j++) {
          blocks.push(this.block)
        }
      }
      this.blocks = blocks
    },
    findBlocks (channelName, peer) {
      var total = 0
      var params = {}
      params.channelName = channelName
      params.peer = peer
      params.blockId = 2
      this.channelInfomation(params).then(res => {
        if (res.resolve === true) {
          total = res.data.height.low
        }
      })
      this.pageTotal = total
      this.getBlockTab(channelName, peer, total)
    },
    getBlock (peer, number, channelName) {
      let block = {
        number: 0,
        previous_hash: '',
        timestamp: '',
        creator: ''
      }
      this.byBlockNumber({peer: peer, blockId: number, channelName: channelName}).then(res => {
        if (res.result === true) {
          block.number = res.data.header.number
          block.previous_hash = res.data.header.previous_hash
          block.timestamp = moment(res.data.data.data[0].payload.header.timestamp).format('YYYY-MM-DD hh:mm:ss')
          block.creator = res.data.data.data[0].payload.header.signature_header.creator.Mspid
        } else {
          block = null
        }
      })
      return block
    }
  }
}
</script>

<style lang="less">
  .card{
    padding-top: 8px;
    padding-bottom: 8px;
  }
</style>
