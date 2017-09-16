import createHistory from 'history/createBrowserHistory'

// Creates a history representation
// You can pass additional configuration through `options` hash
const buildHistory = (options = {}) => {
  return createHistory(options)
}

export default buildHistory
