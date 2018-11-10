import {StyleSheet} from "react-native";

export const addr = "https://api.unsplash.com/photos/random?count=10&client_id=" + "dcd8d89b0dc25dfca3498a968214fac1d767dea3be8ae82f3aba8b51a0b5157f";
export const styles = StyleSheet.create({
    coreContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        /* remove in production */
        // paddingTop: 25,
    },
    search: {
        margin: 30,
        marginTop: 55,
        paddingLeft: 20,
        height: 40,
        backgroundColor: '#ffffff',
    },
    bg: {
        flex: 1,
        height: 150,
        width: 200,
    },
    bgBox: {
        borderRadius: 8,
        backgroundColor: "#fefefe",
        marginLeft: 30,
        height: 150,
        width: 200,
        zIndex: 10,
    },
    imgList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
    },
    searchView: {

    },
    searchViewExt: {
        flex: 1,
        backgroundColor: "#ffffff",
        zIndex: 10
    },
    popupWindow: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: "#ffffff",
        zIndex: 1000,
        display: "none"
    }
});