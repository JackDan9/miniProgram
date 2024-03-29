// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util_bak'

Page({
  data: {
    logs: [],
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log: string) => {
        return formatTime(new Date(log))
      }),
    })
  },
})
