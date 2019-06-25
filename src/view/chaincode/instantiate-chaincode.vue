<template>
  <div>
    <Card>
      <Alert show-icon>
        该接口是实例化合约,peers参数不是必须的，fcn和args参数要根据合约的初始化方法来设定
      </Alert>
      <Alert show-icon>
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
        API接口参数示例：
        <template slot="desc">
          <pre style="overflow: auto;">{{simple}}</pre>
        </template>
      </Alert>
      <Form ref="channelFrom" :model="channelFrom" :rules="ruleValidate" :label-width="100">
        <Row>
          <i-col span="24">
            <FormItem label="通道名称" prop="channelName">
              <Input v-model="channelFrom.channelName" clearable placeholder="输入通道名称" style="width: 50%" />
            </FormItem>
          </i-col>
          <i-col span="24">
            <FormItem label="合约名称" prop="chaincodeName">
              <Input v-model="channelFrom.chaincodeName" clearable placeholder="输入合约名称" style="width: 50%" />
            </FormItem>
          </i-col>
          <i-col span="24">
            <FormItem label="语言类型" prop="chaincodeType">
              <Input v-model="channelFrom.chaincodeType" clearable placeholder="输入合约语言类" style="width: 50%" />
            </FormItem>
          </i-col>
          <i-col span="24">
            <FormItem label="合约版本" prop="chaincodeVersion">
              <Input v-model="channelFrom.chaincodeVersion" clearable placeholder="输入合约版本" style="width: 50%" />
            </FormItem>
          </i-col>
          <i-col span="24">
            <FormItem label="节点名称" prop="peer">
              <Tag color="green" v-for="item in channelFrom.peers" :key="item" :name="item" closable @on-close="handleClose1">{{ item }}</Tag>
              <Button icon="ios-add" type="dashed" size="small" @click="handleAdd1">添加节点</Button>
            </FormItem>
          </i-col>
          <i-col span="24">
            <FormItem label="方法名称" prop="fcn">
              <Input v-model="channelFrom.fcn" clearable placeholder="输入需要执行的方法名称" style="width: 50%" />
            </FormItem>
          </i-col>
          <i-col span="24">
            <FormItem label="方法参数" prop="args">
              <Tag color="green" v-for="item in channelFrom.args" :key="item" :name="item" closable @on-close="handleClose">{{ item }}</Tag>
              <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加参数</Button>
            </FormItem>
          </i-col>
          <i-col span="24">
            <FormItem>
              <Button type="primary" :loading="modal_loading" @click="handleSubmit('channelFrom')">提交</Button>
              <Button @click="handleReset('channelFrom')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Card>
    <Card :hidden="hidden">
      <Alert type="success" show-icon>
        返回结果：
        <span slot="desc">
          <pre style="overflow: auto;background-color: lightblue">{{result}}</pre>
        </span>
      </Alert>
    </Card>
    <Modal
      v-model="modal"
      title="参数输入"
      @on-ok="ok"
      @on-cancel="cancel">
      <Input v-model="arg" clearable placeholder="输入参数" style="width: 100%" />
    </Modal>
    <Modal
      v-model="modal1"
      title="节点名称输入"
      @on-ok="ok1"
      @on-cancel="cancel1">
      <Input v-model="peer" clearable placeholder="输入参数" style="width: 100%" />
    </Modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      modal1: false,
      peer: '',
      simple: {
        'channelName': 'mychannel',
        'chaincodeName': 'mycc',
        'chaincodeType': 'golang',
        'chaincodeVersion': 'v0',
        'peers': ['peer0.org2.example.com', 'peer1.org1.example.com'],
        'fcn': '',
        'args': ['a', '100', 'b', '200']
      },
      modal: false,
      arg: '',
      modal_loading: false,
      hidden: true,
      result: '',
      channelFrom: {
        channelName: '',
        chaincodeName: '',
        chaincodeType: '',
        chaincodeVersion: '',
        peers: [],
        fcn: '',
        args: []
      },
      ruleValidate: {
        channelName: [
          {
            required: true,
            message: '通道名称不能为空',
            trigger: 'blur'
          },
          {
            type: 'string',
            max: 50,
            message: '不能超过50个字符',
            trigger: 'blur'
          }
        ],
        chaincodeName: [
          {
            required: true,
            message: '合约名称不能为空',
            trigger: 'blur'
          }
        ],
        chaincodeVersion: [
          {
            required: true,
            message: '合约版本号不能为空',
            trigger: 'blur'
          }
        ],
        chaincodeType: [
          {
            required: true,
            message: '合约语言类型不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'instantiate'
    ]),
    ok () {
      this.channelFrom.args.push(this.arg)
      this.arg = ''
    },
    cancel () {
      this.arg = ''
    },
    handleAdd () {
      this.modal = true
    },
    handleClose (event, name) {
      const index = this.channelFrom.args.indexOf(name)
      this.channelFrom.args.splice(index, 1)
    },
    ok1 () {
      this.channelFrom.peers.push(this.peer)
      this.peer = ''
    },
    cancel1 () {
      this.peer = ''
    },
    handleAdd1 () {
      this.modal1 = true
    },
    handleClose1 (event, name) {
      const index = this.channelFrom.peers.indexOf(name)
      this.channelFrom.peers.splice(index, 1)
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.modal_loading = true
          var params = {}
          params.channelName = this.channelFrom.channelName
          params.chaincodeName = this.channelFrom.chaincodeName
          params.chaincodeType = this.channelFrom.chaincodeType
          params.chaincodeVersion = this.channelFrom.chaincodeVersion
          params.fcn = this.channelFrom.fcn
          params.args = this.channelFrom.args
          params.peers = this.channelFrom.peers
          this.instantiate(params).then(res => {
            console.log(res)
            if (res.result === true) {
              this.$Message.success('Build Success!')
              setTimeout(() => {
                this.modal_loading = false
                this.hidden = false
                this.result = res
              }, 1000)
            } else {
              this.$Message.error(res.message)
              setTimeout(() => {
                this.modal_loading = false
                this.hidden = false
                this.result = res
              }, 1000)
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>

<style>

</style>
