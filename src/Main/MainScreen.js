import React from "react";
import {StatusBar, Alert, Image, Platform, RefreshControl, Text, TouchableWithoutFeedback, View, ScrollView} from "react-native";
import {styles, addr} from "../../consts";
import {ModuleView} from "./ModuleView";
import {FilterScrollView, SearchView} from "./SearchView";
import { initCards } from "../Actions/init_cards"
import {connect} from "react-redux"
import { bindActionCreators } from 'redux';
import { retrieveCards, retrieveAutoIncrement, storeCards, storeAutoIncrement } from "../Shared/Cards";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isSearch: false, filterUpdate: true}
    }

    handler(msg, data) {
        switch (msg) {
            case "onChange": {

                return;
            }
            case "open": {
                this.setState({
                    isSearch: true,
                });

                let filter1content = [
                    // {id: "bank", title: 'Банк'},
                    {id: "paypass", title: 'Бесконтактная оплата'},
                    {id: "getMoney", title: 'Выдача наличных на кассе'},
                ];
                let filter2content = null;
                switch (this.props.filtersSelect.filter2Id) {
                    case "bank":
                        filter2content = [
                            {id: "sber", title: 'Сбербанк'},
                            {id: "tinkof", title: 'Тинькофф'},
                        ]
                }

                let searchFilters = (
                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        backgroundColor: '#fefefe',
                        top: 40,
                        height: 115,
                        zIndex: 102
                    }}
                    >
                        <Text style={{marginLeft: 15, color: '#696969'}}>Filters:</Text>
                        <View style={{justifyContent: 'center', flexDirection: "column", paddingRight: 15}}>
                            <FilterScrollView data={filter1content}
                                              filtersSelect={this.props.filtersSelect}
                                              handler={this.handler.bind(this)}
                            />
                            {/*<FilterScrollView data={filter2content} filter={this.props.filtersSelect} />*/}
                        </View>
                    </View>
                );

                this.props.handler(searchFilters, "showFilters");
                break;
            }
            case "close": {
                this.setState({
                    isSearch: false,
                });
                this.props.handler(null, "hideFilters");
                break;
            }
        }
    }

    render() {
        let header;
        switch (this.props.title) {
            case "org": header = "Cash.io"; break;
            case "star": header = 'Избранное';
        }
        return (
            <View style={{
                backgroundColor: this.props.dark ? "#2a2a2a" : "#908ee4",
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingTop: Platform.OS === 'android' ? 30 : -10,
                paddingBottom: 10,
            }}>
                <View style={{flex: 1}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: this.props.dark ? '#d3d3d3' : '#f8f8f8'}}>
                        {header}
                    </Text>
                </View>

                <TouchableWithoutFeedback onPress={() => (this.props.handler("", "openSettings"))}>
                    <Image source={require("../../img/settings.png")} style={{
                        height: 22,
                        width: 22,
                        right: 16,
                        bottom: 13.5,
                        position: 'absolute',
                    }}/>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => (this.handler("open"))}>
                    <View style={{
                        height: 20,
                        width: 20,
                        left: 16,
                        bottom: 13.5,
                        position: 'absolute',
                        zIndex: 100
                    }}>
                        <Image style={{
                            height: 20,
                            width: 20,
                        }} source={require("../../img/search.png")}/>
                    </View>
                </TouchableWithoutFeedback>
                <SearchView handler={this.handler.bind(this)} isSearch={this.state.isSearch} />
            </View>
        );
    }
}

class MainScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        retrieveCards((err, Cards) => {
            if (Cards === null) {
                Cards = []
                storeCards([])
            }
            Cards = JSON.parse(Cards)
            retrieveAutoIncrement((err, AutoIncrement) => {
                if (AutoIncrement === null) {
                    AutoIncrement = 0
                    storeAutoIncrement(0)
                }
                AutoIncrement = JSON.parse(AutoIncrement)
                this.props.initCards({Cards, AutoIncrement})
            })
        })
        this.state = {
            popup: false,
            popupContent: null,
            data: {},
            refreshing: false,
            loaded: false,
            header: "org",
            mainContent: null,
            filterContent: null,
            filtersSelect: {
                filter2: false,
                filter2Id: null,
                data: {
                    bank: {
                        sber: false,
                        tinkof: false
                    },
                    paypass: false,
                    getMoney: true,
                }
            }
        };

    }

    handler(data, type) {
        const { navigate } = this.props.navigation;
        switch (type) {
            case "imageInfo": {
                let content = (
                    <View>
                        <Text>User's name: {data.user.name}</Text>
                        <Text>Location: {data.user.location}</Text>
                    </View>
                );

                this.setState({
                    popupContent: content,
                });

                navigate('Maps', {content: content});
                return;
            }
            case "openSettings": {
                navigate('Settings');
                return;
            }
            case "showFilters": {
                this.setState({
                    filterContent: data,
                });
                return;
            }
            case "hideFilters": {
                this.setState({
                    filterContent: null,
                });
                return;
            }
            default: {
                this.setState({
                    popup: true,
                });
            }
        }
    }

    _onRefresh = () => {
        this.setState({refreshing: true, loaded: false});
        this._loadData();
    };

    _loadData() {
        this.setState({refreshing: false, loaded: true});
        return null;
    }

    componentDidMount() {
        return this._loadData();
    }

    render(){
        return(
            <View style={{
                flex: 1,
                backgroundColor: this.props.dark ? '#2a2a2a' : '#908ee4'
            }}>
                <StatusBar
                    barStyle={this.props.dark ? "light-content" : "dark-content"}
                />
                <View style={{
                    height: 45,
                    width: '100%',
                    backgroundColor: this.props.dark ? '#2a2a2a' : '#908ee4',
                    display: Platform.OS === 'android' ? 'none' : 'flex'
                }}/>
                <ScrollView keyboardShouldPersistTaps={'handled'} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        tintColor={this.props.dark ? "#eaeaea" : "#2a2a2a"}
                        colors={[this.props.dark ? "#eaeaea" : "#2a2a2a"]}
                    />
                }>
                    {this.state.filterContent}
                    <Header dark={this.props.dark} title={this.state.header} handler={this.handler.bind(this)} filtersSelect={this.state.filtersSelect}/>
                    {this.state.mainContent || (
                        <View>
                            {/*<ModuleView*/}
                                {/*handler={this.handler.bind(this)}*/}
                                {/*title="Действия"*/}
                                {/*content="images"*/}
                                {/*color={this.props.dark ? "#171717" : "#fefefe"}*/}
                                {/*titleColor={this.props.dark ? "#c2c2c2" : "#2a2a2a"}*/}
                                {/*state={this.state}*/}
                                {/*{...this.state}*/}
                            {/*/>*/}
                            <ModuleView
                                title="Банкоматы"
                                titleColor={this.props.dark ? "#c2c2c2" : "#2a2a2a"}
                                content="atm"
                                color={this.props.dark ? "#171717" : "#fefefe"}
                            />
                        </View>)}
                </ScrollView>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {dark: state.settings.dark}
};

const mapDispatchToProps = {
    initCards
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);