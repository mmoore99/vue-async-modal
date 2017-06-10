const classRegExp = className => new RegExp(`(^|\\s+)${className.toString().trim()}(\\s+|$)`, 'g')

export const hasClass = (el, className) => classRegExp(className).test(el.className)

export const addClass = (el, className) => {
  const classNames = className.split(' ')
  classNames.length > 1 ? each(classNames, className => addClass(el, className))
    : hasClass(el, className) || (el.className = `${el.className} ${className}`.trim())
}

export const removeClass = (el, className) => {
  el.className = el.className.replace(classRegExp(className), ' ').trim()
}

export const on = (el, events, handler, options = false) => {
  events.trim().split(' ').forEach(event => el.addEventListener(event, handler, options))
}

export const off = (el, events, handler, options = false) => {
  events.trim().split(' ').forEach(event => el.removeEventListener(event, handler, options))
}

export const ensure = (el, events, handler, timeout = 600) => domEach(el, el => {
  let end

  const wrapper = function () {
    off(el, events, wrapper)
    end = true
    handler.apply(this, arguments)
  }

  on(el, events, wrapper)

  setTimeout(() => {
    off(el, events, wrapper)
    end || handler(false, el)
  }, timeout)
})

const hasConsole = typeof console !== 'undefined'

export const warn = msg => process.env.NODE_ENV === 'development' && hasConsole && console.warn(msg)
export const error = msg => process.env.NODE_ENV === 'development' && hasConsole && console.error(msg)
