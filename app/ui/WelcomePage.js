/**
 * 欢迎页
 * @flow
 * **/
import React, {Component} from "react";
import {Image, StyleSheet, View,InteractionManager} from "react-native";
import HomePage from './main/HomePage';
import ThemeFactory from '../res/styles/ThemeFactory'
import GlobalStyles from "../res/styles/GlobalStyles";

export default class WelcomePage extends Component {

    componentDidMount() {
        const {navigator} = this.props;
        this.theme=ThemeFactory.createTheme('#2196F3');
        setTimeout(()=>{
            navigator.resetTo({
                component: HomePage,
                name: 'HomePage',
                params:{
                    theme:this.theme
                }
            });
        },1000)

    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={{width: GlobalStyles.window_width, height: GlobalStyles.window_height} } resizeMode={'contain'} source={{uri: 'launch_screen'}}/>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})