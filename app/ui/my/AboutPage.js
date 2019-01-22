/**
 * Created by hisign on 2017/5/25.
 */
/**
 * Created by hisign on 2017/5/24.
 * FavoritePage
 */
import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Linking,
    View,
} from 'react-native';

import WebViewPage from '../WebViewPage';
// import AboutMePage from '../../ui/about/AboutMePage';
// import RepositoryUtils from '../../expand/dao/RepositoryUtils';
import ViewUtils from '../../util/ViewUtils'
import GlobalStyles from '../../res/styles/GlobalStyles'
import config from '../../res/data/Config.json'
import {MORE_MENU} from '../../common/MoreMenu'
import AboutCommon from './AboutCommon'


export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        this.aboutCommon=new AboutCommon(props,(dic)=>this.updateState(dic));
        this.repositories=[];
        this.state = {
            projectModels: null,
            author:config.author
        }
    }
    componentDidMount() {
        this.aboutCommon.componentDidMount();
    }

    componentWillUnmount(){
        this.aboutCommon.componentWillUnmount();
    }
    onClick(tab) {
        let TargetComponent, params = {...this.props,menuType:tab};
        switch (tab) {
            case MORE_MENU.About_Author:
                // TargetComponent=AboutMePage;
                break;
            case MORE_MENU.Website:
                TargetComponent = WebViewPage;
                params.title='GitHubPopular';
                let url=!this.repositories[0]? config.info.html_url:this.repositories[0].homepage;
                params.url=url;
                break;
            case MORE_MENU.Feedback:
                Linking.openURL('mailto://crazycodeboy@gmail.com');
                break;

        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }
    render() {
        let content=<View>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.Website), require('../../res/images/ic_computer.png'),MORE_MENU.Website, this.props.theme.styles.tabBarSelectedIcon)}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.About_Author), require('../../res/images/ic_insert_emoticon.png'), MORE_MENU.About_Author, this.props.theme.styles.tabBarSelectedIcon)}
            <View style={GlobalStyles.line}/>
            {ViewUtils.getSettingItem(()=>this.onClick(MORE_MENU.Feedback), require('../../res/images/ic_feedback.png'), MORE_MENU.Feedback, this.props.theme.styles.tabBarSelectedIcon)}
        </View>
        return this.aboutCommon.render(content, {
            'name': 'GitHub Popular',
            'description': 'This is a GitHub most popular repositories and trending repositories viewer with React Native.',
            'avatar':this.state.author.avatar1,
            'backgroundImg':this.state.author.backgroundImg1,
        });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

