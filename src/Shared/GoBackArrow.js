import {Image, TouchableWithoutFeedback, View} from "react-native";
import React from "react";

export class GoBackButton extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => (this.props.navigation.goBack())}>
                <Image source={require('../../img/arrow_back.png')} style={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    marginTop: 50,
                    marginLeft: 10,
                    zIndex: 1000,
                }}/>
            </TouchableWithoutFeedback>
        );
    }
}