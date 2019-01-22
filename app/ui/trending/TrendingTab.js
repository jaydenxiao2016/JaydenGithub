/**
 * Created by hisign on 2017/5/24.
 */
import React, {Component} from "react";
import {InteractionManager, ListView, RefreshControl, StyleSheet, View} from "react-native";
import TrendingRepoCell from "../../common/TrendingRepoCell";
import ProjectModel from "../../model/ProjectModel";
import GlobalStyles from "../../res/styles/GlobalStyles";
import Trending from "GitHubTrending";

const API_URL = 'https://github.com/trending/'

export default class PopularTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadingFail: false,
            favoritKeys: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            filter: '',
            theme: this.props.theme,
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.loadData(true);
        })
    }

    loadData(timeSpan, isRefresh) {
        this.updateState({
            isLoading: true,
            isLoadingFail: false,
        });
        let url = this.genFetchUrl(timeSpan, this.props.tabLabel);
        new Trending().fetchTrending(url)
            .then((items) => {
                if (!items) {
                    reject(new Error('responseData is null'));
                    return;
                }
                let projectModels = [];
                for (var i = 0, len = items.length; i < len; i++) {
                    projectModels.push(new ProjectModel(items[i], true));
                }
                return projectModels;
            }).then((projectModels) => {
            this.updateState({
                isLoading: false,
                isLoadingFail: false,
                dataSource: this.getDataSource(projectModels),
            });
        }).catch((error) => {
            // alert(error)
        }).done();
    }

    updateState(dic) {
        if (!this)return;
        this.setState(dic);
    }

    genFetchUrl(timeSpan, category) {//objective-c?since=daily
        return API_URL + category + '?' + timeSpan.searchText;
    }

    getDataSource(items) {
        return this.state.dataSource.cloneWithRows(items);
    }

    render() {
        return (
            <View style={[GlobalStyles.listView_container, {paddingTop: 0}]}>
                <ListView
                    ref="listView"
                    style={styles.listView}
                    renderRow={(e) => this.renderRow(e)}
                    renderFooter={() => {
                        return <View style={{height: 50}}/>
                    }}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={() => this.loadData(true)}
                            tintColor={this.props.theme.themeColor}
                            title="Loading..."
                            titleColor={this.props.theme.themeColor}
                            colors={[this.props.theme.themeColor, this.props.theme.themeColor, this.props.theme.themeColor]}
                        />}
                />
            </View>
        );
    }

    renderRow(projectModel, sectionID, rowID) {
        let {navigator} = this.props;
        return (
            <TrendingRepoCell
                key={projectModel.item.id}
                onSelect={() => this.onSelectRepository(projectModel)}
                theme={this.state.theme}
                {...{navigator}}
                projectModel={projectModel}
                onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}/>
        );
    }

    onSelectRepository(projectModel) {

    }

    onFavorite(item, isFavorite) {

    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});