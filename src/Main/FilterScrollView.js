import React from "react";
import {Alert, FlatList, Text, TouchableWithoutFeedback, View} from "react-native";
import connect from "react-redux/es/connect/connect";

export class FilterElement extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const miniLogoStyles = {
            borderRadius: 16,
            height: 32,
            justifyContent: 'center',
            alignItems:"center",
            borderWidth: 1.5,
            borderColor: "#18f",
            marginLeft: 15,
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 5,
        };

        const textColor = this.props.selected ? (this.props.dark ? "#2a2a2a" : "#fff") : "#18f";
        const bgColor = this.props.selected ? "#18f" : (this.props.dark ? "#2a2a2a" : "#fff");
        return (
            <TouchableWithoutFeedback onPress={this._onPress}>
                <View style={{...miniLogoStyles, backgroundColor: bgColor}}>
                    <Text style={{ color: textColor }}>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

class FilterScrollView extends React.PureComponent {
    state = {
        sberbank: this.props.sberbank,
        tinkoff: this.props.tinkoff,
        vtb: this.props.vtb,
        cashless: this.props.cashless,
        getMoney: this.props.getMoney,
    };

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => (
        <FilterElement
            dark={this.props.dark}
            id={item.id}
            onPressItem={(id) => {
                this.props.changeSettings({key: id, value: this.props[id]});
                let a = {};
                a[id] = !this.state[id];
                this.setState(a);
            }}
            selected={this.state[item.id]}
            title={item.title}
        />
    );

    _renderFooter = () => (
        <View style={{marginRight: 15}}>
        </View>
    );


    render() {
        return (
            <FlatList
                horizontal={true}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                data={this.props.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                keyboardShouldPersistTaps={'handled'}
                ListFooterComponent={this._renderFooter()}
            />
        );
    }
}

const changeSettings = (a) => {
    return {
        type: "CHANGE",
        payload: a
    }
}

const mapDispatchToProps = {
    changeSettings
}

const mapStateToProps = (state) => {
    return {
        dark: state.settings.dark,
        sberbank: state.filters.sberbank,
        tinkoff: state.filters.tinkoff,
        vtb: state.filters.vtb,
        cashless: state.filters.cashless,
        getMoney: state.filters.getMoney,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterScrollView);