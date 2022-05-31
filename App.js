import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
const {width, height} = Dimensions.get('window');

const App = () => {
  const [dataOfApi, setDataOfApi] = useState([]);
  const [page, setPage] = useState(1);
  var apiData = () => {
    fetch(`https://randomuser.me/api/?results=10&page=${page}`)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
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
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          setPage(page + 1);
        }}
        renderItem={({item}) => (
          <View
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: '#FFD8BE',
              borderRadius: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderWidth:2,
              borderColor:"#B8B8FF"
              }}
            >
              <View style={{ backgroundColor:"#FFEEDD",width:50,height:50,borderRadius:100}}/>
            <Text style={styles.fontStyle}>
              {item?.name.first} {item?.name.last}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffeedd',
    width: '100%',
    height: height,
  },
  fontStyle: {
    fontSize: 20,
    color: '#9381FF',
  },
});
