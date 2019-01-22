/**
 * Created by hisign on 2017/5/24.
 */
import React, {Component} from "react";
import {ListView, RefreshControl, View,StyleSheet,InteractionManager} from "react-native";
import RepositoryCell from "../../common/RespositoryCell";
import ProjectModel from "../../model/ProjectModel";
import GlobalStyles from "../../res/styles/GlobalStyles";

const API_URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'

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
        InteractionManager.runAfterInteractions(()=>{
        this.loadData(true);
        })
    }
    loadData(isRefresh) {
        this.updateState({
            isLoading: true,
            isLoadingFail: false,
        });
        let url = this.genFetchUrl(this.props.tabLabel);
        fetch(url)
            .then((response) => response.json())
            .catch((error) => {
            }).then((responseData) => {
            if (!responseData || !responseData.items) {
                this.updateState({
                    isLoading: false,
                    isLoadingFail: false,
                });
                return;
            }
            if (!responseData.items || responseData.items === 0)return;
            this.items = responseData.items;
            let projectModels = [];
            let items = this.items;
            for (var i = 0, len = items.length; i < len; i++) {
                projectModels.push(new ProjectModel(items[i], true));
            }
            return projectModels;
        }).then((projectModels)=>{
            this.updateState({
                isLoading: false,
                isLoadingFail: false,
                dataSource: this.getDataSource(projectModels),
            });
        }).done();
    }

    updateState(dic) {
        if (!this)return;
        this.setState(dic);
    }

    genFetchUrl(category) {
        return API_URL + category + QUERY_STR;
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
            <RepositoryCell
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