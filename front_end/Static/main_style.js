import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  class__container: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    marginBottom: 16,
    padding: '5%',
    width: '100%',
  },
  background: {
    backgroundColor: '#aaebff',
    width: '100%',
    height: '100%',
  },
  match__background: {
    backgroundColor: '#d0faae',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  screen__header: {
    alignItems: 'center',
    padding: '5%',
    height: '10%',
  },
  text: {
    color: '#808080',
    fontSize: 14,
  },
  content__container: {
    width: '90%',
  },
  content__centering: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  response__header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  text__header: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  text__success: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 10,
  },
  answer__container: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    fontSize: 14,
    padding: 8,
  },
  multi: {
    backgroundColor: '#ffffff',
    height: 150,
    borderRadius: 6,
    fontSize: 14,
    padding: 8,
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
    padding: 8,
  },
  message__sent__text: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 37,
    height: 52,
    width: 140,
  },
  row__alignment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  big__button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 37,
    height: 52,
    width: '100%',
  },
  single__input: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    marginBottom: 16,
    padding: 8,
    width: '100%',
  },
  onboarding__background: {
      backgroundColor: '#AAEBFF',
      width: '100%',
      height: '100%',
      alignItems: 'center',
  },
  onboarding__button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      borderRadius: 37,
      height: 52,
      width: 304,
  },
  onboarding__container: {
      textAlign: 'left',
      width: '100%',
      justifyContent: 'center'
  },
  onboarding__input: {
      backgroundColor: 'rgba(255,255,255,0.7)',
      borderRadius: 20,
      marginBottom: 16,
      padding: '5%',
      width: '100%',
      height: 50
  },
});
