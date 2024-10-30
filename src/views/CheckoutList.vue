<template>
  <div class="checkout-list">
    <div class="page-header">
      <h2>结账列表</h2>
      <div class="search-form">
        <div class="search-group">
          <div class="search-item">
            <label>姓名：</label>
            <input type="text" v-model="user_name" placeholder="请输入临时工姓名">
          </div>
          <div class="search-item">
            <label>派发车间：</label>
            <input type="text" v-model="dispatch_depart_name" placeholder="请输入派发车间">
          </div>
          <div class="button-group">
            <button class="search-btn" @click="fetchData">查询</button>
            <button class="reset-btn" @click="handleReset">重置</button>
          </div>
        </div>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>流水号</th>
            <th>用户名</th>
            <th>手机号</th>
            <th>工号</th>
            <th>车间名称</th>
            <th>结账方式</th>
            <th>计时工资</th>
            <th>工作时长</th>
            <th>休息时长</th>
            <th>离岗时长</th>
            <th>上班时长</th>
            <th>增减工时</th>
            <th>结算工时</th>
            <th>增减原因</th>
            <th>结算工资</th>
            <th>审核状态</th>
            <th>结账状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listData" :key="item.flow_no">
            <td>{{ item.flow_no }}</td>
            <td>{{ item.realname }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.work_no }}</td>
            <td>{{ item.dispatch_depart_name }}</td>
            <td>{{ getCheckoutMethod(item.checkout_method) }}</td>
            <td>{{ item.hour_wages }}</td>
            <td>{{ item.work_hour }}</td>
            <td>{{ item.rest_hour }}</td>
            <td>{{ item.leave_hour }}</td>
            <td>{{ item.duty_hour }}</td>
            <td>{{ item.change_hour }}</td>
            <td>{{ item.checkout_hour }}</td>
            <td>{{ item.change_reason }}</td>
            <td>{{ item.gross_wages }}</td>
            <td>{{ getCheckStatus(item.check_status) }}</td>
            <td>{{ getCheckoutStatus(item.checkout_status) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'CheckoutList',
  data() {
    return {
      user_id: '',
      dispatch_id: '',
      listData: []
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await request.get('/v1/receive_send/temp_worker/checkout/list', {
          params: {
            user_id: this.user_id,
            dispatch_id: this.dispatch_id
          }
        })
        
        if (response.data.code === 0) {
          this.listData = response.data.data.list
        } else {
          alert(response.data.msg)
        }
      } catch (error) {
        console.error('获取数据失败', error)
        alert('获取数据失败，请检查网络连接')
      }
    },
    getCheckoutMethod(value) {
      return value === 1 ? '计时' : '计件'
    },
    getCheckStatus(value) {
      const status = {
        1: '未审核',
        2: '通过',
        3: '不通过'
      }
      return status[value] || value
    },
    getCheckoutStatus(value) {
      return value === 1 ? '未结账' : '已结账'
    },
    getAttendanceStatus(value) {
      const status = {
        1: '未到',
        2: '上班中',
        3: '下班'
      }
      return status[value] || value
    },
    handleReset() {
      this.user_id = ''
      this.dispatch_id = ''
      this.fetchData() // 重置后重新加载数据
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style scoped>
.checkout-list {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin: 0;
  height: 100%;
}

.page-header {
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.page-header h2 {
  margin: 0 0 16px 0;
  color: #1f2937;
  font-size: 20px;
}

.search-form {
  padding: 16px 0;
}

.search-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: auto;
}

.search-item label {
  white-space: nowrap;
  color: #4b5563;
  font-size: 14px;
  min-width: 85px;
  text-align: right;
}

.search-item input {
  width: 180px;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s;
}

.search-item input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
}

.search-btn {
  padding: 8px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #4338ca;
}

.table-container {
  overflow-x: auto;
  padding: 0 24px 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-top: 16px;
  border: 1px solid #e5e7eb;
}

th {
  background-color: #f8fafc;
  color: #4b5563;
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  white-space: nowrap;
}

td {
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  color: #1f2937;
  font-size: 14px;
}

/* 奇数行背景色 */
tr:nth-child(odd) td {
  background-color: #ffffff;
}

/* 偶数行背景色，使用更深的颜色 */
tr:nth-child(even) td {
  background-color: #f3f4f6;
}

/* 鼠标悬停效果，使用更明显的高亮色 */
tr:hover td {
  background-color: #e5e7eb;
}

/* 状态样式 */
td:nth-last-child(-n+3) {
  font-weight: 500;
}

/* 审核状态 */
td:nth-last-child(3) {
  color: #059669;
}

/* 结账状态 */
td:nth-last-child(2) {
  color: #2563eb;
}

/* 上班状态 */
td:nth-last-child(1) {
  color: #dc2626;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-group {
    flex-wrap: wrap;
  }

  .search-item {
    flex: 1 1 100%;
  }

  .button-group {
    margin-left: 0;
    width: 100%;
  }
}

/* 滚动条美化 */
.table-container::-webkit-scrollbar {
  height: 8px;
}

.table-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.button-group {
  display: flex;
  gap: 8px;
  margin-left: 8px;
}

.search-btn, .reset-btn {
  padding: 8px 20px;
  height: 36px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  white-space: nowrap;
}

.search-btn {
  background-color: #4f46e5;
  color: white;
}

.search-btn:hover {
  background-color: #4338ca;
}

.reset-btn {
  background-color: #ffffff;
  color: #4b5563;
  border: 1px solid #d1d5db;
}

.reset-btn:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .button-group {
    width: 100%;
  }

  .search-btn, .reset-btn {
    flex: 1;
  }
}
</style>
