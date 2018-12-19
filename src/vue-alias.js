
import { changeObjectKeys } from './utils'

export default class VueAlias {
  constructor () {
    this._aliases = {}
  }

  component (name, component) {
    if (typeof component === 'string') {
      this._aliases[name] = { component }
    } else {
      this._aliases[name] = component
    }
  }

  components (components) {
    for (let name in components) {
      let component = components[name]
      this.component(name, component)
    }
  }

  getAlias (component) {
    return typeof component === 'string' && this._aliases[component]
  }

  process (name, options) {
    let alias = this.getAlias(name)
    if (alias) {
      name = alias.component
      if (typeof options === 'object') {
        let props = options.props
        let attrs = options.attrs
        if (alias.replaces) {
          props = changeObjectKeys(options.props || {}, alias.replaces, ['component'])
          attrs = changeObjectKeys(options.attrs || {}, alias.replaces, ['component'])
        }
        options.props = { ...alias.props, ...props }
        options.attrs = { ...alias.attrs, ...attrs }
      }
    }
    return name
  }

  wrapHandler (handler) {
    return (name, options, children, d) => {
      name = this.process(name, options)
      return handler(name, options, children, d)
    }
  }
}

let defaultAliaser = null

const ensureAliaser = () => {
  if (!defaultAliaser) {
    defaultAliaser = new VueAlias()
  }
}

export const alias = (name, component) => {
  ensureAliaser()
  defaultAlias.component(name, component)
}

export const aliases = (components) => {
  ensureAliaser()
  defaultAliaser.components(components)
}

export const wrapHandler = (handler) => {
  ensureAliaser()
  return defaultAliaser.wrapHandler(handler)
}
