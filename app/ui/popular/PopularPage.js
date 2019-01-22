/**
 * Created by hisign on 2017/5/24.
 * 受欢迎页面
 */
import React, {Component} from "react";
import {Text,Image,View,TouchableOpacity,StyleSheet} from "react-native";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'
import PopularTab from './PopularTab'

const LanguageData=['all','java','android','ios','react-native','mysql','angularjs','jquery']
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customThemeViewVisible: false,
            theme: this.props.theme,
        };
    }

    render() {
        return (
        <View style={styles.container}>
            {/*顶标题*/}
            <NavigationBar
                title='Popular'
                style={this.state.theme.styles.navBar}
                rightButton={this.renderMoreButton()}
                statusBar={{backgroundColor:this.state.theme.themeColor}}
                hide={false}
            />
            {/*language菜单*/}
            <ScrollableTabView
                tabBarUnderlineColor='white'
                tabBarInactiveTextColor='white'
                tabBarActiveTextColor='white'
                tabBarBackgroundColor={this.state.theme.themeColor}
                ref="scrollableTabView"
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar style={{height: 40,borderWidth:0,elevation:2}} tabStyle={{height: 39}}
                                                      underlineHeight={2}/>}
            >
            {this.renderLanguageMenu()}
            </ScrollableTabView>
        </View>
        )
    }

    /**
     * 顶标题右按钮布局
     * @returns {XML}
     */
    renderMoreButton() {
        return (
            <View style={{flexDirection: 'row',}}>
                <TouchableOpacity
                    ref='button'
                    underlayColor='transparent'
                    >
                    <View style={{padding:5}}>
                        <Image
                            style={{width: 24, height: 24}}
                            source={require('../../res/images/ic_search_white_48pt.png')}
                        />
                    </View>
                </TouchableOpacity>
                {ViewUtils.getMoreButton(
                    ()=>{}
                    )}
            </View>)
    }

    /**
     * 加载语言菜单
     * @returns {Array}
     */
    renderLanguageMenu(){
        var languageViewArr=[];
        for (var i=0;i<LanguageData.length;i++){
            languageViewArr.push(
                <PopularTab key={i} {...this.props}
                            theme={this.state.theme}
                            tabLabel={LanguageData[i]}/>
            )
        }
       return languageViewArr;
    }

}
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});