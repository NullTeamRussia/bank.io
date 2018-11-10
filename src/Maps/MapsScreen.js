import React from "react";
import MapView, {PROVIDER_GOOGLE}  from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { View, Text, Image, TouchableWithoutFeedback} from "react-native";
import { styles, ATMs} from "../../consts";
import {GoBackButton} from "../Shared/GoBackArrow";

class MapsScreenFooter extends React.Component {
    render() {
        const miniLogoStyles = {
            borderRadius: 6,
            overflow: 'hidden',
            height: 24,
            width: 49,
            justifyContent: 'center',
            alignItems:"center",
            backgroundColor:"rgb(50,50,50)",
            marginRight: 13,
        };

        const miniVisaLogo = (
            <View style={miniLogoStyles}>
                <Image source={require('../../img/visa.png')} style={{height: 17, width: 38}} />
            </View>
        );
        const miniMCLogo = (
            <View style={miniLogoStyles}>
                <Image source={require('../../img/mastercard.png')} style={{height: 17, width: 38}} />
            </View>
        );

        return (
            <View style={{
                position: 'absolute',
                height: 58,
                width: '100%',
                bottom: 0,
                justifyContent: 'center',
                paddingLeft: 20,
                borderTopWidth: 1,
                borderTopColor: '#bfbfbf',
            }}>
                <View style={{
                    flexDirection: "row",
                }}>
                    {miniVisaLogo}
                    {miniMCLogo}
                </View>
                <View style={{
                    position: 'absolute',
                    right: 0,
                    height: '100%',
                    width: 120,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#6d8efe',
                }}>
                    <Text style={{color:'#eff', fontWeight: 'bold'}}>10 минут</Text>
                </View>
            </View>
        );
    }
}

export class MapsScreen extends React.Component {
    
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            myLong: 1,
            myLat: 2,
            markers: [{
                title: 'hello',
                coordinates: {
                    latitude: 37.78825, 
                    longitude: -122.4324
                },
            },
            {
                title: 'hello',
                coordinates: {
                    latitude: 37.787,
                    longitude: -122.431
                },  
            }]
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    myLat: position.coords.latitude,
                    myLong: position.coords.longitude,
                });
            }
        );
    }

    render() {
        return (
            <View style={{
                flex: 1,
            }}>
                <GoBackButton navigation={this.props.navigation}/>
                <MapView
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                    initialRegion={{
                        latitude: 59.937013,
                        longitude: 30.313668,
                        latitudeDelta: 0.0522,
                        longitudeDelta: 0.0121,
                }}>
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinates}
                            title={marker.title}
                        />
                    ))}
                    <MapViewDirections
                        origin={{
                            latitude: this.state.myLat,
                            longitude: this.state.myLong
                        }}
                        destination={{
                            latitude: ATMs[1].location.lat,
                            longitude: ATMs[1].location.long
                        }}
                        strokeWidth={3}
                        apikey={"AIzaSyBOWUeXkciKNnmuOERJP_I2p65MV2c45AE"}
                    />
                </MapView>
                <View style={{
                    zIndex: 11,
                    position: "absolute",
                    height: 250,
                    width: "100%",
                    bottom: 0,
                    backgroundColor: "#eaeaea",
                }}>
                    {this.props.navigation.getParam("content", (<Text>Error loading data.</Text>))}
                    <MapsScreenFooter/>
                </View>
            </View>
        );
    }
}