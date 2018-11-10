import {Image, Text, View, TextInput, Picker, TouchableWithoutFeedback} from "react-native";
import React from "react";
import SimplePicker from 'react-native-simple-picker';
import { connect } from 'react-redux';


class Card extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props)
        this.state = {
            imgSource: require('../../img/contactless.png'),
            BankState: "Сбербанк",
            CurrencyState: "Рубль",
            PaymentSystemState: "MasterCard",
            NFCState: true
        }
    }

    cardStyles = {
        "Банк": "gray",
        "Сбербанк": "#3e9639",
        "ВТБ": "#",
        "Тинькофф": "#"
    }

    paymentSystemImages = {
        "MasterCard": require("../../img/mastercard.png"),
        "Visa": require("../../img/visa.png"),
        "МИР": require("../../img/mir.png"),
        "AmericanExpress": require("../../img/ae.png")
    }

    paymentSystemImagesDark = {
        "MasterCard": require("../../img/mastercardDark.png"),
        "Visa": require("../../img/visaDark.png"),
        "МИР": require("../../img/mirDark.png"),
        "AmericanExpress": require("../../img/aeDark.png")
    }

    changeIsNFC = () => {
        this.state.IsNFC = !this.state.IsNFC
        if (this.state.IsNFC) this.setState({imgSource: require('../../img/contactless.png')})
        else this.setState({imgSource: require('../../img/done.png')})
    }

    done = () => {
        
    }

    cancel = () => {
        
    }

    render() {

        let cardStyle = {
            width: "90%",
            height: 150,
            backgroundColor: 'gray',
            borderRadius: 6,
            marginBottom: 20,
            flex: 1,
        }

        return (
            <View ref={'cardView'} style={cardStyle}>
                {!this.props.Card.IsNew && <Text>{this.props.Card.Bank}</Text>}
                {!this.props.Card.IsNew && <Text>{this.props.Card.PaymentSystem}</Text>}
                {!this.props.Card.IsNew && this.props.Card.IsNFC && 
                    <Image source={require('../../img/contactless.png')}/>
                }
                {this.props.Card.IsNew && 
                    <TextInput 
                        style={{
                            position: "absolute",
                            width: "30%",
                            alignSelf: "center",
                            textAlign: "center",
                            marginTop: 50
                        }}
                        maxLength={10}
                        onChange={(name) => this.props.Card.Name = name }
                        placeholder={"Название"}
                        multiline={false}>
                    </TextInput>}
                {this.props.Card.IsNew && 
                    <Text
                        style={{
                            position: "absolute",
                            width: "30%",
                            height: 30,
                            marginLeft: 10,
                            marginTop: 8,
                            alignSelf: "flex-start"
                        }}
                        onPress={() => {
                            this.refs.bankPicker.show();
                        }}
                    > {this.state.BankState}
                    </Text>}
                {this.props.Card.IsNew && 
                    <SimplePicker
                        ref={'bankPicker'}
                        options={['Сбербанк','Visa','МИР', 'AmericanExpress']}
                        onSubmit={(option) => {
                            this.setState({
                                BankState: option,
                            });
                        }}
                    />}
                {this.props.Card.IsNew && 
                    <Text
                        style={{
                            position: "absolute",
                            width: "30%",
                            height: 30,
                            marginLeft: 10,
                            alignSelf: "flex-start",
                            bottom: 0
                        }}
                        onPress={() => {
                            this.refs.currencyPicker.show();
                        }}
                    > {this.state.CurrencyState}
                    </Text>}
                {this.props.Card.IsNew && 
                    <SimplePicker
                        ref={'currencyPicker'}
                        options={['Рубль','Евро','Доллар']}
                        onSubmit={(option) => {
                            this.setState({
                                CurrencyState: option,
                            });
                        }}
                    />}
                 {this.props.Card.IsNew && 
                    <Text
                        style={{
                            position: "absolute",
                            width: "30%",
                            height: 30,
                            marginLeft: 10,
                            alignSelf: "flex-end",
                            bottom: 0
                        }}
                        onPress={() => {
                            this.refs.paymentSystemPicker.show();
                        }}
                    > {this.state.PaymentSystemState}
                    </Text>}
                {this.props.Card.IsNew && 
                    <SimplePicker
                        ref={'paymentSystemPicker'}
                        options={['MasterCard','Visa','МИР', 'AmericanExpress']}
                        onSubmit={(option) => {
                            this.setState({
                                PaymentSystemState: option,
                            });
                        }}
                    />}
                {this.props.Card.IsNew && 
                    <TouchableWithoutFeedback
                         onPress={() => {this.changeIsNFC()}}>
                        <Image 
                            style={{
                                height: 30,
                                width: 30,
                                alignSelf: "flex-end",
                                marginTop: 60,
                                right: 10,
                                position: "absolute",
                            }}
                            source={this.state.imgSource}/>
                    </TouchableWithoutFeedback>}
                {this.props.Card.IsNew && 
                    <TouchableWithoutFeedback
                        onPress={this.done()}>
                        <Image 
                            style={{
                                height: 55,
                                width: 55,
                                alignSelf: "flex-end",
                                marginTop: -3.5,
                                right: 35,
                                position: "absolute",
                            }}
                            source={require('../../img/done.png')}/>
                    </TouchableWithoutFeedback>}
                {this.props.Card.IsNew && 
                    <TouchableWithoutFeedback 
                        onPress={this.cancel()}>
                        <Image 
                            style={{
                                position: "absolute",
                                height: 30,
                                width: 30,
                                alignSelf: "flex-end",
                                marginTop: 10,
                                right: 10,
                            }}
                            source={require('../../img/close.png')}/>
                    </TouchableWithoutFeedback>}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        dark: state.settings.dark
    }
}

export default connect(mapStateToProps)(Card)