<template>
  <div>
    <Card>
      <Alert show-icon>
        此处的参数示例是根据已经安装好的合约进行的，其具体的调用方法fcn和args是根据合约来的,如想要测试自己的合约还是要根据合约具体的方法来测试！
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
          <!--<i-col span="24">-->
            <!--<FormItem label="节点名称" prop="peer">-->
              <!--<Input v-model="channelFrom.peer" clearable placeholder="输入需要在哪个节点执行查询的节点名称" style="width: 50%" />-->
            <!--</FormItem>-->
          <!--</i-col>-->
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      simple: {
        'channelName': 'mychannel',
        'chaincodeName': 'mycc',
        'fcn': 'move',
        'args': ['a', 'b', '10']
      },
      modal: false,
      arg: '',
      modal_loading: false,
      hidden: true,
      result: '',
      channelFrom: {
        channelName: '',
        chaincodeName: '',
        peer: '',
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
        fcn: [
          {
            required: true,
            message: '通道文件所在路径不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'invoke'
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
          params.fcn = this.channelFrom.fcn
          params.args = this.channelFrom.args
          this.invoke(params).then(res => {
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
