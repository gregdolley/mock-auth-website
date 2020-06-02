import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('./views/home'))

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>loading site (App)...</div>}>
        <Switch>
        <Route exact path='/home' component={Home} />
        </Switch>
      </Suspense>
    </div>
  )
}

export default App
