import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Reactotron from 'reactotron-react-native';

const io = require('socket.io-client');
Reactotron.configure({ port:9090, host:'http://192.168.90.110:19002'}).useReactNative();
var app;
export default class App extends React.Component {
  constructor(props) {
    super(props); 
    app = this;
    this.socket = io('http://192.168.90.110:3000', {jsonp: false});
    this.state={
      background: 'yellow',
      input: '...',
      notification: '',
    }
    this.socket.on('server-send-data', (data) => {
      app.setState({background: data});
    });
    this.socket.on('server-send-notification', (data) => {
      app.setState({notification: data});
    });
  }
  componentDidMount() {
    Reactotron.connect();
  } 
  clickMe = () => {
    this.socket.emit('client-send-color', this.state.input);
  }
  render() {
    console.log(this.state.notification);
    return (
      <View style={{flex: 1, padding: 50, backgroundColor: this.state.background}}>
        <TextInput
          style={{height: 40,borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({input: text})}
          value={this.state.text}
        />
        <TouchableOpacity 
          onPress={() => this.clickMe()}
          style={{height: 40,borderColor: 'gray', borderWidth: 1, marginTop: 5, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Change color</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
