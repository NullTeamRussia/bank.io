import {Image, Text, View, TextInput, Picker, TouchableWithoutFeedback} from "react-native";
import React from "react";
import SimplePicker from 'react-native-simple-picker';


export class Card extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props)
        this.state = {
            imgSource: require('../../img/contactless_payment.png'),
            BankState: "Сбербанк",
            CurrencyState: "Валюта",
            PaymentSystemState: "Провайдер",
            NFCState: true
        }
    }

    changeIsNFC = () => {
        this.state.IsNFC = !this.state.IsNFC
        if (this.state.IsNFC) this.setState({imgSource: require('../../img/contactless_payment.png')})
        else this.setState({imgSource: require('../../img/done.png')})
    }

    done = () => {
        
    }

    close = () => {
        
    }

    render() {

        let cardStyle = {
            width: "90%",
            height: 150,
            backgroundColor: "gray",
            borderRadius: 6,
            marginBottom: 20,
            flex: 1,
        }

        return (
            <View style={cardStyle}>
                {!this.props.Card.IsNew && <Text>{this.props.Card.Bank}</Text>}
                {!this.props.Card.IsNew && <Text>{this.props.Card.PaymentSystem}</Text>}
                {!this.props.Card.IsNew && this.props.Card.IsNFC && 
                    <Image source={require('../../img/contactless_payment.png')}/>
                }
                {this.props.Card.IsNew && 
                    <TextInput 
                        style={{
                            position: "absolute",
                            width: "25%",
                            alignSelf: "center",
                            marginTop: 50
                        }}
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
                            alignSelf: "flex-end",
                            bottom: 0
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
                    <TouchableWithoutFeedback onPress={() => {this.changeIsNFC()}}>
                        <Image source={this.state.imgSource}/>
                    </TouchableWithoutFeedback>}
                {this.props.Card.IsNew && 
                    <TouchableWithoutFeedback onPress={this.done()}>
                        <Image source={require('../../img/done.png')}/>
                    </TouchableWithoutFeedback>}
                {this.props.Card.IsNew && <Image onPress={this.close()} source={require('../../img/close.png')}/>}
            </View>
        );
    }
}