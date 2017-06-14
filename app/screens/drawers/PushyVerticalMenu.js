import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text, Button, Dimensions, Animated } from 'react-native'
import Interactable from 'react-native-interactable'
import Icon from 'react-native-vector-icons/FontAwesome'
import Menu                     from './../../components/Menu'
import DemoScreen               from './../DemoScreen'
import colors                   from './../../resources/styles/colors'

const {width, height} = Dimensions.get('window')
const menuHeight = 330
const remainingHeight = height - menuHeight

export default class SideMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpened: false
        }
        this.detalY = new Animated.Value(0)
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.sideMenuContainer} pointerEvents='box-none'>
                    <Animated.View style={{ flex: 1, transform:
                        [{
                            translateY: this.detalY.interpolate({
                                inputRange: [0, menuHeight],
                                outputRange: [- menuHeight, 0]
                            })
                        }]
                    }}>
                        <Menu titleStyle={styles.titleStyle} style={ styles.sideMenu } />
                    </Animated.View>
                </View>

                <Interactable.View
                    style={{ flex: 1}}
                    ref='menuInstance'
                    verticalOnly={true}
                    snapPoints={[{y: 0, damping: 0.6}, {y: menuHeight, damping: 0.6}]}
                    boundaries={{bottom: menuHeight}}
                    initialPosition={{y: 0}}
                    animatedValueY={this.detalY}
                    onStop={ this.onStopInteraction.bind(this) }>
                        <DemoScreen navigation={this.props.navigation} onMenuPress={ this.onMenuPress } />
                </Interactable.View>
            </View>
        )
    }

    onStopInteraction(event, check) {
        let menuOpened = true
        if(event.nativeEvent.y == 0) {
            menuOpened = !menuOpened
        }
        this.setState((preState, props) => {
            return { menuOpened }
        })
    }

    onMenuPress = () => {
        const menuOpened = !this.state.menuOpened

        if(menuOpened) {
            this.refs['menuInstance'].snapTo({index: 1})
        } else {
            this.refs['menuInstance'].snapTo({index: 0})
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white',
    },
    sideMenuContainer: {
        position: 'absolute',
        right: 0,
        left: 0,
        flexDirection: 'row',
        zIndex: 1002
    },
    sideMenu: {
        width: width,
        backgroundColor: colors.bgMainRed,
        height: menuHeight,
        position: 'relative',
        marginLeft: 0,
        alignItems: 'center'
    },
    titleStyle: {
        marginLeft: -50
    }
})
