import {Image, TouchableWithoutFeedback, View} from "react-native";
import React from "react";

export class GoBackButton extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => (this.props.navigation.goBack())}>
                <Image source={this.props.dark ? require('../../img/backDark.png') : require('../../img/back.png')} style={{
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    marginTop: 57.5,
                    marginLeft: 10,
                    zIndex: 1000,
                }}/>
            </TouchableWithoutFeedback>
        );
    }
}