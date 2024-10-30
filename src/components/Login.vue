<template>
  <div class="login-container">
    <div class="login-content">
      <h1 class="main-title">后台管理系统</h1>
      <div class="login-form">
        <h2>登录</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">用户名：</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="input-group">
            <label for="password">密码：</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit">登录</button>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await request.post('/v1/platform/login', {
          user_name: this.username,
          password: this.password
        })
        
        const { code, msg, data } = response.data
        
        if (code === 0) {
          localStorage.setItem('user_name', data.user_name)
          localStorage.setItem('token', data.token)
          this.error = null
          // 修改跳转路径
          this.$router.push('/main/checkout-list')
        } else {
          this.error = msg
        }
      } catch (error) {
        console.error('登录失败', error)
        this.error = error.response?.data?.msg || '登录失败，请检查网络连接'
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  box-sizing: border-box;
}

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
}

.main-title {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 100%;
}

.login-form {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
}

h2 {
  color: #333;
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  text-align: left;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.error {
  color: #ff3860;
  margin-top: 1rem;
}
</style>
