<template>
  <div>
    <Card>
      <Alert show-icon>
        该接口是获取当前fabric网络配置, 无需参数
      </Alert>
      <!--<Alert show-icon>-->
        <!--<Icon type="ios-bulb-outline" slot="icon"></Icon>-->
        <!--API接口参数示例：-->
        <!--<template slot="desc">-->
          <!--<pre style="overflow: auto;">{{simple}}</pre>-->
        <!--</template>-->
      <!--</Alert>-->
      <!--<Form ref="channelFrom" :model="channelFrom" :rules="ruleValidate" :label-width="100">-->
        <!--<Row>-->
          <!--<i-col span="24">-->
            <!--<FormItem>-->
              <Button type="primary" :loading="modal_loading" @click="handleSubmit()">提交</Button>
              <!--<Button @click="handleReset('channelFrom')" style="margin-left: 8px">重置</Button>-->
            <!--</FormItem>-->
          <!--</i-col>-->
        <!--</Row>-->
      <!--</Form>-->
    </Card>
    <Card :hidden="hidden">
      <Alert :type="type" show-icon>
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
      type: 'success',
      modal1: false,
      peer: '',
      simple: {
        'peer': 'peer0.org1.example.com'
      },
      modal_loading: false,
      hidden: true,
      result: '',
      channelFrom: {
      },
      ruleValidate: {
      }
    }
  },
  methods: {
    ...mapActions([
      'getNetConfig'
    ]),
    // handleReset (name) {
    //   this.$refs[name].resetFields()
    // },
    handleSubmit () {
      this.modal_loading = true
      this.getNetConfig().then(res => {
        console.log(res)
        if (res.result === true) {
          this.$Message.success('Build Success!')
          setTimeout(() => {
            this.modal_loading = false
            this.hidden = false
            this.type = 'success'
            this.result = res
          }, 1000)
        } else {
          this.$Message.error(res.message)
          setTimeout(() => {
            this.modal_loading = false
            this.hidden = false
            this.type = 'error'
            this.result = res
          }, 1000)
        }
      })
    }
  }
}
</script>

<style>

</style>
