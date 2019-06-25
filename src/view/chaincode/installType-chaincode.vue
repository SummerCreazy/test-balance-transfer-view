<template>
  <div>
    <Alert show-icon>
     该接口是查询节点上所有安装和实例化的合约
    </Alert>
    <Card>
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
            <FormItem label="节点名称" prop="peer">
              <Input v-model="channelFrom.peer" clearable placeholder="输入需要在哪个节点执行查询的节点名称" style="width: 50%" />
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
        simple: {
          "peer": "peer1.org2.example.com"
        },
        modal: false,
        arg: '',
        modal_loading: false,
        hidden: true,
        result: '',
        channelFrom: {
          peer: ''
        },
        ruleValidate: {
          peer: [
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
        'installType'
      ]),
      handleReset (name) {
        this.$refs[name].resetFields()
      },
      handleSubmit (name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.modal_loading = true
            var params = {}
            params.peer = this.channelFrom.peer
            this.installType(params).then(res => {
              console.log(res)
              if (res.result === true) {
                this.$Message.success('Build Success!')
                setTimeout(() => {
                  // this.handleReset(name)
                  this.modal_loading = false
                  this.hidden = false
                  this.result = res
                  // this.getAllCompanies()
                }, 1000)
              } else {
                this.$Message.error(res.message)
                setTimeout(() => {
                  // this.handleReset(name)
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
