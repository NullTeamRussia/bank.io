import {Animated, Image, Text, View, FlatList, TouchableWithoutFeedback} from "react-native";
import React from "react";
import {ATMs} from "../../consts";
import {connect} from "react-redux";

class CustomElement extends React.Component {
    render() {
        let dest;
        if (this.props.item === "nfc") {
            dest = this.props.dark ? require("../../img/nfcDark.png") : require("../../img/nfc.png");
        }
        if (this.props.item === "cashless") {
            dest = this.props.dark ? require("../../img/contactlessDark.png") : require("../../img/contactless.png");
        }
        return (
            <View style={{marginRight: 10}}>
                <Image source={dest} style={{height: 17, width: 17}}/>
            </View>
        );
    }
}

// Cashless/NFC
class CustomPropsView extends React.PureComponent {
    _renderFlatListItem = ({item, index}) => (
        <CustomElement dark={this.props.dark} item={item} />
    );

    render() {
        return (
            <FlatList
                horizontal={true}
                handler={this.props.handler}
                data={this.props.item.custom}
                renderItem={this._renderFlatListItem}
                keyExtractor={(item, index) => item.toString()}
                showsVerticalScrollIndicator={false}
                style={{position: 'absolute', right: 5, bottom: 23}}
            />
        );
    }
}

class ProviderElement extends React.Component {
    render() {
        let dest, style;
        if (this.props.item === "mir") {
            style = {
                width: 42,
                height: 17,
            };
            dest = this.props.dark ? require("../../img/mirDark.png") : require("../../img/mir.png");
        }
        if (this.props.item === "mastercard") {
            style = {
                width: 22,
                height: 17,
            };
            dest = this.props.dark ? require("../../img/mastercardDark.png") : require("../../img/mastercard.png");
        }
        if (this.props.item === "ae") {
            style = {
                width: 29,
                height: 17,
            };
            dest = this.props.dark ? require("../../img/aeDark.png") : require("../../img/ae.png");
        }
        if (this.props.item === "visa") {
            style = {
                width: 37,
                height: 17,
            };
            dest = this.props.dark ? require("../../img/visaDark.png") : require("../../img/visa.png");
        }
        return (
            <View style={{alignItems: 'center', paddingRight: 10}}>
                <Image source={dest}
                       style={style}
                />
            </View>
        );
    }
}

class ProvidersAvailable extends React.Component {
    _renderFlatListItem = ({item, index}) => (
        <ProviderElement dark={this.props.dark} item={item} />
    );

    _renderFooter = () => (
        <View style={{marginRight: 30}}>
        </View>
    );
    render() {
        return (
            <FlatList
                horizontal={true}
                handler={this.props.handler}
                data={this.props.item.providers}
                renderItem={this._renderFlatListItem}
                keyExtractor={(item, index) => item.toString()}
                showsVerticalScrollIndicator={false}
                style={{paddingTop: 24}}
            />
        );
    }
}

class ATMElement extends React.Component {
    state = {
        animX: new Animated.Value(1),
        animY: new Animated.Value(1),
    };

    _animIn() {
        Animated.timing(
            this.state.animY,
            {
                toValue: 0.9,
                duration: 200
            }
        ).start();
        Animated.timing(
            this.state.animX,
            {
                toValue: 0.9,
                duration: 200
            }
        ).start();
    }
    _animOut() {
        Animated.timing(
            this.state.animY,
            {
                toValue: 1,
                duration: 200
            }
        ).start();
        Animated.timing(
            this.state.animX,
            {
                toValue: 1,
                duration: 200
            }
        ).start();
    }

    render() {
        const leftImage = this.props.item.type === "atm" ? require("../../img/atm.png") : require("../../img/cashback.png");
        const leftText = this.props.item.type === "atm" ? "ATM" : "Касса";
        return (
            <TouchableWithoutFeedback onPressIn={() => this._animIn()} onPressOut={() => this._animOut()} onPress={() => this.props.handler(this.props.item, "atmInfo")} style={{height: '100%', width: '100%'}}>
                <Animated.View
                    style={{
                        width: "100%",
                        height: 125,
                        backgroundColor: this.props.dark ? "#111111" : "#f1f1f1",
                        marginBottom: 20,
                        borderRadius: 11,
                        transform:[{scaleX: this.state.animX}, {scaleY: this.state.animY}]
                }}>
                    <Text style={{
                        fontSize: 13,
                        fontWeight: "bold",
                        left: 51,
                        top: 25,
                        color: this.props.dark ? "#d4d4d4" : "#202020",
                    }}>
                        {leftText}
                    </Text>
                    <View style={{
                        position: 'absolute',
                        left: 20,
                        top: 22
                    }}>
                        <Image source={leftImage} style={{height: 21.5, width: 21.5}} />
                    </View>
                    <Text style={{
                        fontSize: 19,
                        fontWeight: 'bold',
                        left: 20,
                        width: 200,
                        position: "absolute",
                        bottom: 20,
                        color: this.props.dark ? "#d4d4d4" : "#202020",
                    }}>
                        {this.props.item.address}
                    </Text>
                    <View style={{position: 'absolute', right: 0}}>
                        <ProvidersAvailable dark={this.props.dark} item={this.props.item} data={this.props.item.banks} />
                    </View>
                    <CustomPropsView dark={this.props.dark} item={this.props.item} data={this.props.item.custom} />
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

class ATMView extends React.PureComponent {

    _renderFlatListItem = ({item, index}) => (
        <ATMElement dark={this.props.dark} handler={this.props.handler} item={item} index={index} state={this.state} />
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
                style={{paddingRight: 20, paddingLeft: 20}}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        dark: state.settings.dark
    }
}

export default connect(mapStateToProps)(ATMView)