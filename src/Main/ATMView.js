import {Text, View, FlatList} from "react-native";
import React from "react";
import {ATMs} from "../../consts";

class ATMElement extends React.Component {
    render() {
        return (
            <View style={{
                width: "100%",
                paddingTop: 10,
                paddingBottom: 10,
                borderBottomWidth: 0.5,
                borderBottomColor: "#cbcbcb"
            }}>
                <Text>{this.props.item.address}</Text>
            </View>
        );
    }
}

export class ATMView extends React.PureComponent {

    _renderFlatListItem = ({item, index}) => (
        <ATMElement handler={this.props.handler} item={item} index={index} state={this.state} />
    );

    _renderFooter = () => (
        <View style={{marginBottom: 30}}>
        </View>
    );
    render() {
        return (
            <FlatList
                handler={this.props.handler}
                data={ATMs}
                renderItem={this._renderFlatListItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={this._renderFooter()}
                style={{paddingRight: 30, paddingLeft: 30}}
            />
        );
    }
}