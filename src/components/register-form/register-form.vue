<template>
  <Form ref="registerForm" :model="form" :rules="rules">
    <FormItem prop="username">
      <i-input v-model="form.username" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="person"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem prop="orgName">
      <i-input v-model="form.orgName" placeholder="请输入组织名">
        <span slot="prepend">
          <Icon :size="16" type="person"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>注册</Button>
    </FormItem>
    <FormItem>
      <Button @click="jumpRegister" type="success" long>去登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'RegisterForm',
  props: {
    usernameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    orgNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '组织不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        username: '',
        orgName: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        username: this.usernameRules,
        orgName: this.orgNameRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            username: this.form.username,
            orgName: this.form.orgNameRules
          })
        }
      })
    },
    jumpRegister () {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>
