import React from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from "react-native"
import { GoBackButton } from "../Shared/GoBackArrow";
import { AddButton } from '../Shared/AddButton';
import { connect } from 'react-redux';
import { addCard } from "../Actions/add_card"

class CardsScreenHeader extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 25, fontWeight: 'bold', color: '#272727', marginLeft: -12}}>Мои карты</Text>
            </View>
        );
    }
}

class CardsScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            isScrollEnabled: true,
            isEnabled: false
        }
    }

    render() {

        let cardsScreenStyle = {
            flex: 1,
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: "#ffffff",
            zIndex: 1000,
            display: "flex",
            paddingTop: 50,
            paddingLeft: 15,
            paddingRight: 15
        };

        return (
            <View style={cardsScreenStyle}>
                <CardsScreenHeader/>
                <AddButton onPress={() => {
                    this.props.cards.unshift({
                        Name: "Название",
                        Bank: "sberbank",
                        PaymentSystem: "mastercard",
                        Currency: "RUB",
                        IsNFC: true,
                        IsNew: true
                    })
                }}></AddButton>
                <GoBackButton navigation={this.props.navigation} dark={this.props.dark}/>
                <ScrollView 
                    ref={component => this._ScrollView = component}
                    style={{
                        flex: 1,
                        marginTop: 30
                    }}
                    contentContainerStyle={{
                        paddingVertical: 20,
                        alignItems: 'center',
                    }}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={this.state.isScrollEnabled}
                >   
                   <View style={{width: "100%",
                    paddingLeft: 20,
                    paddingRight: 20,
                    height: 125,
                    borderRadius: 11,
                    marginBottom: 20,
                    flex: 1,
                    backgroundColor: this.props.dark ? '#111111' : '#3e9639'}}>
                    <Text style={{
                            color: 'white',
                            position: "absolute",
                            width: "50%",
                            alignSelf: "center",
                            textAlign: "center",
                            marginTop: 40,
                            fontSize: 16
                        }}>Сбербанк#1</Text>
                    <TouchableWithoutFeedback>
                        <Image style={{position: "absolute",
                            width: 120,
                            height: 23,
                            left: 10,
                            alignSelf: "flex-start",
                            top: 12}} source={require('../../img/sberbankDark.png')}/>
                    </TouchableWithoutFeedback>
                    <Text style={{color: 'white',
                            position: "absolute",
                            width: 25,
                            height: 25,
                            left: 7,
                            alignSelf: "flex-start",
                            bottom: 9,
                            fontSize: 20}}>₽</Text>
                    <TouchableWithoutFeedback>
                        <Image style={{ position: "absolute",
                            width: 26,
                            height: 20,
                            right: 10,
                            alignSelf: "flex-end",
                            bottom: 10}} source={this.props.dark ? require('../../img/mastercardDark.png') : require('../../img/mastercard.png')}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Image style={{height: 25,
                        width: 25,
                        alignSelf: "flex-end",
                        marginTop: 53,
                        right: 10,
                        position: "absolute",}} source={this.props.dark ? require('../../img/contactlessDark.png') : require('../../img/contactless.png')}/>
                    </TouchableWithoutFeedback>
                   </View>
                   <View style={{width: "100%",
                    paddingLeft: 20,
                    paddingRight: 20,
                    height: 125,
                    borderRadius: 11,
                    marginBottom: 20,
                    flex: 1,
                    backgroundColor: this.props.dark ? '#111111' : '#3e9639'}}>
                    <Text style={{
                            color: 'white',
                            position: "absolute",
                            width: "50%",
                            alignSelf: "center",
                            textAlign: "center",
                            marginTop: 40,
                            fontSize: 16
                        }}>Сбербанк#2</Text>
                    <TouchableWithoutFeedback>
                        <Image style={{position: "absolute",
                            width: 120,
                            height: 23,
                            left: 10,
                            alignSelf: "flex-start",
                            top: 12}} source={require('../../img/sberbankDark.png')}/>
                    </TouchableWithoutFeedback>
                    <Text style={{color: 'white',
                            position: "absolute",
                            width: 25,
                            height: 25,
                            left: 7,
                            alignSelf: "flex-start",
                            bottom: 9,
                            fontSize: 20}}>₽</Text>
                    <TouchableWithoutFeedback>
                        <Image style={{ position: "absolute",
                            width: 37,
                            height: 17,
                            right: 10,
                            alignSelf: "flex-end",
                            bottom: 10}} source={this.props.dark ? require('../../img/visaDark.png') : require('../../img/visa.png')}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Image style={{height: 25,
                        width: 25,
                        alignSelf: "flex-end",
                        marginTop: 53,
                        right: 10,
                        position: "absolute",}} source={this.props.dark ? require('../../img/contactlessDark.png') : require('../../img/contactless.png')}/>
                    </TouchableWithoutFeedback>
                   </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {cards: state.cards.cards, dark: state.settings.dark}
};

const mapDispatchToProps = {
    addCard
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsScreen);

