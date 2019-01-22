/**
 * Created by hisign on 2017/5/24.
 * 受欢迎页面
 */
import React, {Component} from "react";
import {Text,Image,View,TouchableOpacity,StyleSheet} from "react-native";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view'
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../util/ViewUtils'
import Popover from "../../common/Popover";
import MoreMenu,{MORE_MENU} from "../../common/MoreMenu";
import TimeSpan from '../../model/TimeSpan'
import {FLAG_TAB} from '../main/HomePage'
import TrendingTab from './TrendingTab'


const LanguageData=['All Language','ActionScript','ApacheConf','C#','java','swift']
const timeSpanTextArray = [new TimeSpan('Today', 'since=daily'),
    new TimeSpan('This Week', 'since=weekly'), new TimeSpan('This Month', 'since=monthly')]
export default class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: {},
            timeSpan: timeSpanTextArray[0],
            languages: [],
            customThemeViewVisible:false,
            theme: this.props.theme
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {/*顶标题*/}
                <NavigationBar
                    title='Popular'
                    style={this.state.theme.styles.navBar}
                    rightButton={ViewUtils.getMoreButton(
                        ()=>{this.refs.moreMenu.open()}
                    )}
                    statusBar={{backgroundColor:this.state.theme.themeColor}}
                    hide={false}
                    titleView={this.renderTitleView()}
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
                <Popover
                    isVisible={this.state.isVisible}
                    fromRect={this.state.buttonRect}
                    placement="bottom"
                    onClose={()=>this.closePopover()}
                    contentStyle={{opacity:0.82,backgroundColor:'#343434'}}
                    style={{backgroundColor: 'red'}}>
                    <View style={{alignItems: 'center'}}>
                        {timeSpanTextArray.map((result, i, arr) => {
                            return <TouchableOpacity key={i} onPress={()=>this.onSelectTimeSpan(arr[i])}
                                                       underlayColor='transparent'>
                                <Text
                                    style={{fontSize: 18,color:'white', padding: 8, fontWeight: '400'}}>
                                    {arr[i].showText}
                                </Text>
                            </TouchableOpacity>
                        })
                        }
                    </View>
                </Popover>
                {this.renderMoreView()}
            </View>
        )
    }
    renderTitleView() {
        return <View >
            <TouchableOpacity
                ref='button'
                underlayColor='transparent'
                onPress={()=>this.showPopover()}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 18,
                        color: '#FFFFFF',
                        fontWeight: '400'
                    }}>Trending {this.state.timeSpan.showText}</Text>
                    <Image
                        style={{width: 12, height: 12, marginLeft: 5}}
                        source={require('../../res/images/ic_spinner_triangle.png')}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }
    closePopover() {
        this.setState({isVisible: false});
    }
    onSelectTimeSpan(timeSpan) {
        this.closePopover();
        this.setState({
            timeSpan: timeSpan
        })
    }
    renderMoreView() {
        let params = {...this.props, theme: this.state.theme,fromPage:FLAG_TAB.flag_trendingTab}
        return <MoreMenu
            {...params}
            ref="moreMenu"
            menus={[MORE_MENU.Sort_Language,MORE_MENU.Custom_Language,MORE_MENU.Custom_Theme,MORE_MENU.About_Author,MORE_MENU.About]}
            contentStyle={{right:20}}
            onMoreMenuSelect={(e)=>{
                if(e==='Custom Theme'){
                    this.setState({customThemeViewVisible: true});
                }
            }}
            anchorView={this.refs.moreMenuButton}
            navigator={this.props.navigator} />
    }

    /**
     * 加载语言菜单
     * @returns {Array}
     */
    renderLanguageMenu(){
        var languageViewArr=[];
        for (var i=0;i<LanguageData.length;i++){
            languageViewArr.push(
                <TrendingTab key={i} {...this.props}
                            theme={this.state.theme}
                            timeSpan={this.state.timeSpan}
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