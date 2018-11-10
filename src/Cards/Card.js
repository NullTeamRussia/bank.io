import {Image, Text, View, TextInput, Picker, TouchableWithoutFeedback} from "react-native";
import React from "react";

export class Card extends React.Component {

    static navigationOptions = {
        header: null,
    };

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
                        onChange={(name) => this.props.Card.Name = name }
                        placeholder={"Название"}
                        multiline={false}>
                    </TextInput>}
                {this.props.Card.IsNew && 
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
                {this.props.Card.IsNew && <Image onPress={this.done()} source={require('../../img/done.png')}/>}
                {this.props.Card.IsNew && <Image onPress={this.close()} source={require('../../img/close.png')}/>}
            </View>
        );
    }
}