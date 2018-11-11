import React from "react";
import {FlatList, Image, Text, TouchableWithoutFeedback, View} from "react-native";
import {ATMs} from "../../consts";
import connect from "react-redux/es/connect/connect";

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

class ATMExtendedElement extends React.Component {
    getCurrency(c) {
        if (c === "RUB") return "₽";
        if (c === "DOLL") return "$";
        if (c === "EUR") return "€";
        return "";
    }

    render() {

        let dest, style;
        if (this.props.item.bank === "sberbank") {
            style = {
                width: 78,
                height: 15,
            };
            dest = this.props.dark ? require("../../img/sberbankDark.png") : require("../../img/sberbank.png");
        }
        let bankElem = this.props.item.type === "atm" ? (<Image source={dest} style={{...style, position: "absolute", right: 15, top: 60}}/>) : null;

        const leftImage = this.props.item.type === "atm" ? require("../../img/atm.png") : require("../../img/cashback.png");
        const leftText = this.props.item.type === "atm" ? "ATM" : "Касса";
        return (
            <View style={{height: '100%', width: '100%'}}>
                <View style={{
                    width: "100%",
                    height: "80%",
                    backgroundColor: this.props.dark ? "#111111" : "#f1f1f1",
                    marginBottom: 20,
                    borderRadius: 11
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
                        bottom: 35,
                        color: this.props.dark ? "#d4d4d4" : "#202020",
                    }}>
                        {this.props.item.address}
                    </Text>
                    <Text style={{
                        fontSize: 10,
                        left: 20,
                        position: "absolute",
                        bottom: 20,
                        color: this.props.dark ? "#d4d4d4" : "#202020",
                    }}>
                        {this.props.item.workingHours}
                    </Text>
                    <View style={{position: 'absolute', top: 60}}>
                        <Text style={{
                            color: this.props.dark ? "#d4d4d4" : "#202020",
                            marginLeft: 20,
                            fontSize: 9
                        }}>
                            Валюты
                        </Text>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            left: 15,
                        }}>
                            {this.props.item.currency.map((x) => (
                                <Text style={{
                                    color: this.props.dark ? "#d4d4d4" : "#202020",
                                    marginLeft: 5,
                                    fontWeight: "bold"
                                }}>
                                    {this.getCurrency(x)}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <View style={{position: 'absolute', right: 0}}>
                        <ProvidersAvailable dark={this.props.dark} item={this.props.item} data={this.props.item.banks} />
                    </View>
                    {bankElem}
                    <CustomPropsView dark={this.props.dark} item={this.props.item} data={this.props.item.custom} />
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        dark: state.settings.dark
    }
}

export default connect(mapStateToProps)(ATMExtendedElement)