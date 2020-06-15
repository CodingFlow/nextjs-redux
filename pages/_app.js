import '../styles/global.css'
import Main from '../components/main'

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Main>
        <Component {...pageProps} />
        <span>same across all pages ---</span>
      </Main>
    </Provider>
  )
}
