import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  criptomoneda,
  guardaCriptoMoneda,
  guardaMoneda,
  consultarAPI,
}) => {
  const [criptomonedas, guardaCriptoMonedas] = useState([]);

  const getMoneda = a => {
    guardaMoneda(a);
  };

  const getCriptoMoneda = a => {
    guardaCriptoMoneda(a);
  };

  useEffect(() => {
    const consultaAPI = async () => {
      const url =
        'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const response = await axios.get(url);
      guardaCriptoMonedas(response.data.Data);
    };
    consultaAPI();
  }, []);

  const cotizarPrecio = () => {
    
    if (moneda.trim() === '' || criptomoneda.trim() === '') {
      mostrarAlerta();
      return;
    }
    consultarAPI(true);
   
  };

  const mostrarAlerta = () => {
    Alert.alert('Error...', 'Todos los campos son obligatorios', [
      {
        text: 'OK',
      },
    ]);
  };

  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
        itemStyle={{height: 120}}
        selectedValue={moneda}
        onValueChange={moneda => getMoneda(moneda)}>
        <Picker.Item label="Seleccione" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Argentino" value="ARS" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
      <Picker
        itemStyle={{height: 120}}
        selectedValue={criptomoneda}
        onValueChange={criptomoneda => getCriptoMoneda(criptomoneda)}>
        <Picker.Item label="Seleccione" value="" />

        {criptomonedas.map(data => (
          <Picker.Item
            key={data.CoinInfo.Id}
            label={data.CoinInfo.FullName}
            value={data.CoinInfo.Name}
          />
        ))}
      </Picker>
      <TouchableHighlight
        style={styles.btncotizar}
        onPress={() => cotizarPrecio()}>
        <Text style={styles.textocotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
    marginLeft: 15,
  },
  btncotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
  },
  textocotizar: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Formulario;
