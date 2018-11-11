import {Image, Text, View, TextInput, Picker, TouchableWithoutFeedback} from "react-native";
import React from "react";
import SimplePicker from 'react-native-simple-picker';
import { connect } from 'react-redux';
import { addCard } from "../Actions/add_card"


class Card extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props){
        super(props)
        if (this.props.Card.IsNew) {
            this.state = {
                Name: "",
                nfcState: {
                    image: this.props.dark ? require('../../img/contactlessDark.png') : require('../../img/contactless.png'),
                    styles: {
                        height: 25,
                        width: 25,
                        alignSelf: "flex-end",
                        marginTop: 53,
                        right: 10,
                        position: "absolute",
                    },
                    value: true
                },
                paymentSystemState: {
                    image: this.props.dark ? require('../../img/mastercardDark.png') : require('../../img/mastercard.png'),
                    styles: {
                        position: "absolute",
                        width: 26,
                        height: 20,
                        right: 10,
                        alignSelf: "flex-end",
                        bottom: 10
                    },
                    value: 'mastercard'
                },
                bankState: {
                    image: require('../../img/sberbankDark.png'),
                    style: {
                        position: "absolute",
                        width: 120,
                        height: 23,
                        left: 10,
                        alignSelf: "flex-start",
                        top: 12
                    },
                    value: 'sberbank'
                },
                currencyState: {
                    image: "₽",
                    styles: {
                        color: 'white',
                        position: "absolute",
                        width: 25,
                        height: 25,
                        left: 7,
                        alignSelf: "flex-start",
                        bottom: 9,
                        fontSize: 20
                    },
                    value: "RUB"
                },
                cardStyle: {
                    width: "100%",
                    paddingLeft: 20,
                    paddingRight: 20,
                    height: 125,
                    borderRadius: 11,
                    marginBottom: 20,
                    flex: 1,
                    backgroundColor: this.props.dark ? '#111111' : '#3e9639'
                }
            }
        } else {
            if (this.props.Card.IsNFC) {
                newNfcState = {
                    image: this.props.dark ? require('../../img/contactlessDark.png') : require('../../img/contactless.png'),
                    styles: {
                        height: 25,
                        width: 25,
                        alignSelf: "flex-end",
                        marginTop: 53,
                        right: 10,
                        position: "absolute",
                    },
                }
            } else {
                newNfcState = {
                    image: this.props.dark ? require('../../img/contactlessDarkOff.png') : require('../../img/contactlessOff.png'),
                    styles: {
                        height: 25,
                        width: 25,
                        alignSelf: "flex-end",
                        marginTop: 53,
                        right: 10,
                        position: "absolute",
                    },
                }
            }
            switch (this.props.Card.PaymentSystem){
                case ('mastercard'): {
                    newPaymentSystemState = {
                        image: this.props.dark ? require('../../img/mastercardDark.png') : require('../../img/mastercard.png'),
                        styles: {
                            position: "absolute",
                            width: 26,
                            height: 20,
                            right: 10,
                            alignSelf: "flex-end",
                            bottom: 10
                        },
                        value: 'mastercard'
                    }
                    break
                }
                case ('ae'): {
                    newPaymentSystemState = {
                        image: this.props.dark ? require('../../img/aeDark.png') : require('../../img/ae.png'),
                        styles: {
                            position: "absolute",
                            width: 29,
                            height: 17,
                            right: 10,
                            alignSelf: "flex-end",
                            bottom: 10
                        },
                        value: 'ae'
                    }
                    break
                }
                case ('mir'): {
                    newPaymentSystemState = {
                        image: this.props.dark ? require('../../img/mirDark.png') : require('../../img/mir.png'),
                        styles: {
                            position: "absolute",
                            width: 42,
                            height: 17,
                            right: 10,
                            alignSelf: "flex-end",
                            bottom: 10
                        },
                        value: 'mir'
                    }
                    break
                }
                case ('visa'): {
                    newPaymentSystemState = {
                        image: this.props.dark ? require('../../img/visaDark.png') : require('../../img/visa.png'),
                        styles: {
                            position: "absolute",
                            width: 37,
                            height: 17,
                            right: 10,
                            alignSelf: "flex-end",
                            bottom: 10
                        },
                        value: 'visa'
                    }
                    break
                }
                default: {
                    newPaymentSystemState = {
                        image: this.props.dark ? require('../../img/mastercardDark.png') : require('../../img/mastercard.png'),
                        styles: {
                            position: "absolute",
                            width: 26,
                            height: 20,
                            right: 10,
                            alignSelf: "flex-end",
                            bottom: 10
                        },
                        value: 'mastercard'
                    }
                }
            }
            switch (this.props.Card.Bank){
                case('sberbank'): {
                    newBankState = {
                        image: require('../../img/sberbankDark.png'),
                        style: {
                            position: "absolute",
                            width: 120,
                            height: 23,
                            left: 10,
                            alignSelf: "flex-start",
                            top: 12
                        },
                        value: 'sberbank'
                    }
                    break
                }
                case('vtb'): {
                    newBankState = {
                        image: this.props.dark ? require('../../img/vtbDark.png') : require('../../img/vtb.png'),
                        style: {
                            position: "absolute",
                            width: 65,
                            height: 23,
                            left: 10,
                            alignSelf: "flex-start",
                            top: 10
                        },
                        value: 'vtb'
                    }
                    break
                }
                case('tinkoff'): {
                    newBankState = {
                        image: this.props.dark ? require('../../img/tinkoffDark.png') : require('../../img/tinkoff.png'),
                        style: {
                            position: "absolute",
                            width: 100,
                            height: 23,
                            left: 10,
                            alignSelf: "flex-start",
                            top: 10
                        },
                        value: 'tinkoff'
                    }
                    break
                }
                default: {
                    newBankState = {
                        image: require('../../img/sberbankDark.png'),
                        style: {
                            position: "absolute",
                            width: 120,
                            height: 23,
                            left: 10,
                            alignSelf: "flex-start",
                            top: 12
                        },
                        value: 'sberbank'
                    }
                }
            }
            switch(this.props.Card.Currency){
                case('RUB'): {
                    newCurrencyState = {
                        image: "₽",
                        styles: {
                            color: 'white',
                            position: "absolute",
                            width: 25,
                            height: 25,
                            left: 7,
                            alignSelf: "flex-start",
                            bottom: 9,
                            fontSize: 20
                        },
                        value: "RUB"
                    }
                    break
                }
                case('EUR'): {
                    newCurrencyState = {
                        image: "€",
                        styles: {
                            color: 'white',
                            position: "absolute",
                            width: 25,
                            height: 25,
                            left: 7,
                            alignSelf: "flex-start",
                            bottom: 9,
                            fontSize: 20
                        },
                        value: "EUR"
                    }
                    break
                }
                case('DOLL'): {
                    newCurrencyState = {
                        image: "$",
                        styles: {
                            color: 'white',
                            position: "absolute",
                            width: 25,
                            height: 25,
                            left: 7,
                            alignSelf: "flex-start",
                            bottom: 9,
                            fontSize: 20
                        },
                        value: "DOLL"
                    }
                    break
                }
                default: {
                    newCurrencyState = {
                        image: "₽",
                        styles: {
                            color: 'white',
                            position: "absolute",
                            width: 25,
                            height: 25,
                            left: 7,
                            alignSelf: "flex-start",
                            bottom: 9,
                            fontSize: 20
                        },
                        value: "RUB"
                    }
                    break
                }
            }
            this.state = {
                nfcState: newNfcState,
                bankState: newBankState,
                paymentSystemState: newPaymentSystemState,
                currencyState: newCurrencyState,
                cardStyle: {
                    width: "100%",
                    paddingLeft: 20,
                    paddingRight: 20,
                    height: 125,
                    borderRadius: 11,
                    marginBottom: 20,
                    flex: 1,
                    backgroundColor: this.props.dark ? '#111111' : '#3e9639'
                }
            }
        }
    }

    changeNfcState = () => {
        if (this.state.nfcState.value) {
            newNfcState = {
                image: this.props.dark ? require('../../img/contactlessDarkOff.png') : require('../../img/contactlessOff.png'),
                styles: {
                    height: 25,
                    width: 25,
                    alignSelf: "flex-end",
                    marginTop: 53,
                    right: 10,
                    position: "absolute",
                },
                value: !this.state.nfcState.value
            }
        } else {
            newNfcState = {
                image: this.props.dark ? require('../../img/contactlessDark.png') : require('../../img/contactless.png'),
                styles: {
                    height: 25,
                    width: 25,
                    alignSelf: "flex-end",
                    marginTop: 53,
                    right: 10,
                    position: "absolute",
                },
                value: !this.state.nfcState.value
            }
        }
        this.setState({nfcState: newNfcState})
    }

    changePaymentSystemState = (options) => {
        switch (options){
            case ('MasterCard'): {
                newPaymentSystemState = {
                    image: this.props.dark ? require('../../img/mastercardDark.png') : require('../../img/mastercard.png'),
                    styles: {
                        position: "absolute",
                        width: 26,
                        height: 20,
                        right: 10,
                        alignSelf: "flex-end",
                        bottom: 10
                    },
                    value: 'mastercard'
                }
                break
            }
            case ('AmericanExpress'): {
                newPaymentSystemState = {
                    image: this.props.dark ? require('../../img/aeDark.png') : require('../../img/ae.png'),
                    styles: {
                        position: "absolute",
                        width: 29,
                        height: 17,
                        right: 10,
                        alignSelf: "flex-end",
                        bottom: 10
                    },
                    value: 'ae'
                }
                break
            }
            case ('МИР'): {
                newPaymentSystemState = {
                    image: this.props.dark ? require('../../img/mirDark.png') : require('../../img/mir.png'),
                    styles: {
                        position: "absolute",
                        width: 42,
                        height: 17,
                        right: 10,
                        alignSelf: "flex-end",
                        bottom: 10
                    },
                    value: 'mir'
                }
                break
            }
            case ('Visa'): {
                newPaymentSystemState = {
                    image: this.props.dark ? require('../../img/visaDark.png') : require('../../img/visa.png'),
                    styles: {
                        position: "absolute",
                        width: 37,
                        height: 17,
                        right: 10,
                        alignSelf: "flex-end",
                        bottom: 10
                    },
                    value: 'visa'
                }
                break
            }
            default: {
                newPaymentSystemState = {
                    image: this.props.dark ? require('../../img/mastercardDark.png') : require('../../img/mastercard.png'),
                    styles: {
                        position: "absolute",
                        width: 26,
                        height: 20,
                        right: 10,
                        alignSelf: "flex-end",
                        bottom: 10
                    },
                    value: 'mastercard'
                }
            }
        }
        this.setState({paymentSystemState: newPaymentSystemState})
    }

    changeBankState = (options) => {
        switch(options){
            case('Сбербанк'): {
                newBankState = {
                    image: require('../../img/sberbankDark.png'),
                    style: {
                        position: "absolute",
                        width: 120,
                        height: 23,
                        left: 10,
                        alignSelf: "flex-start",
                        top: 12
                    },
                    value: 'sberbank'
                }
                break
            }
            case('ВТБ'): {
                newBankState = {
                    image: this.props.dark ? require('../../img/vtbDark.png') : require('../../img/vtb.png'),
                    style: {
                        position: "absolute",
                        width: 65,
                        height: 23,
                        left: 10,
                        alignSelf: "flex-start",
                        top: 10
                    },
                    value: 'vtb'
                }
                break
            }
            case('Тинькофф'): {
                newBankState = {
                    image: this.props.dark ? require('../../img/tinkoffDark.png') : require('../../img/tinkoff.png'),
                    style: {
                        position: "absolute",
                        width: 100,
                        height: 23,
                        left: 10,
                        alignSelf: "flex-start",
                        top: 10
                    },
                    value: 'tinkoff'
                }
                break
            }
            default: {
                newBankState = {
                    image: require('../../img/sberbankDark.png'),
                    style: {
                        position: "absolute",
                        width: 120,
                        height: 23,
                        left: 10,
                        alignSelf: "flex-start",
                        top: 12
                    },
                    value: 'sberbank'
                }
            }
        }
        this.setState({bankState: newBankState})
    }

    changeCurrencyState = (options) => {
        switch(options){
            case('Рубль'): {
                newCurrencyState = {
                    image: "₽",
                    styles: {
                        color: 'white',
                        position: "absolute",
                        width: 25,
                        height: 25,
                        left: 7,
                        alignSelf: "flex-start",
                        bottom: 9,
                        fontSize: 20
                    },
                    value: "RUB"
                }
                break
            }
            case('Евро'): {
                newCurrencyState = {
                    image: "€",
                    styles: {
                        color: 'white',
                        position: "absolute",
                        width: 25,
                        height: 25,
                        left: 7,
                        alignSelf: "flex-start",
                        bottom: 9,
                        fontSize: 20
                    },
                    value: "EUR"
                }
                break
            }
            case('Доллар'): {
                newCurrencyState = {
                    image: "$",
                    styles: {
                        color: 'white',
                        position: "absolute",
                        width: 25,
                        height: 25,
                        left: 7,
                        alignSelf: "flex-start",
                        bottom: 9,
                        fontSize: 20
                    },
                    value: "DOLL"
                }
                break
            }
            default: {
                newCurrencyState = {
                    image: "₽",
                    styles: {
                        color: 'white',
                        position: "absolute",
                        width: 25,
                        height: 25,
                        left: 7,
                        alignSelf: "flex-start",
                        bottom: 9,
                        fontSize: 20
                    },
                    value: "RUB"
                }
                break
            }
        }
        this.setState({currencyState: newCurrencyState})
    }

    cancel = () => {
        
    }

    render() {

        return (
            <View style={this.state.cardStyle}>
                {!this.props.Card.IsNew && 
                    <Text style={{
                            color: 'white',
                            position: "absolute",
                            width: "50%",
                            alignSelf: "center",
                            textAlign: "center",
                            marginTop: 40,
                            fontSize: 16
                        }}>{this.props.Card.Name}</Text>}
                {!this.props.Card.IsNew && 
                    <TouchableWithoutFeedback>
                        <Image style={this.state.bankState.style} source={this.state.bankState.image}/>
                    </TouchableWithoutFeedback>}
                {!this.props.Card.IsNew && 
                    <Text style={this.state.currencyState.styles}>{this.state.currencyState.image}</Text>}
                {!this.props.Card.IsNew && 
                    <TouchableWithoutFeedback>
                        <Image style={this.state.paymentSystemState.style} source={this.state.paymentSystemState.image}/>
                    </TouchableWithoutFeedback>}
                {!this.props.Card.IsNew && 
                    <TouchableWithoutFeedback>
                        <Image style={this.state.nfcState.style} source={this.state.nfcState.image}/>
                    </TouchableWithoutFeedback>}
                {this.props.Card.IsNew && 
                    <TextInput 
                        style={{
                            color: 'white',
                            position: "absolute",
                            width: "50%",
                            alignSelf: "center",
                            textAlign: "center",
                            marginTop: 40,
                            fontSize: 16
                        }}
                        placeholderTextColor={'white'}
                        maxLength={10}
                        onChange={(name) => this.setState({Name: name}) }
                        placeholder={"Название"}
                        multiline={false}>
                    </TextInput>}
                {this.props.Card.IsNew && 
                    <TouchableWithoutFeedback 
                        onPress={() => {
                            this.refs.bankPicker.show();
                    }}>
                    <Image
                        source={this.state.bankState.image}
                        style={this.state.bankState.style}/>
                    </TouchableWithoutFeedback>}
                {this.props.Card.IsNew && 
                    <SimplePicker
                        ref={'bankPicker'}
                        options={['Сбербанк','Тинькофф','ВТБ']}
                        onSubmit={(option) => {
                            this.changeBankState(option)
                        }}
                    />}
                {this.props.Card.IsNew && 
                    <Text
                        style={this.state.currencyState.styles}
                        onPress={() => {
                            this.refs.currencyPicker.show();
                        }}
                    > {this.state.currencyState.image}
                    </Text>}
                {this.props.Card.IsNew && 
                    <SimplePicker
                        ref={'currencyPicker'}
                        options={['Рубль','Евро','Доллар']}
                        onSubmit={(option) => {
                            this.changeCurrencyState(option)
                        }}
                    />}
                 {this.props.Card.IsNew && 
                    <TouchableWithoutFeedback 
                        onPress={() => {
                            this.refs.paymentSystemPicker.show();
                    }}>
                    <Image
                        source={this.state.paymentSystemState.image}
                        style={this.state.paymentSystemState.styles}/>
                    </TouchableWithoutFeedback>}
                {this.props.Card.IsNew && 
                    <SimplePicker
                        ref={'paymentSystemPicker'}
                        options={['MasterCard','Visa','МИР', 'AmericanExpress']}
                        onSubmit={(option) => {
                            this.changePaymentSystemState(option)
                        }}
                    />}
                {this.props.Card.IsNew && 
                    <TouchableWithoutFeedback
                         onPress={() => {this.changeNfcState()}}>
                        <Image 
                            style={this.state.nfcState.styles}
                            source={this.state.nfcState.image}/>
                    </TouchableWithoutFeedback>}
                {this.props.Card.IsNew && 
                    <TouchableWithoutFeedback
                        onPress={() => {
                            newCard = {
                                Name: this.props.Card.Name,
                                Bank: this.state.bankState.value,
                                PaymentSystem: this.state.paymentSystemState.value,
                                Currency: this.state.currencyState.value,
                                IsNFC: this.state.nfcState.value
                            }
                            alert("HERE")
                            this.props.addCard(newCard)
                            this.props.Card.IsNew = false;
                        }}>
                        <Image 
                            style={{
                                height: 45,
                                width: 45,
                                alignSelf: "flex-end",
                                marginTop: -1.5,
                                right: 30,
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
                                height: 25,
                                width: 25,
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

const mapDispatchToProps = {
    addCard
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)