import React from 'react';
import {Image, TouchableWithoutFeedback, View, Text, Switch} from "react-native";
import {GoBackButton} from "../Shared/GoBackArrow";

class SettingsScreenHeader extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 25, fontWeight: 'bold', color: '#272727', marginLeft: -12}}>Настройки</Text>
            </View>
        );
    }
}

class Cell extends React.Component {
    render() {
        return (
            <View>
                {this.props.content}
            </View>
        );
    }
}

export class SettingsScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    render() {
        let settingsScreenStyle = {
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

        let darkMode = (
            <View style={{
                height: 50,
                width: '100%',
                justifyContent: 'center',
            }}>
                <Text style={{fontSize: 17, color: '#272727', marginLeft: 10}}>Тёмная тема</Text>
                <Switch onValueChange={() => {}}
                        ios_backgroundColor={'#9ed3ff'}
                        trackColor={{false: "#3176fe", true: '#9ed3ff'}}
                        style={{
                            position: 'absolute',
                            right: 0,
                        }}
                />
            </View>
        );

        let myCards = (
            <View style={{
                height: 50,
                width: '100%',
                justifyContent: 'center',
            }}>
                <Text 
                    style={{fontSize: 17, color: '#272727', marginLeft: 10}} 
                    onPress={() => (this.props.navigation.navigate('Cards'))}
                >Мои карты</Text>
            </View>
        )

        return (
            <View style={settingsScreenStyle}>
                <GoBackButton navigation={this.props.navigation}/>
                <SettingsScreenHeader/>
                <View style={{
                    marginTop: 30,
                }}>
                    <Cell content={darkMode}/>
                    <Cell content={myCards}/>
                </View>
            </View>
        );
    }
}