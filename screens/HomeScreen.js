import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, ActivityIndicator, ScrollView, Text, Image, TouchableOpacity, TextInput, View, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { picts, routx } from "../utilitis";


export default function DashBoard({ navigation }) {
  const [username, setusername] = useState('John Kokar');


  const [isloaded, setIsLoaded] = useState(false);
  const [user_id, setUser_id] = useState();
  const [data, setData] = useState([]);
  const [datao, setDatao] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaderro, setLoadderro] = useState(false);
  const [typin, setTypin] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [nofound, setNofound] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const checkAndFetchData = async () => {
        if (await chekingCorrection()) {
          axios.get(`${routx.Baseurl}/operateurs/`)
            .then((response) => {
              console.log(response.data);
              //setData(response.data);
              //setDatao(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          navigation.navigate('login');
        }
      };
      checkAndFetchData();
    }, [])
  );

  const chekingCorrection = async () => {
    try {
      const retrievedValue = await SecureStore.getItemAsync('befree');
      setusername(retrievedValue);
      return !!retrievedValue;
    } catch (error) {
      console.log('Error retrieving data:', error);
      return false;
    }
  };


  function Chertcha(typ) {
    if (datao) {
      let filteredData = datao.filter(s => s.client.phone.startsWith(typ, 0));
      if (filteredData.length !== 0) {
        setIsEmpty(false);
        setData(filteredData);
      } else {
        setIsEmpty(true);
        setData([]);
      }
    }
  }


  const Reloader = () => {
    setLoadderro(false);
    setLoading(true);
    //setData([]);
    //setDatao([]);

    axios.get(`${routx.Baseurl}/operateurs`).then((dat) => {
      console.log(dat.data);
      setLoading(false);

    }).catch((error) => {
      console.log(error);
      setLoadderro(true);
      setLoading(false);

    });

  }


  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
        style={"light"}
      />
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={["#000", "red"]}
          start={{ x: 0.3, y: 0.8 }}
          end={{ x: 1.2, y: 0.8 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Text style={{
              fontSize: 28,
              fontWeight: "bold",
              textTransform: "capitalize",
              color: "#e63900",
              fontStyle: "italic"
            }}>Be</Text>
            <Text style={{
              fontSize: 28,
              fontWeight: "bold",
              color: "#aaa",
              fontStyle: "italic"
            }}>free </Text>
            <TouchableOpacity style={styles.logoButton}>
              <Image source={picts.logo} resizeMode="contain" style={styles.logo} />
            </TouchableOpacity>
          </View>
          <Text style={{
            fontSize: 15,
            color: "#aaa",
          }}>{username}</Text>
        </LinearGradient>
      </View>

      <View style={styles.headerContainerReoc}>

      </View>


      <View style={{ height: 45 }} />

      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name='search' size={25} color={"#aaa"} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            onEndEditing={() => { if (typin.length < 1) { setIsEmpty(false); setData(datao); } }}
            placeholderTextColor={'#aaa'}
            placeholder={'Effectuez vos recherche ici ...'}
            value={typin} onChangeText={text => { setTypin(text); Chertcha(text); }}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <Text style={styles.appointmentListTitle}>Listes des operateurs</Text>
          <View style={styles.spacing} />

          {data.length < 1 && (
            <TouchableOpacity style={styles.emptyContainer} onPress={() => Reloader()}>
              <View style={styles.emptyOverlay} />
              {loading ? (
                <ActivityIndicator visible={loading} color="#000" size={"large"} />
              ) : (
                <Ionicons name="refresh-outline" size={50} color={loaderro ? "red" : "#000"} />
              )}
              {loaderro && <Text style={styles.errorText}>Échec de chargement</Text>}
              {!loading && !loaderro && <Text style={styles.emptyText}>Vide (actualiser)</Text>}
            </TouchableOpacity>
          )}


          {/*data.length > 0 && data.map((appoint, index) => (
            <View key={appoint._id} style={styles.appointmentCard}>
              <TouchableOpacity
                style={styles.appointmentButton}
                onPress={() => navigation.navigate("ViewOrder", { all: appoint, user_id: user_id })}
              >
                <View style={styles.appointmentHeader}>
                  <View style={styles.appointmentIndexContainer}>
                    <View style={styles.appointmentIndexLeft} />
                    <Text style={styles.appointmentIndexText}>{index + 1}</Text>
                    <View style={styles.appointmentIndexRight} />
                  </View>
                  <View style={styles.spacingHorizontal} />
                  <Text style={styles.appointmentTypeText}>
                    {appoint.services.servicetype === "SALON" ? "Au salon" : "à Domicile"}
                  </Text>
                  <Text style={styles.appointmentPhoneText}>{appoint.client.phone}</Text>
                </View>
                <View style={styles.appointmentDetails}>
                  <Text style={styles.appointmentDetailsText}>
                    Le {appoint.dete} à {appoint.heure}:00, à {appoint.client.address}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))*/}
        </ScrollView>
      </View>


      <TouchableOpacity style={
        {
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 1,
          shadowColor: '#ccc',
          elevation: 5,
          borderRadius: 15,
          position: "absolute",
          backgroundColor: "transparent",
          zIndex: 20,
          bottom: 20,
          right: 15,
        }
      }
        onPress={() => navigation.navigate("Enrôllement")}
      >

        <LinearGradient
          style={
            {
              padding: 8,
              borderRadius: 15,

            }
          }
          colors={["#6fcaea", "#99e6ae"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.5, y: 1 }}
        >

          <MaterialCommunityIcons name="note-edit" size={25} style={{ color: '#333' }} />
        </LinearGradient>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  headerContainer: {
    height: 200,
    width: "100%",
    overflow: "hidden",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center"
  },
  headerGradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  headerContainerReoc: {
    height: 50,
    width: "100%",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowColor: 'red',
    backgroundColor: "red",
    zIndex: -1,
    marginTop: -52
  },

  headerContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  logoButton: {
    height: 35,
    width: 35,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 2,
  },
  logo: {
    width: "100%",
    height: "100%",
  },

  headerDecoration: {
    height: 200,
    width: "100%",
    position: "absolute",
    top: 48,
    zIndex: 0,
  },
  decoraImage: {
    width: "100%",
    height: "100%",
    tintColor: "#D51A65",
  },
  overlayDecoration: {
    height: 200,
    width: "100%",
    position: "absolute",
    top: 48,
    zIndex: -1,
  },
  contentContainer: {
    width: "100%",
    paddingHorizontal: "3%",
  },
  searchContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: "100%",
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowColor: '#ccc',
  },
  searchIcon: {
    alignSelf: 'center',
    zIndex: 3,
    paddingLeft: 5,
  },
  searchInput: {
    paddingLeft: 12,
    backgroundColor: 'transparent',
    borderRadius: 10,
    fontSize: 17,
    height: 30,
    width: "77%",
    color: '#009de0',
  },
  scrollView: {
    height: 400,
    backgroundColor: "transparent",
    width: "100%",
    paddingVertical: 7,
    paddingHorizontal: "4%",
  },
  appointmentListTitle: {
    fontSize: 20,
    color: "#333",
  },
  spacing: {
    height: 10,
  },
  emptyContainer: {
    height: 200,
    width: 300,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 20,
  },
  emptyOverlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#99e6ae",
    opacity: 0.6,
    borderRadius: 20,
  },
  errorText: {
    fontSize: 20,
    color: '#ff0000',
    alignSelf: "center",
    fontWeight: "400",
  },
  emptyText: {
    fontSize: 20,
    color: '#000',
    fontWeight: "400",
    alignSelf: "center",
  },
  appointmentCard: {
    borderRadius: 12,
    elevation: 3,
    width: "97%",
    padding: 15,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  appointmentButton: {
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  appointmentHeader: {
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appointmentIndexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appointmentIndexLeft: {
    width: "75%",
    backgroundColor: "#bd177d",
    height: 15,
    bottom: -3,
    opacity: 0.7,
    borderRadius: 7,
    alignSelf: "flex-start",
  },
  appointmentIndexText: {
    fontSize: 18,
    color: "#99e6ae",
    fontWeight: "bold",
    position: "absolute",
    top: 0,
  },
  appointmentIndexRight: {
    width: "75%",
    backgroundColor: "#bd177d",
    height: 15,
    top: -3,
    borderRadius: 7,
    opacity: 0.4,
    elevation: 5,
    alignSelf: "flex-end",
  },
  spacingHorizontal: {
    width: 20,
  },
  appointmentTypeText: {
    fontSize: 15,
    color: "#009de0",
  },
  appointmentPhoneText: {
    fontSize: 15,
    color: "#aaaaaa",
    fontWeight: "bold",
  },
  appointmentDetails: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  appointmentDetailsText: {
    fontSize: 14,
    color: "#ccc",
    fontWeight: "400",
  },
});
