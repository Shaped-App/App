import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    class__container: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        marginBottom: 16,
        padding: '5%',
        width: '100%'
    },
    text: {
        color: '#808080',
        fontSize: 14,
    },
    response__header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },
    text__header: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600'
    },
    username: {
        fontSize: 16,
        marginLeft: 16
    },
    answer__container: {
        backgroundColor: '#ffffff',
        borderRadius: 6,
        fontSize: 14,
        padding: 8
    },
    multi: {
        backgroundColor: '#ffffff',
        height: 150,
        borderRadius: 6,
        fontSize: 14,
        padding: 8
    },
    send__button: {
        zIndex: 2,
        bottom: 16,
        right: 16,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'lightgray',
        flex: 1,
        borderRadius: 15,
        width: 30,
        height: 30,
    },
    message__sent: {
        backgroundColor: '#89cf50',
        borderRadius: 6,
        padding: 8
    },
    message__sent__text: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold'
    }
});