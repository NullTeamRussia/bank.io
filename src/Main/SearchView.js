import React from "react";
import {FlatList, Image, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";


export class FilterElement extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const miniLogoStyles = {
            borderRadius: 6,
            height: 32,
            justifyContent: 'center',
            alignItems:"center",
            borderWidth: 1.5,
            borderColor: "#18f",
            marginRight: 13,
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 5,
        };

        const textColor = this.props.selected ? "#fff" : "#18f";
        const bgColor = this.props.selected ? "#18f" : "#fff";
        return (
            <TouchableWithoutFeedback onPress={this._onPress}>
                <View style={{...miniLogoStyles, backgroundColor: bgColor}}>
                    <Text style={{ color: textColor }}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export class FilterScrollView extends React.PureComponent {
    state = {
        bank: {
            sber: false,
            tinkof: false
        },
        paypass: false,
        getMoney: true,
    };

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            let a = {};
            a[id] = !state[id];
            return a;
        });
    };

    _renderItem = ({item}) => (
        <FilterElement
            id={item.id}
            onPressItem={this._onPressItem}
            selected={this.state[item.id]}
            title={item.title}
        />
    );

    render() {
        return (
            <FlatList
                horizontal={true}
                bounces={false}
                style={{paddingRight: 15, paddingLeft: 15}}
                showsHorizontalScrollIndicator={false}
                data={this.props.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                keyboardShouldPersistTaps={'handled'}
            />
        );
    }
}

export class SearchView extends React.Component {
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