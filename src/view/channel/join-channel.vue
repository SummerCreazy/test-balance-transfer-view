<template>
  <div>
    <Card>
      <Alert show-icon>
        该接口是加入通道,节点集合必须是登录的用户所在的组织下的节点
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
            <FormItem label="节点集合" prop="peers">
              <Tag color="green" v-for="item in channelFrom.peers" :key="item" :name="item" closable @on-close="handleClose">{{ item }}</Tag>
              <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加节点</Button>
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
      title="Common Modal dialog box title"
      @on-ok="ok"
      @on-cancel="cancel">
      <Input v-model="peerName" clearable placeholder="输入节点名称" style="width: 50%" />
    </Modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      simple: {
        'channelName': 'mychannel',
        'peers': ['peer0.org1.example.com', 'peer1.org1.example.com']
      },
      modal: false,
      peerName: '',
      hidden: true,
      modal_loading: false,
      result: '',
      channelFrom: {
        channelName: '',
        peers: []
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
        peers: [
          {
            required: true,
            message: '节点名称不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'createChannel'
    ]),
    ok () {
      this.channelFrom.peers.push(this.peerName)
      this.peerName = ''
    },
    cancel () {
      this.peerName = ''
    },
    handleAdd () {
      this.modal = true
    },
    handleClose (event, name) {
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
          params.peers = this.channelFrom.peers
          this.createChannel(params).then(res => {
            console.log(res)
            if (res.success === true) {
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
