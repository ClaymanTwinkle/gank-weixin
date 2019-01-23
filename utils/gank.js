
function getTodayData(callback) {
  wx.request({
    url: 'https://gank.io/api/today',
    success(res) {
      if (res.statusCode == 200) {
        callSuccess(callback, res.data);
      } else {
        callFail(callback, res.errMsg || "request:error");
      }
    },
    fail: (e) => {
      callFail(callback, e.errMsg);
    }
  })
}

function getGankData(type, count, page, callback) {
  wx.request({
    url: 'https://gank.io/api/data/'+type+'/'+count+'/' + page,
    success(res) {
      if(res.statusCode == 200) {
        callSuccess(callback, res.data);
      } else {
        callFail(callback, res.errMsg||"request:error");
      }
    },
    fail:(e)=>{
      callFail(callback, e.errMsg);
    }
  })
}

function callSuccess(callback, res) {
  callback && callback.success && callback.success(res);
}

function callFail(callback, e) {
  callback && callback.fail && callback.fail(e);
}

module.exports = {
  getGankData: getGankData,
  getTodayData: getTodayData
}
