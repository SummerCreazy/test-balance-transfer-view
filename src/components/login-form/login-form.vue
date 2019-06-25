<template>
  <Form ref="loginForm" :model="form" :rules="rules">
    <FormItem prop="username">
      <i-input v-model="form.username" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="person"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem prop="password">
      <i-input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="locked"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem prop="orgName">
      <i-input  v-model="form.orgName" placeholder="请输入所在组织">
        <span slot="prepend">
          <Icon :size="14" type="locked"></Icon>
        </span>
      </i-input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
    <FormItem>
      <Button @click="jumpRegister" type="success" long>去注册</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    usernameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
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
        password: '',
        orgName: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        username: this.usernameRules,
        password: this.passwordRules,
        orgName: this.orgNameRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            username: this.form.username,
            password: this.form.password,
            orgName: this.form.orgName
          })
        }
      })
    },
    jumpRegister () {
      this.$router.push({
        name: 'register'
      })
    }
  }
}
</script>
