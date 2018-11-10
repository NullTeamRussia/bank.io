import React from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from "react-native"
import Card from "./Card";
import { GoBackButton } from "../Shared/GoBackArrow";
import { AddButton } from '../Shared/AddButton';
import { addCard } from "../Actions/add_card"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
            isScrollEnabled: true
        }
    }

    enableCardAdding = () => {
        this._ScrollView.scrollTo({x: 0, y: 0, animated: true})
        this.setState({isScrollEnabled: false})  
        this.props.cards.unshift({
            Name: "Имя",
            Bank: "Банк",
            PaymentSystem: "Visa",
            Currency: "Rubble",
            IsNFC: true,
            IsNew: true,
        })
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
                <AddButton onPress={this.enableCardAdding}></AddButton>
                <GoBackButton navigation={this.props.navigation}/>
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
                    {this.props.cards.map(card => (
                        <Card Card={card}></Card>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {cards: state.cards.Cards}
};

const mapDispatchToProps = {
    addCard
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsScreen);

