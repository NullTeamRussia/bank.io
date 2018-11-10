<<<<<<< HEAD
import {Image, Text, View, TextInput, Picker} from "react-native";
=======
import {Image, Text, View, TextInput, Picker, TouchableWithoutFeedback} from "react-native";
>>>>>>> e87ac895384f1a703821698a39f11c3e5836cad4
import React from "react";

export class Card extends React.Component {

    static navigationOptions = {
        header: null,
    };

<<<<<<< HEAD
    changeIsNFC() {
        this.props.IsNFC = !this.props.IsNFC
        if (this.props.IsNFC) this._IsNFC.source = require('../../img/contactless_payment.png')
        else this._IsNFC.source = require('../../img/done.png')
    }

    done() {
        this.props.Card.Name = this._Name.value
        this.props.Card.Bank = this._Bank.selectedValue
        this.props.Card.Currency = this._Currency.selectedValue
=======
    constructor(props){
        super(props)
        this.state = {
            imgSource: require('../../img/contactless_payment.png'),
            BankState: "Тинькофф",
            CurrencyState: "Rubble"
        }
    }

    changeIsNFC = () => {
        this.props.Card.IsNFC = !this.props.Card.IsNFC
        if (this.props.Card.IsNFC) this.setState({imgSource: require('../../img/contactless_payment.png')})
        else this.setState({imgSource: require('../../img/done.png')})
    }

    done = () => {
        
    }

    close = () => {
        
>>>>>>> e87ac895384f1a703821698a39f11c3e5836cad4
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
<<<<<<< HEAD
                        ref={component => this._Name = component}
=======
                        onChange={(name) => this.props.Card.Name = name }
>>>>>>> e87ac895384f1a703821698a39f11c3e5836cad4
                        placeholder={"Название"}
                        multiline={false}>
                    </TextInput>}
                {this.props.Card.IsNew && 
<<<<<<< HEAD
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
=======
                    <Picker 
                        selectedValue={this.state.BankState}
                        onValueChange={(value, pos) => this.setState({BankState: value})}>
                        <Picker.Item label="Сбербанк" value="Сбербанк" />
                        <Picker.Item label="Тинькофф" value="Тинькофф" />
                        <Picker.Item label="ВТБ" value="ВТБ" />
                    </Picker>}
                {this.props.Card.IsNew && 
                <Picker 
                    selectedValue={this.state.CurrencyState}
                    onValueChange={(value, pos) => this.setState({CurrencyState: value})}>
                    <Picker.Item label="Рубль" value="Рубль" />
                    <Picker.Item label="Евро" value="Евро" />
                    <Picker.Item label="Доллар" value="Доллар" />
                </Picker>}
                {this.props.Card.IsNew && 
                    <TouchableWithoutFeedback onPress={() => {this.changeIsNFC()}}>
                        <Image 
                            ref={component => this._IsNFC = component} 
                            source={this.props.imgSource}/>
                    </TouchableWithoutFeedback>}
>>>>>>> e87ac895384f1a703821698a39f11c3e5836cad4
                {this.props.Card.IsNew && <Image onPress={this.done()} source={require('../../img/done.png')}/>}
                {this.props.Card.IsNew && <Image onPress={this.close()} source={require('../../img/close.png')}/>}
            </View>
        );
    }
}