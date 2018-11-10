import {Image, Text, View, TextInput, Picker} from "react-native";
import React from "react";

export class Card extends React.Component {

    static navigationOptions = {
        header: null,
    };

    changeIsNFC() {
        this.props.IsNFC = !this.props.IsNFC
        if (this.props.IsNFC) this._IsNFC.source = require('../../img/contactless_payment.png')
        else this._IsNFC.source = require('../../img/done.png')
    }

    done() {
        this.props.Card.Name = this._Name.value
        this.props.Card.Bank = this._Bank.selectedValue
        this.props.Card.Currency = this._Currency.selectedValue
    }

    render() {

        let cardStyle = {
            width: "90%",
            height: 150,
            backgroundColor: "gray",
            borderRadius: 6,
            marginBottom: 20
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
                        ref={component => this._Name = component}
                        placeholder={"Название"}
                        multiline={false}>
                    </TextInput>}
                {this.props.Card.IsNew && 
                    <Picker ref={component => this._Bank = component}>
                        <Picker.Item label="Сбербанк" value="0" />
                        <Picker.Item label="Тинькофф" value="1" />
                        <Picker.Item label="ВТБ" value="2" />
                    </Picker>}
                {this.props.Card.IsNew && 
                <Picker ref={component => this._Currency = component}>
                    <Picker.Item label="Рубль" value="0" />
                    <Picker.Item label="Евро" value="1" />
                    <Picker.Item label="Доллар" value="2" />
                </Picker>}
                {this.props.Card.IsNew && 
                    <Image 
                        ref={component => this._IsNFC = component} 
                        source={require('../../img/contactless_payment.png')}
                        onPress={this.changeIsNFC()}/>}
                {this.props.Card.IsNew && <Image onPress={this.done()} source={require('../../img/done.png')}/>}
                {this.props.Card.IsNew && <Image onPress={this.close()} source={require('../../img/close.png')}/>}
            </View>
        );
    }
}