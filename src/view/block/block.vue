<template>
  <div>
    <Card>
        <Input v-model="searchParam" :type="inputType" placeholder="区块号\区块hash\交易hash" @on-change="turnInt()" :maxlength="maxLength">
          <Select v-model="searchType" slot="prepend" class="ivu-select-selected-value" style="width: 150px;background-color: #57a3f3;" @on-change="changeInputType(searchType)">
            <Option value="1">区块高度查询</Option>
            <Option value="2">区块哈希查询</Option>
            <Option value="3">交易哈希查询</Option>
          </Select>
          <Button slot="append" icon="ios-search" style="background-color: #57a3f3;color:white" @click="search()"></Button>
        </Input>
    </Card>
    <Modal
      v-model="modal1"
      title="区块信息"
      :styles="{top: '20px', width: '70%'}">
      <pre style="overflow: auto;background-color: lightblue">{{blockMessage3}}</pre>
    </Modal>
    <Card>
        <Row :gutter="20">
          <i-col span="8" style="height: 10rem;color:#666666;">
           <Card style="text-align: center">
             <p>最新区块高度</p>
             <count-to :end="blockHeight" count-class="count-style"/>
           </Card>
          </i-col>
          <i-col span="8" style="height: 10rem;color:#666666;">
            <Card style="text-align: center">
              <label>最新区块哈希</label>
              <h3><p style="word-wrap: break-word;">{{currentBlockHash}}</p></h3>
            </Card>
          </i-col>
          <i-col span="8" style="height: 10rem;color:#666666;">
            <Card style="text-align: center">
              <label>上一区块哈希</label>
              <h3><p style="word-wrap: break-word;">{{currentBlockHash}}</p></h3>
            </Card>
          </i-col>
        </Row>
      <Card v-if="blocks.length !== 0" v-for="item in blocks" :key="item.blockNumber">
        <div slot="title">
          <Icon type="steam"></Icon>
          区块信息
        </div>
        <div >
          <div>
            <label>区块高度</label>
            <label>{{item.blockNumber}}</label>
          </div>
          <div>
            <label>当前区块哈希</label>
            <label>{{item.calculatedBlockHash}}</label>
          </div>
          <div>
            <label>上一区块哈希</label>
            <label>{{item.previousHashID}}</label>
          </div>
          <div>
            <label>时间戳</label>
            <label>{{item.envelopes[0].timestamp}}</label>
          </div>
        </div>
        <Collapse active-key="1" style="background-color: #19be6b;">
          <Panel key="1" style="color:white">
            区块详细信息
            <pre slot="content" style="overflow: auto;background-color: lightblue">{{item}}</pre>
          </Panel>
        </Collapse>
      </Card>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <Button type="info" :loading="loading2" @click="toLoading" long>
        <span v-if="!loading2">加载更多</span>
        <span v-else>Loading...</span>
      </Button>
    </Card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CountTo from '_c/count-to'
