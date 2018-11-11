import React from "react";
import {FlatList, Image, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import connect from "react-redux/es/connect/connect";
import {addCard} from "../Actions/add_card";
import {ADD_CARD} from "../Actions/types";

class SearchView extends React.Component {
    render() {
        let searchContent = null;
        if (this.props.isSearch) {
            searchContent = (
                <View>
                    <TouchableWithoutFeedback onPress={() => {this.props.handler("close");}} style={{
                        height: 22,
                        width: 22,
                    }}>
                        <Image source={require("../../img/close.png")} style={{
                            height: 20,
                            width: 20,
                            position: 'absolute',
                            right: 16,
                            marginTop: 15,
                            zIndex: 101
                        }}/>
                    </TouchableWithoutFeedback>
                    <View style={{
                        width: '100%',
                        height: 40,
                        backgroundColor: "#2a2a2a",
                        zIndex: 100,
                    }}>
                        <TextInput
                            keyboardAppearance={'dark'}
                            autoFocus={true}
                            maxLength={60}
                            style={{
                                paddingTop: 17,
                                paddingLeft: 43
                            }}/>
                    </View>
                </View>
            );
        }

        return (
            <View style={{position: 'absolute', left: 0, width: '100%', height: 50, display: searchContent === null ? 'none' : 'flex'}}>
                {searchContent}
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

export default connect(mapStateToProps)(SearchView);