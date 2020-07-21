import React, { Suspense, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter as Router,
    Route            
  } from 'react-router-dom';
import '../../../scss/App.scss'

import Navbar from './NavBar'
import MainSection from './MainSection';
import Nothing from './Nothing';

function App() {
    return (
        <main>
            <Router hashType={'noslash'}>
                <Navbar />
                <Route exact path='/' component={Nothing}/>
                <Route path='/manage' component={Nothing}/>
                <Route path='/giraffe' component={MainSection}/>
                <Route path='/staf' component={Nothing}/>
                <Route path='/settings' component={Nothing}/>
                <Route path='/support' component={Nothing}/>
            </Router>
        </main>
    )
}

export default hot(App)