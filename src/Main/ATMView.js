import {Image, Text, View, FlatList} from "react-native";
import React from "react";
import {ATMs} from "../../consts";

class ProviderElement extends React.Component {
    render() {
        return (
            <View>

            </View>
        );
    }
}

class ProvidersAvailable extends React.Component {
    _renderFlatListItem = ({item, index}) => (
        <ProviderElement item={item} />
    );

    _renderFooter = () => (
        <View style={{marginRight: 30}}>
        </View>
    );
    render() {
        return (
            <FlatList
                handler={this.props.handler}
                data={ATMs}
                renderItem={this._renderFlatListItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={this._renderFooter()}
            />
        );
    }
}

class ATMElement extends React.Component {
    render() {
        const leftImage = this.props.item.type === "atm" ? require("../../img/atm.png") : require("../../img/cashback.png");
        return (
            <View style={{
                width: "100%",
                height: 60,
                borderBottomWidth: 0.5,
                borderBottomColor: "#cbcbcb"
            }}>
                <View style={{
                    height: 40,
                    width: 40,
                    position: 'absolute',
                    left: 0
                }}>
                    <Image source={leftImage} style={{height: 40, width: 40}} />
                </View>
                <Text style={{
                    right: 0,
                    position: "absolute",
                    top: 5
                }}>
                    {this.props.item.address}
                </Text>
                <ProvidersAvailable data={this.props.item.banks} />
            </View>
        );
    }
}

export class ATMView extends React.PureComponent {

    _renderFlatListItem = ({item, index}) => (
        <ATMElement handler={this.props.handler} item={item} index={index} state={this.state} />
    );

    _renderFooter = () => (
        <View style={{marginBottom: 30}}>
        </View>
    );
    render() {
        return (
            <FlatList
                handler={this.props.handler}
                data={ATMs}
                renderItem={this._renderFlatListItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={this._renderFooter()}
                style={{paddingRight: 30, paddingLeft: 30}}
            />
        );
    }
}