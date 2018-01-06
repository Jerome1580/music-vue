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
