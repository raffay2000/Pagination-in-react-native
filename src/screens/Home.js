import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [dataOfApi, setDataOfApi] = useState([]);
  const [page, setPage] = useState(1);
  var apiData = () => {
    fetch(`https://randomuser.me/api/?results=10&page=${page}`)
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        setDataOfApi([...dataOfApi, ...responseJson.results]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    apiData();
  }, [page]);
  return (
    <View style={styles.container}>
      <Text style={styles.fontStyle}>App</Text>
      <FlatList
        data={dataOfApi}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          setPage(page + 1);
        }}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>{
            navigation.navigate('Profile',{item})
          }}>
            <View
              style={{
                marginTop: 10,
                padding: 20,
                backgroundColor: '#D4A373',
                borderRadius: 12,
                borderWidth: 5,
                borderColor: '#CCD5AE',
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image
                  source={{uri: item?.picture.thumbnail}}
                  style={{width: 50, height: 50, borderRadius: 100}}
                />
                <Text style={styles.fontStyle}>
                  {item?.name.title} {item?.name.first} {item?.name.last}
                </Text>
              </View>
              <View style={styles.innerBox}>
                <Text style={styles.city}>City : {item?.location.city}</Text>
                <Text style={styles.city}>Cell No : {item?.cell}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEFAE0',
    width: '100%',
    height: height,
  },
  fontStyle: {
    fontSize: 20,
    color: '#FEFAE0',
  },
  city: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FEFAE0',
    marginTop: 12,
  },
  innerBox: {
    backgroundColor: '#CCD5AE',
    borderRadius: 12,
    marginTop: 10,
    padding: 10,
  },
});
