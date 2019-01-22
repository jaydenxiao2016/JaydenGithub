/**
 * Created by hisign on 2017/5/23.
 */

import React, {Component} from "react";
import {Image, Platform, StyleSheet, Text} from "react-native";

import TabNavigator from "react-native-tab-navigator";
import PopularPage from '../popular/PopularPage';
import TrendingPage from '../trending/TrendingPage';
import FavoritePage from '../favorite/FavoritePage';
import MyPage from '../my/MyPage';

export var FLAG_TAB = {
    flag_popularTab: 'flag_popularTab', flag_trendingTab: 'flag_trendingTab',
    flag_favoriteTab: 'flag_favoriteTab', flag_myTab: 'flag_myTab'
}

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.subscribers = [];
        this.changedValues = {
            favorite: {popularChange: false, trendingChange: false},
            my: {languageChange: false, keyChange: false, themeChange: false}
        };
        this.state = {
            selectedTab: 'Popular',
            theme: this.props.theme
        };
    }

    render() {
        return (
            <TabNavigator
                tabBarStyle={{opacity: 0.9,}}
                sceneStyle={{paddingBottom: 0}}
            >
                {this._renderTab('Popular',require('../../res/images/ic_polular.png'),PopularPage)}
                {this._renderTab('Trending', require('../../res/images/ic_trending.png'),TrendingPage)}
                {this._renderTab('Favorite', require('../../res/images/ic_favorite.png'),FavoritePage)}
                {this._renderTab('My',require('../../res/images/ic_my.png'),MyPage)}
            </TabNavigator>
        )
    }

    _renderTab(selectedTab, renderIcon,Component) {
        return (
            <TabNavigator.Item
                title={selectedTab}
                renderIcon={() => <Image style={styles.tabBarIcon}
                                         source={renderIcon}/>}
                renderSelectedIcon={() => <Image
                    style={[styles.tabBarSelectedIcon, this.state.theme.styles.tabBarSelectedIcon]}
                    source={renderIcon}/>}
                selectedTitleStyle={this.state.theme.styles.themeColor}
                selected={this.state.selectedTab === selectedTab}
                onPress={() => {
                    this.setState({selectedTab: selectedTab})
                }}
            >
                <Component {...this.props} theme={this.state.theme}/>
            </TabNavigator.Item>
        )
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarIcon: {
        width: 26, height: 26,
        resizeMode: 'contain',
    },
    tabBarSelectedIcon: {
        width: 26, height: 26,
        resizeMode: 'contain',
    }
})