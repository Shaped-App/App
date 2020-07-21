import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    bar: {
        marginTop: 16,
        borderTopColor: '#808080',
        borderTopWidth: 0.5
    },
    notification: {
        backgroundColor: '#ff7777',
        borderRadius: 12,
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    notification__number: {
        color: '#ffffff',
        fontSize: 16
    },
    incoming__header: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    message__background: {
        backgroundColor: '#aaebff',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    align__row: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});