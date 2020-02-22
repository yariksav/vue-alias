
# VUE alias helper

This package will help use alias in render function
In future it wiil help you change components or frameworks

> NOTE: Module is in initial development. Anything may change at any time.

<p align="center">
  <a href="https://npmcharts.com/compare/vue-alias?minimal=true">
    <img src="http://img.shields.io/npm/dm/vue-alias.svg">
  </a>
  <a href="https://www.npmjs.org/package/vue-alias">
    <img src="https://img.shields.io/npm/v/vue-alias.svg">
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

example

```js
import { register } from 'vue-alias'

// register aliases
register({
  text: {
    component: 'VTextField',
    replaces: {
      error: 'errorMessages'
    }
  },
  textarea: {
    component: 'v-textarea',
    replaces: {
      error: 'errorMessages'
    }
  },
  select: {
    component: 'v-select',
    replaces: {
      error: 'errorMessages'
    }
  },
  ...
})
```

Then you can use in vue component render function

```js
import { wrapHandler } from 'vue-alias'

...
render (h) {
  h = wrapHandler(h)
  return h('select', {props: {}}, children)
}
```

or

```js
import { alias } from 'vue-alias'

...
const cmp = alias(component)
}
```