import React from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {styles, addr} from "../../consts";


class ListImages extends React.PureComponent {
    render() {
        return (
                <View
                    shadowRadius={2}
                    shadowOffset={{width: 0, height: 5}}
                    shadowColor={"#111111"}
                    shadowOpacity={0.113}
                    style={styles.bgBox}
                >
                    <TouchableWithoutFeedback onPress={() => this.props.handler(this.props.item, "imageInfo")} style={{height: '100%', width: '100%'}}>
                        <View style={{
                            height: 150,
                            width: 200,
                        }}>
                            <View style={{flex: 2, borderTopLeftRadius: 8, borderTopRightRadius: 8, overflow: 'hidden'}}>
                                <Image source={{uri: this.props.item.urls.small}} style={styles.bg}/>
                            </View>
                            <View style={{
                                flex: 1,
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                paddingTop: 10,
                                paddingLeft: 10
                            }}>
                                <Text style={{color: "#272727", fontWeight: "bold"}}>
                                    {this._prettify(this.props.item.description)}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
        );
    }

    _prettify(str) {
        if (str)
            if (str.length > 47)
                return str[0].toUpperCase() + str.substr(1, 44) + "...";
            else
                return str[0].toUpperCase() + str.substr(1, str.length - 1);
        else
            return "Beautiful image";
    }
}

export class Imgs extends React.Component {

    constructor(props){
        super(props);
        this.state = {loaded: false};
        // this._pressed = this._pressed.bind(this);
    }

    _renderFlatListItem = ({item, index}) => (
        <ListImages handler={this.props.handler} item={item} index={index} state={this.state} />
    );

    _renderFooter = () => (
        <View style={{marginRight: 30}}>
        </View>
    );

    render() {
        if (!this.props.state.loaded) {
            return (
                <View style={styles.imgList}>
                    <ActivityIndicator style={{marginTop: -40}}/>
                </View>
            );
        } else
            return (
                <View style={styles.imgList}>
                    <FlatList
                        handler={this.props.handler}
                        data={this.props.state.data}
                        renderItem={this._renderFlatListItem}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ListFooterComponent={this._renderFooter()}
                    />
                </View>
            );
    }

}