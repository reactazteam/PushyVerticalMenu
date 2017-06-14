'use strict'
import React, { Component } from 'react'
import {
    AppRegistry
} from 'react-native'

import PushyVerticalMenu                    from './screens/drawers/PushyVerticalMenu'

class App extends Component {
    render() {
        return <PushyVerticalMenu />
    }
}

AppRegistry.registerComponent('PushyVerticalMenu', () => App);
