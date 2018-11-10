import {Image, TouchableWithoutFeedback, View} from "react-native";
import React from "react";

export class AddButton extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => (this.props.onPress())}>
                <Image source={require('../../img/add.png')} style={{
                    width: 30,
                    height: 30,
                    position: 'absolute',
                    right: 0,
                    marginTop: 50,
                    marginRight: 10,
                    zIndex: 1000,
                }}/>
            </TouchableWithoutFeedback>
        );
    }
}