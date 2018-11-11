import React from "react";
import {StatusBar, Alert, Image, Platform, RefreshControl, Text, TouchableWithoutFeedback, View, ScrollView} from "react-native";
import {styles, addr, ATMs} from "../../consts";
import {ModuleView} from "./ModuleView";
import SearchView from "./SearchView";
import FilterScrollView from "./FilterScrollView";
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
                this.props.handler("","onFilterChange");
                return;
            }
            case "open": {
                this.setState({
                    isSearch: true,
                });

                let filter1content = [
                    {id: "sberbank", title: 'Сбербанк'},
                    {id: "tinkoff", title: 'Тинькофф'},
                    {id: "vtb", title: 'ВТБ'},
                    {id: "cashless", title: 'Бесконтактная оплата'},
                    {id: "getMoney", title: 'Выдача наличных на кассе'},
                ];

                let searchFilters = (
                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        backgroundColor: this.props.dark ? '#2a2a2a' : '#fefefe',
                        top: 40,
                        height: 70,
                        zIndex: 102
                    }}
                    >
                        <Text style={{marginLeft: 15, color: this.props.dark ? '#fefefe' : '#696969'}}>Фильтры:</Text>
                        <View style={{justifyContent: 'center', flexDirection: "column"}}>
                            <FilterScrollView data={filter1content}
                                              filtersSelect={this.props.filtersSelect}
                                              handler={this.handler.bind(this)}
                                              dark={this.props.dark}
                            />
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
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: this.props.dark ? '#ffffff' : '#f8f8f8'}}>
                        {header}
                    </Text>
                </View>

                <TouchableWithoutFeedback onPress={() => (this.props.handler("", "openSettings"))}>
                    <Image source={this.props.dark ? require("../../img/settingsDark.png") : require("../../img/settings.png")} style={{
                        height: 18,
                        width: 18,
                        right: 16,
                        bottom: 15,
                        position: 'absolute',
                    }}/>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => (this.handler("open"))}>
                    <View style={{
                        height: 20,
                        width: 20,
                        left: 16,
                        bottom: 15,
                        position: 'absolute',
                        zIndex: 100
                    }}>
                        <Image style={{
                            height: 20,
                            width: 20,
                        }} source={this.props.dark ? require("../../img/searchDark.png") : require("../../img/search.png")}/>
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
        retrieveCards((err, cards) => {
            if (cards === null) {
                cards = []
                storeCards([])
            }
            cards = JSON.parse(cards)
            retrieveAutoIncrement((err, autoIncrement) => {
                if (autoIncrement === null) {
                    autoIncrement = 0
                    storeAutoIncrement(0)
                }
                autoIncrement = JSON.parse(autoIncrement)
                this.props.initCards({cards, autoIncrement})
            })
        })
        this.state = {
            ATM: ATMs,
            popup: false,
            popupContent: null,
            data: {},
            refreshing: false,
            loaded: false,
            header: "org",
            mainContent: null,
            isFilter: false,
            filterContent: null,
            filtersSelect: {
                bank: {
                    sber: false,
                    tinkof: false
                },
                paypass: false,
                getMoney: true,
            }
        };

    }

    handler(data, type) {
        const { navigate } = this.props.navigation;
        switch (type) {
            case "atmInfo": {
                this.setState({
                    popupContent: data,
                });

                navigate('Maps', {content: data});
                return;
            }
            case "openSettings": {
                navigate('Settings');
                return;
            }
            case "showFilters": {
                this.setState({
                    isFilter: true,
                    filterContent: data,

                });
                return;
            }
            case "hideFilters": {
                this.setState({
                    isFilter: false,
                    filterContent: null,
                });
                return;
            }
            // TODO HERE
            case "onFilterChange": {
                this.setState({
                    ATM: ATMs.filter(item => (
                        (!this.props.sberbank && !this.props.vtb && !this.props.tinkoff && !this.props.cashless && !this.props.getMoney)
                    ))
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
                    <Header dark={this.props.dark}
                            title={this.state.header}
                            filtersSelect={this.props.filtersSelect}
                            handler={this.handler.bind(this)}
                            ssberbank={this.props.sberbank}
                            stinkoff={this.props.tinkoff}
                            svtb={this.props.vtb}
                            scashless={this.props.cashless}
                            sgetMoney={this.props.getMoney}
                    />
                    {this.state.isFilter ?  (
                        <View style={{paddingTop: 78}}>
                            <ModuleView
                                title="Результаты поиска"
                                titleColor={this.props.dark ? "#c2c2c2" : "#2a2a2a"}
                                content={this.state.ATM}
                                color={this.props.dark ? "#171717" : "#fefefe"}
                                handler={this.handler.bind(this)}
                            />
                        </View>
                    ) : (
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
                                content={ATMs}
                                color={this.props.dark ? "#171717" : "#fefefe"}
                                handler={this.handler.bind(this)}
                            />
                        </View>)}
                </ScrollView>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        dark: state.settings.dark,
        sberbank: state.filters.sberbank,
        tinkoff: state.filters.tinkoff,
        vtb: state.filters.vtb,
        cashless: state.filters.cashless,
        getMoney: state.filters.getMoney,
    }
};

const mapDispatchToProps = {
    initCards
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);