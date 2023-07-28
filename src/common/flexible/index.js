/* eslint-disable */
;(function(win) {
  var docEl = win.document.documentElement;

  function resizeHandle() {
    // UI设计师以 iPhone6 为设置标准
    var docWidth = docEl.getBoundingClientRect().width || 375
    // 当屏幕尺寸为 375 * 667时 根节点 font-size 为 75px
    docEl.style.fontSize = Math.min((docWidth / 10) * 2, 100) + 'px'
  }

  if (win.addEventListener) {
    win.addEventListener('resize', resizeHandle, false)
  }
  
  resizeHandle()
})(window)