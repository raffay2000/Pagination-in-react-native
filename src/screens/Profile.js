import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Profile = ({route}) => {
  const {item} = route.params;
  const dob = new Date(item.dob.date);
  const newDate = dob.getDate();
  const newMonth = dob.getMonth() + 1;
  const newYear = dob.getFullYear();
  // dob.slice(0,15);
  return (
    <>
    <View style={styles.container}>
      <Image source={{uri: item.picture.thumbnail}} style={styles.imageStyle} />
      <Text style={styles.font}>{item.name.first}</Text>
      <Text style={styles.font}>{item.name.last}</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.font}>City : {item.location.city}</Text>
        <Text style={styles.font}>Cell No : {item.cell}</Text>
        <Text style={styles.font}>Email : {item.email}</Text>
        <Text style={styles.font}>
          Date Of Birth : {newDate}-{newMonth}-{newYear}
        </Text>
        <Text style={styles.font}>Age : {item.dob.age}</Text>
      </View>
    <View style={{marginTop:10}}>
        <Image source={{uri:item.picture.large}} style={{width:300,height:300,resizeMode:'contain',borderRadius:12}} />
    </View>
    </View>
    </>
    
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8D6',
    alignItems: 'center',
    paddingTop: 20,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  font: {
    fontSize: 20,
    color: '#6B705C',
    fontWeight: 'bold',
  },
  innerContainer: {
    backgroundColor: '#DDBEA9',
    borderRadius: 12,
    marginTop: 10,
    padding: 10,
    width: '90%',
    borderWidth: 5,
    borderColor: '#6B705C',
  },
});
