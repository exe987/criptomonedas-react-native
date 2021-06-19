import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

const App = () => {
  const [moneda, guardaMoneda] = useState('');
  const [criptomoneda, guardaCriptoMoneda] = useState('');
  const [consultaAPI, consultarAPI] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultaAPI) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const response = await axios.get(url);
        guardarCargando(true);
        setTimeout(() => {
          guardarResultado(response.data.DISPLAY[criptomoneda][moneda]);
          consultarAPI(false);
          guardarCargando(false);
        }, 2000);
      }
    };
    cotizarCriptomoneda();
  }, [consultaAPI]);

  const loader = cargando ? (
    <ActivityIndicator size="large" color="#5E49E2" />
  ) : (
    <Cotizacion resultado={resultado} />
  );

  return (
    <ScrollView>
      <View>
        <Header />
      </View>
      <View>
        <Image
          style={styles.image}
          source={require('./assets/img/criptomonedas.png')}
        />
      </View>
      <View>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          guardaMoneda={guardaMoneda}
          guardaCriptoMoneda={guardaCriptoMoneda}
          consultarAPI={consultarAPI}
        />
      </View>
      <View style={{marginTop: 40}}>{loader}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
    resizeMode: 'contain',
  },
});

export default App;
