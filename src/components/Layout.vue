<template>
  <div class="layout">
    <div class="header">
      <div class="user-info" @click="toggleDropdown">
        <img :src="defaultAvatar" class="avatar" alt="用户头像">
        <span class="username">{{ username }}</span>
        <div class="dropdown" v-if="showDropdown">
          <div class="dropdown-item" @click="handleLogout">退出登录</div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="sidebar">
        <div class="menu">
          <div class="menu-item" @click="goToCheckoutList">
            <i class="fas fa-money-bill"></i>
            <span>结账列表</span>
          </div>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return {
      showDropdown: false,
      defaultAvatar: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjY3IDAgNC44NCAyLjE3IDQuODQgNC44NCAwIDIuNjctMi4xNyA0Ljg0LTQuODQgNC44NC0yLjY3IDAtNC44NC0yLjE3LTQuODQtNC44NCAwLTIuNjcgMi4xNy00Ljg0IDQuODQtNC44NHptMCAxMmE5LjA1IDkuMDUgMCAwIDEtNy41Mi0zLjk2YzAuMDMtMi40OCA1LjAyLTMuODQgNy41Mi0zLjg0czguNDkgMS4zNiA4LjUyIDMuODRhOS4wNSA5LjA1IDAgMCAxLTcuNTIgMy45NnoiIGZpbGw9IiM2NjY2NjYiLz48L3N2Zz4=', // 默认头像
      username: localStorage.getItem('user_name') || '用户'
    }
  },
  methods: {
    goToCheckoutList() {
      this.$router.push('/main/checkout-list')
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    handleLogout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user_name')
      this.$router.push('/login')
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      const userInfo = document.querySelector('.user-info')
      if (userInfo && !userInfo.contains(e.target)) {
        this.showDropdown = false
      }
    })
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background-color: #fff;
  height: 60px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding: 0 10px;
  height: 100%;
}

.user-info:hover {
  background-color: #f5f5f5;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

.username {
  color: #333;
  font-size: 14px;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 120px;
  z-index: 1000;
}

.dropdown-item {
  padding: 8px 16px;
  color: #333;
  transition: background-color 0.3s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
}

.menu-item {
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s;
}

.menu-item i {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.menu-item:hover {
  background-color: #34495e;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
  background-color: #f0f2f5;
}
</style>
