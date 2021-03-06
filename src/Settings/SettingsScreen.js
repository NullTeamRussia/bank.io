import React from 'react';
import {Image, TouchableWithoutFeedback, View, Text, Switch, Alert, StatusBar} from "react-native";
import {GoBackButton} from "../Shared/GoBackArrow";
import { connect } from 'react-redux';
import {darkTheme} from "../Actions/darkTheme";

class SettingsScreenHeader extends React.Component {
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 25, fontWeight: 'bold', color: !this.props.dark ? "#171717" : "#eaeaea", marginLeft: -12}}>Настройки</Text>
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

class SettingsScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };
    
    constructor(props){
        super(props);
        this.state = {
            dark: this.props.dark
        }
    }

    render() {
        let settingsScreenStyle = {
            flex: 1,
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: this.state.dark ? "#2a2a2a" : "#eaeaea",
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
                <Text style={{fontSize: 17, color: !this.state.dark ? "#171717" : "#eaeaea", marginLeft: 10}}>Тёмная тема</Text>
                <Switch value={this.state.dark}
                        onValueChange={() => {
                            this.props.darkTheme(!this.state.dark);
                            this.setState({dark: !this.state.dark})}}
                        thumbColor={'white'}
                        ios_backgroundColor={!this.state.dark ? '#d4d4d4' : '#908ee4'}
                        trackColor={{false: "#d4d4d4", true: '#908ee4'}}
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
                    style={{fontSize: 17, color: !this.state.dark ? "#171717" : "#eaeaea", marginLeft: 10}}
                    onPress={() => (this.props.navigation.navigate('Cards'))}
                >Мои карты</Text>
            </View>
        );

        return (
            <View style={settingsScreenStyle}>
                <StatusBar
                    barStyle={this.state.dark ? "light-content" : "dark-content"}
                />
                <GoBackButton navigation={this.props.navigation} dark={this.state.dark}/>
                <SettingsScreenHeader dark={this.state.dark}/>
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


function mapStateToProps(state) {
    return {
        dark: state.settings.dark
    }
}

const mapDispatchToProps = {
    darkTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)