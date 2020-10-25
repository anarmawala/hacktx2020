import * as React from 'react'
import { Row } from 'antd'
import PriceMatchForm from './components/price_match form'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import Particles from 'react-tsparticles'
import { particleOptions } from './utils'
import ResultsPage from './components/results'
import MapContainer from './components/googleHeatMap'
import { Provider } from 'react-redux'
import store from './store/store'

const App = () => {
    return (
        <Provider store={store}>
            <Particles id="tsparticles" options={particleOptions} />
            <Router>
                <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                    <Route path="/" exact>
                        <Redirect to="/best-price" />
                    </Route>
                    <Route path="/best-price" component={PriceMatchForm} />
                    <Route path="/results" component={ResultsPage} />
                    <Route path="/map" component={MapContainer} />
                </Row>
            </Router>
        </Provider>
    )
}

export default App
