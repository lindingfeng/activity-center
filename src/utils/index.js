import sha1 from 'sha1'

export const throttle = (fn, threshhold) => {
  // 记录上次执行的时间
  let last = 0;
  // 定时器
  let timer = null;
  // 默认间隔为 250ms
  let threshholds = threshhold || 250;
  // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
  return function () {
    // 保存函数调用时的上下文和参数，传递给 fn
    let context = this;
    let args = arguments;
    let now = Number(new Date());
    // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
    // 执行 fn，并重新计时
    if (last && now < last + threshholds) {
      clearTimeout(timer);
      // 保证在当前时间区间结束后，再执行一次 fn
      timer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshholds);
      // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};

export const debounce = (fn, delay, pre = false) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    if (pre) {
      if (!timer) {
        fn.apply(context, args);
      }
      clearTimeout(timer);
      timer = setTimeout(function () {
        timer = null;
      }, delay);
    } else {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  };
};

export const createUUID = () => {
  let uuidRegEx = /[xy]/g;
  let uuidReplacer = function (c) {
    let r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : (r & 3) | 8;
    return v.toString(16);
  };
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(uuidRegEx, uuidReplacer)
    .toLowerCase();
  return uuid.replace(/-/g, '');
};

export const createFormData = (body) => {
  /*
   * @desc: 注意：不能直接调用toString.call，IE会报错调用对象不存在（大坑）
  */
  if (Object.prototype.toString.call(body) === '[object Object]') {
    let formDataArr = [];
    /* eslint-disable */
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        // 存在特殊字符需转移，否则签名会失败
        if (/\+|\&|\=/g.test(body[key])) {
          body[key] = encodeURIComponent(body[key]);
        }
        formDataArr.push(`${key}=${body[key]}`);
      }
    }
    return formDataArr.join('&');
    /* eslint-disable */
  }
  return body;
};

export const createApiSign = (appSecret = '', body) => {
  const data = { ...body };
  const keyArr = Object.keys(data).sort();
  const kv = [];
  for (let i = 0; i < keyArr.length; i++) {
    if (data.hasOwnProperty(keyArr[i])) {
      if (data[keyArr[i]] === undefined) {
        continue;
      }
      kv.push(keyArr[i] + data[keyArr[i]]);
    }
  }
  return sha1(`${kv.join('')}${appSecret}`).toLowerCase();
};

export const randomWord = (randomFlag, min, max) => {
  let str = '';
  let range = min;
  let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (let i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
};

/*
 * @desc: 动态引入script跨域
*/
export const createJsCrossOrigin = (url, callback) => {
  let script = document.createElement('script');
  script.crossOrigin = 'true';
  script.type = 'text/javascript';
  if (typeof callback !== 'undefined') {
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
  }
  script.src = url;
  document.body.appendChild(script);
};

export const getNodeByBubbleOfEvent = (currentEle, targetEle) => {
  if (currentEle.tagName.toLowerCase() === targetEle) {
    return currentEle
  }
  const prevEle = currentEle.parentNode
  if (prevEle.tagName.toLowerCase() === targetEle) {
    return prevEle
  }
  return getNodeByBubbleOfEvent(prevEle, targetEle)
}