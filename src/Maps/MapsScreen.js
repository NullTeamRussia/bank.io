import React from "react";
import MapView, {PROVIDER_GOOGLE}  from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { View, Text, Image, TouchableWithoutFeedback} from "react-native";
import { styles, ATMs} from "../../consts";
import {GoBackButton} from "../Shared/GoBackArrow";
import connect from "react-redux/es/connect/connect";
import ATMExtendedElement from "../Main/ATMExtendedView";

class MapsScreenFooter extends React.Component {
    render() {
        return (
            <ATMExtendedElement item={this.props.data}/>
        );
    }
}

class MapsScreen extends React.Component {
    
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            data: null,
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

    darkMapStyle = !this.props.dark ? null : [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#212121"
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#212121"
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#9e9e9e"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#bdbdbd"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#181818"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#1b1b1b"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#2c2c2c"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8a8a8a"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#373737"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#3c3c3c"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#4e4e4e"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#616161"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#757575"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#3d3d3d"
                }
            ]
        }
    ];

    componentDidMount() {
        let d = this.props.navigation.getParam("content", (<Text>Error loading data.</Text>));

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    myLat: position.coords.latitude,
                    myLong: position.coords.longitude,
                    data: d,
                });
            }
        );
    }

    render() {
        let a = this.props.navigation.getParam("content", (<Text>Error loading data.</Text>)).location;
        let b = {latitude: a.lat, longitude: a.long};
        return (
            <View style={{
                flex: 1,
            }}>
                <GoBackButton navigation={this.props.navigation}/>
                <MapView
                    ref={"mapview"}
                    customMapStyle={this.darkMapStyle}
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
                    <MapView.Marker
                            coordinate={b}
                            title={"Hello"}
                    />
                    <MapViewDirections
                        mode={"walking"}
                        origin={{
                            latitude: this.state.myLat,
                            longitude: this.state.myLong
                        }}
                        destination={{
                            latitude: this.props.navigation.getParam("content", (<Text>Error loading data.</Text>)).location.lat,
                            longitude: this.props.navigation.getParam("content", (<Text>Error loading data.</Text>)).location.long
                        }}
                        strokeWidth={3}
                        strokeColor={this.props.dark ? "#fefefe" : "#2a2a2a"}
                        apikey={"AIzaSyBOWUeXkciKNnmuOERJP_I2p65MV2c45AE"}
                    />
                </MapView>
                <View style={{
                    zIndex: 11,
                    position: "absolute",
                    height: 250,
                    width: "85%",
                    alignSelf: "center",
                    bottom: 0,
                }}>
                    <MapsScreenFooter data={this.props.navigation.getParam("content", (<Text>Error loading data.</Text>))}/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {dark: state.settings.dark}
};

export default connect(mapStateToProps)(MapsScreen);