export default {
  components: {
    CountTo
  },
  data () {
    return {
      loading2: false,
      maxLength: 70,
      blocks: [],
      inputType: 'text',
      searchParam: null,
      searchType: '1',
      spinShow: true,
      modal1: false,
      searchHeight: null,
      searchHash: null,
      searchTransactionHash: null,
      blockMessage3: '',
      blockHeight: 0,
      currentBlockHash: '',
      previousBlockHash: '',
      timeStamp: '',
      blockMessage: {},
      blockHeight1: 0,
      currentBlockHash1: '',
      previousBlockHash1: '',
      timeStamp1: '',
      blockMessage1: {},
      blockHeight2: 0,
      currentBlockHash2: '',
      previousBlockHash2: '',
      timeStamp2: '',
      blockMessage2: {},
      lastHeight: 0,
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions([
      'queryBlockByTransactionID',
      'queryBlockByNumber',
      'queryBlockByHash',
      'queryBlockchainInfo'
    ]),
    init () {
      this.queryBlockchainInfo().then(res => {
        if(res.result == true){
          let data = res.data
          this.blockHeight = data.height - 1
          this.currentBlockHash = data.currentBlockHash
          this.previousBlockHash = data.previousBlockHash
          this.lastHeight = this.blockHeight
          for(var i=0;i<2;i++){
            if(this.lastHeight >= 0) {
              this.queryBlockByNumber({ blockHeight: this.lastHeight-- }).then(res => {
                if(res.result == true){
                  let data = res.data
                  this.blocks.push(data)
                }
              })
            }
          }
        }
        setTimeout(() => {
          this.spinShow = false
        }, 1500)
      })
    },
    search () {
      console.log(this.searchParam)
      let param = this.searchParam
      if(this.isNull(param)){
        return
      }
      if(this.isNull(this.searchType)){
        return
      }
      switch(this.searchType) {
        case "1":
          this.searchByHeight(param)
          break
        case "2":
          this.searchByHash(param)
          break
        case "3":
          this.searchByTransactionHash(param)
          break
        default:
          break
      }
    },
    changeInputType (searchType) {
      if(searchType === '1') {
        this.inputType = 'number'
        this.searchParam = 0
      } else {
        this.inputType = 'text'
        this.searchParam = null
      }
    },
    turnInt () {
      if(this.searchType === '1'){
        if(this.searchParam === '') {
          return
        }
        this.searchParam = this.searchParam.replace(/\D/g,'').replace(/^0+(?=\d)/,'')
        if(this.searchParam >= 1000000000000000000000) {
          this.searchParam = 0
          this.$Message.error('数值不能>=1000000000000000000000')
        }
      }
    },
    searchByHeight (param) {
      this.blockMessage3 = ''
      // if(this.isString(param)){
      //   this.$Message.error('参数类型错误')
      //   return
      // }
      this.queryBlockByNumber({ blockHeight: param }).then(res => {
        if(res.result == true){
          this.modal1 = true
          this.blockMessage3 = res.data
        }else {
          this.$Modal.error({
            title: '查询错误',
            content: '没有找到与该区块高度相关的区块信息！'
          })
        }
        this.searchHeight = null
      })
    },
    searchByHash (param) {
      this.blockMessage3 = ''
      this.queryBlockByHash({ blockHash: param }).then(res => {
        if(res.result == true){
          this.modal1 = true
          this.blockMessage3 = res.data
        }else {
          this.$Modal.error({
            title: '查询错误',
            content: '没有找到与该哈希地址相关的区块信息！'
          })
        }
        this.searchHash = null
      })
    },
    searchByTransactionHash (param) {
      this.blockMessage3 = ''
      this.queryBlockByTransactionID({transactionHash: param}).then(res => {
        if(res.result == true){
          this.modal1 = true
          this.blockMessage3 = res.data
        }else{
          this.$Modal.error({
            title: '查询错误',
            content: '没有找到与该哈希地址相关的区块信息！！'
          })
        }
        this.searchTransactionHash = null
      })
    },
    isNull (param) {
      // if(this.searchType === '1') {
      //   if(this.searchParam.isNaN()) {
      //     this.$Message.error('参数为空')
      //     return true
      //   }
      // }
      if(param === null || param === '' || param === undefined){
        this.$Message.error('参数为空')
        return true
      }
      return false
    },
    toLoading () {
      this.loading2 = true;
      if(this.lastHeight >= 0) {
        this.queryBlockByNumber({ blockHeight: this.lastHeight }).then(res => {
          if(res.result == true){
            this.lastHeight--
            let data = res.data
            this.blocks.push(data)
            this.loading2 = false
          }else {
            this.$Message.error(res.code)
            this.loading2 = false
          }
        })
      }
    },
    isString (str) {
      if(Object.prototype.toString.call(str) === "[object String]"){
        console.log("是字符串")
        return true
      }else{
        console.log("不是字符串")
        return false
      }
    }
  }
}
</script>

<style>
  .count-style{
    font-size: 50px;
  }
  .ivu-select-selected-value{
    color:white;
    display: block;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 8px;
    padding-right: 24px;
  }
</style>
