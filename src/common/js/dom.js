// 添加一个class
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(" ");
  newClass.push(className);
  el.className = newClass.join(' ')

}

// 判断是否有class
export function hasClass(el, className) {
  // 开头或空白字符
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')

  return reg.test(el.className)
}

// 获取dom的data
export function getData(el, name, val) {
  const prefix = 'data-';
  const newName = prefix + name;
  if (val) {
    return el.setAttribute(newName, val)
  } else {
    return el.getAttribute(newName)
  }
}

// 能力检测
let elementStyle = document.createElement('div').style

// 检测浏览器是哪种css前缀
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})();

// 给所有css3加前缀方法
export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  // 前缀第一个字母大写webkitTransform
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
