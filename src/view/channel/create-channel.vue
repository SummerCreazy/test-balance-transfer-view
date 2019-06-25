<template>
  <div>
    <Card>
      <Alert show-icon>
        该接口是创建通道,通道名是你生成通道文件时设定的，不可随意设置
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
            <FormItem label="文件路径" prop="channelConfigPath">
              <Input v-model="channelFrom.channelConfigPath" clearable placeholder="通道文件所在路径" style="width: 50%" />
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
      hidden: true,
      result: '',
      simple: {
        'channelName': 'mychannel',
        'channelConfigPath': '../artifacts/channel/mychannel.tx'
      },
      channelFrom: {
        channelName: '',
        channelConfigPath: ''
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
        channelConfigPath: [
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
      'createChannel'
    ]),
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.modal_loading = true
          var params = {}
          params.channelName = this.channelFrom.channelName
          params.channelConfigPath = this.channelFrom.channelConfigPath
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
