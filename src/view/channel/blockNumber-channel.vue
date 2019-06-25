<template>
  <div>
    <Card>
      <Alert show-icon>
        该接口是根据区块高度查询区块信息
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
            <FormItem label="节点名称" prop="peer">
              <Input v-model="channelFrom.peer" clearable placeholder="输入节点名称" style="width: 50%" />
            </FormItem>
          </i-col>
          <i-col span="24">
            <FormItem label="区块高度" prop="blockId">
              <InputNumber :min="1" v-model="channelFrom.blockId" style="width: 50%"></InputNumber>
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
        'peer': 'peer0.org1.example.com',
        'blockId': 2
      },
      modal_loading: false,
      hidden: true,
      result: '',
      channelFrom: {
        channelName: '',
        peer: '',
        blockId: 1
      },
      ruleValidate: {
        channelName: [
          {
            required: true,
            message: '通道名称不能为空',
            trigger: 'blur'
          }
        ],
        peer: [
          {
            required: true,
            message: '节点名称不能为空',
            trigger: 'blur'
          }
        ],
        blockId: [
          {
            required: true
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'byBlockNumber'
    ]),
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    findBuffer (obj) {
      for (var k in obj) {
        if (k === 'type' && obj[k] === 'Buffer') {
          return true
        }
      }
      return false
    },
    bTs (obj) {
      for (var k in obj) {
        if (typeof obj[k] === 'object') {
          if (this.findBuffer(obj[k])) {
            let json = JSON.stringify(obj[k])
            console.log(json)
            console.log(JSON.parse(json))
            let co = Buffer.from(JSON.parse(json))
            obj[k] = co.toString('utf-8')
          } else {
            this.bTs(obj[k])
          }
        }
      }
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.modal_loading = true
          var params = {}
          params.channelName = this.channelFrom.channelName
          params.blockId = this.channelFrom.blockId
          params.peer = this.channelFrom.peer
          this.byBlockNumber(params).then(res => {
            console.log(res)
            if (res.result === true) {
              this.$Message.success('Build Success!')
              setTimeout(() => {
                this.modal_loading = false
                this.hidden = false
                this.bTs(res)
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
