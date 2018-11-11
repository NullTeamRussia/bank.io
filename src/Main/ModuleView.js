import React from "react";
import {Text, View} from "react-native";
import {Imgs} from "./Imgs";
import {ATMs, styles} from "../../consts";
import {MultiSelectList, MyListItem} from "./MainScreen";
import ATMView from "./ATMView";


class MyModuleContent extends React.PureComponent {
    render() {
        return (
            <View>
                <ATMView data={this.props.content} handler={this.props.handler} />
            </View>
        );
    }
}

class TitleContent extends React.Component {
    render() {
        return (
            <Text style={{
                fontWeight: "bold",
                fontSize: 25,
                paddingLeft: 20,
                paddingBottom: 10,
                marginBottom: 15,
                marginTop: 15,
                color: this.props.color ? this.props.color : '#000000'
            }}>
                {this.props.title}
            </Text>
        );
    }
}

export class ModuleView extends React.Component {
    constructor(props) {
        super(props);
        // this.setState({
        //     popupDisplay: 'block',
        // });
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.color ? this.props.color : "#efefef"
            }}>
                <TitleContent title={this.props.title} color={this.props.titleColor}/>
                <MyModuleContent
                    handler={this.props.handler}
                    content={this.props.content}
                    title={this.props.title}
                    color={this.props.color}
                    state={this.props.state}
                    {...this.props.state}
                />
            </View>
        );
    }
}