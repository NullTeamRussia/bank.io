import {StyleSheet} from "react-native";

export const addr = "https://api.unsplash.com/photos/random?count=10&client_id=" + "dcd8d89b0dc25dfca3498a968214fac1d767dea3be8ae82f3aba8b51a0b5157f";

export const ATMs = [
    {
        address: "Карла Маркса, 12/34",
        location: {
            lat: 59.939152,
            long: 30.317912,
        },
        currency: ["RUB", "DOLL", "EUR"],
        type: "atm",
        banks: [
            {
                bank: "sberbank",
                nalog: 0
            },
            {
                bank: "tinkoff",
                nalog: 15
            },
        ],
        bank: "sberbank",
        providers: ["visa", "mastercard", "ae", "mir"],
        custom: [
            "nfc"
        ],
        workingHours: "Открыто с 15:00 до 22:00",
        available: false
    },
    {
        address: "Площадь Революции, 13/37",
        location: {
            lat: 59.935756,
            long: 30.315014,
        },
        currency: ["RUB"],
        type: "magaz",
        banks: [
            {
                bank: "sberbank",
                nalog: 0
            },
            {
                bank: "tinkoff",
                nalog: 0
            },
        ],
        providers: ["visa", "mastercard", "mir"],
        custom: [
            "nfc",
            "cashless"
        ],
        workingHours: "Открыто круглосуточно",
        available: true,
    },
];

export const styles = StyleSheet.create({
    coreContainer: {
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