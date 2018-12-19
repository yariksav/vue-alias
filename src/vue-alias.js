
import { changeObjectKeys } from './utils'

export default class VueAlias {
  constructor () {
    this._aliases = {}
  }

  component (name, component) {
    this._aliases[name] = typeof component === 'string' ? { component } : component
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
    console.log(alias, name)
    if (alias) {
      name = alias.component
      if (alias.replaces) {
        let props = options.props
        props = changeObjectKeys(props, alias.replaces, ['component'])
        if (alias.props) {
          props = { ...alias.props, ...props }
        }
        options.props = props
      }
    }
    return name
  }

  wrapHandler (handler) {
    return (name, options, children) => {
      name = this.process(name, options)
      console.log(name, options)
      return handler(name, options, children)
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
