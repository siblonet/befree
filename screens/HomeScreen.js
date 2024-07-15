import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, ActivityIndicator, ScrollView, Text, Image, TouchableOpacity, TextInput, View, Alert, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { picts, routx } from "../utilitis";


export default function DashBoard({ navigation }) {
  const [username, setusername] = useState('');


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaderro, setLoadderro] = useState(false);
  const [typin, setTypin] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [loged, setLoged] = useState(false);
  const [lengtho, setLengtho] = useState(0);
  const [isCherching, setIsCherching] = useState(true);

  //npx expo install expo-splash-screen expo-system-ui react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens react-native-svg




  useFocusEffect(
    useCallback(() => {
      const checkAndFetchData = async () => {
        if (await chekingCorrection()) {
          axios.get(`${routx.Baseurl}/BefreeAgriculter/getAllBefreeAgrulter/0/100`)
            .then((agri) => {
              //console.log(agri.data.agrilength);
              setLengtho(agri.data.agrilength);
              setLoading(false);
              setLoadderro(false)
              expirationService()
            })
            .catch((error) => {
              setLoadderro(true)
              setLoading(false);
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

  const expirationService = async () => {
    const date = new Date();
    const currentMonth = date.getMonth();
    const yeahpe = await SecureStore.getItemAsync('befreeends');
    if (yeahpe) {
      const yeahpermi = yeahpe.split("-");
      if (currentMonth <= parseInt(yeahpermi[0]) && yeahpermi[1] === "2024") {
        setLoged(true)
      } else {
        setLoged(false)
      }
    } else {
      setLoged(false)

    }

  };


  function Chertcha(typ) {
    if (typ.length > 9) {
      setTypin("en cours...");
      setIsCherching(false);
      axios.get(`${routx.Baseurl}/BefreeAgriculter/ByIdItergetBefreeAgrulter/${typ}`)
        .then((agri) => {
          //console.log(agri.data);
          if (agri.data) {
            setData([agri.data]);
            setIsCherching(true);
            setIsEmpty(false);
            setTypin(typ);
          } else {
            setIsEmpty(true);
            setData([]);
            setIsCherching(true);
            setTypin(typ);
          }
        })
        .catch((error) => {
          console.error(error);
          setIsEmpty(true);
          setData([]);
          setLengtho(0);
          setIsCherching(true);
          setTypin(typ);
        });
    }
  }



  const Reloader = () => {
    setLoadderro(false);
    setLoading(true);
    setData([]);

    axios.get(`${routx.Baseurl}/BefreeAgriculter/getAllBefreeAgrulter/0/100`).then((agri) => {
      setLengtho(agri.data.agrilength);
      setLoading(false);

    }).catch((error) => {
      console.log(error);
      setLoadderro(true);
      setLoading(false);
    });

  }

  async function Disconnect_me() {
    Alert.alert(
      "Deconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter?",
      [
        {
          text: 'Non',
          onPress: () => console.log('Non pressed'),
          style: 'cancel',
        },
        {
          text: 'Oui',
          onPress: async () => {
            try {
              await SecureStore.deleteItemAsync('befree');
              await SecureStore.deleteItemAsync('befreeends');
              navigation.navigate('login');
            } catch (error) {
              console.log('Error retrieving data:', error);
            }
          },
        },
      ]
    );
  };




  return (
    <View style={styles.container}>
      {loged ?
        <>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
            style={"light"}
          />
          <View style={styles.headerContainer}>
            <LinearGradient
              colors={["#80ac06", "#018346"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 0.3, y: 1.5 }}
              style={styles.headerGradient}
            >
              <View style={styles.headerContent}>
                <TouchableOpacity style={styles.logoButton}>
                  <Image source={picts.agricolea} resizeMode="contain" style={styles.logo} />
                </TouchableOpacity>

                <View style={{ height: "100%", justifyContent: "center", backgroundColor: "transparent", height: 32 }}>
                  <View style={{ flexDirection: "row", backgroundColor: "transparent", bottom: -7 }}>
                    <Text style={{
                      fontSize: 28,
                      color: "#02b15f",
                      fontWeight: "bold",
                      backgroundColor: "transparent"
                    }}>Befree</Text>
                    <Text style={{
                      fontSize: 28,
                      color: "rgb(148, 199, 7)",
                      fontWeight: "bold",
                      backgroundColor: "transparent"
                    }}>Volet</Text>
                  </View>
                  <Text style={{ color: "rgb(148, 199, 7)", fontWeight: "bold", fontSize: 28, backgroundColor: "transparent", top: -7 }}>Agriculture</Text>
                </View>
              </View>
              <Text style={{
                fontSize: 15,
                color: "#eee",
              }}>{username}</Text>

              <TouchableOpacity style={{
                padding: 10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }} onPress={() => Disconnect_me()}>
                <Text style={{ fontStyle: "italic", color: "#aaa" }}>Deconnexion</Text>
                <Ionicons name="chevron-forward-circle-outline" size={15} color={"#eee"} style={styles.searchIcon} />
              </TouchableOpacity>

            </LinearGradient>
          </View>

          <View style={styles.headerContainerReoc}>

          </View>


          <View style={{ height: 20 }} />

          <View style={styles.contentContainer}>
            <View style={styles.searchContainer}>
              <Ionicons name='search' size={25} color={"#aaa"} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                onEndEditing={() => { if (typin.length < 1) { setIsEmpty(false); setData([]); } }}
                placeholderTextColor={'#aaa'}
                placeholder={'Recherche par nom ici ...'}
                editable={isCherching}
                value={typin} onChangeText={text => { setTypin(text); Chertcha(text); }}
              />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
              <View style={styles.spacing} />

              {lengtho < 1 || loaderro || isEmpty && (
                <TouchableOpacity style={styles.emptyContainer} onPress={() => Reloader()}>
                  <View style={styles.emptyOverlay} />
                  {loading ? (
                    <ActivityIndicator visible={loading} color="#000" size={"large"} />
                  ) : (
                    <Ionicons name={isEmpty ? "search" : "refresh-outline"} size={50} color={loaderro ? "red" : "#000"} />
                  )}
                  {loaderro && <Text style={styles.errorText}>Échec de chargement</Text>}
                  {!loading && !loaderro && !isEmpty && <Text style={styles.emptyText}>Vide (actualiser)</Text>}
                  {!loading && !loaderro && isEmpty && <Text style={styles.emptyText}>{typin} N'e exist pas !</Text>}
                </TouchableOpacity>
              )}



              {data.length > 0 && data.map((enro, index) => (
                <View key={enro._id} style={styles.appointmentCard}>
                  <TouchableOpacity
                    style={styles.appointmentButton}
                    onPress={() => navigation.navigate("Option sur Opérateur", { enrol: enro })}
                  >
                    <View style={styles.appointmentHeader}>
                      <Text style={{ color: "#aaa" }}>{index + 1}</Text>

                      <Text style={styles.appointmentPhoneText}>{enro.nom} {enro.prenom}</Text>
                    </View>

                    <View style={styles.spacingHorizontal} />

                    <View style={styles.appointmentDetails}>
                      <Text style={styles.appointmentDetailsText}>
                        Tél: {enro.numero_telephone}
                      </Text>
                      <Text style={styles.appointmentDetailsText}>
                        Coop: {enro.cooperative.nom ? enro.cooperative.nom : "Be Free"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}

              {lengtho > 0 && !loaderro && !isEmpty && (
                <TouchableOpacity style={styles.emptyContainer}>
                  <View style={styles.emptyOverlay} />
                  <Ionicons name="people-circle-outline" size={50} color="#000" />
                  <Text style={styles.emptyText}>{lengtho} Agriculteur{lengtho > 1 ? "s" : ""} - (RIA-ASCA)</Text>
                </TouchableOpacity>
              )}
              <View style={{ height: 150 }} />
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
            onPress={() => navigation.navigate("Enrollement")}
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
        </>
        :
        <View style={
          {
            height: "100%",
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff"

          }
        }>

          <View style={[styles.headerContent, { width: "90%", height: "50" }]}>
            <TouchableOpacity style={styles.logoButton}>
              <Image source={picts.agricolea} resizeMode="contain" style={styles.logo} />
            </TouchableOpacity>

            <View style={{ height: "100%", justifyContent: "center", backgroundColor: "transparent", height: 32 }}>
              <View style={{ flexDirection: "row", backgroundColor: "transparent", bottom: -7 }}>
                <Text style={{
                  fontSize: 28,
                  color: "#02b15f",
                  fontWeight: "bold",
                  backgroundColor: "transparent"
                }}>Befree</Text>
                <Text style={{
                  fontSize: 28,
                  color: "rgb(148, 199, 7)",
                  fontWeight: "bold",
                  backgroundColor: "transparent"
                }}>Volet</Text>
              </View>
              <Text style={{ color: "rgb(148, 199, 7)", fontWeight: "bold", fontSize: 28, backgroundColor: "transparent", top: -7 }}>Agriculture</Text>
            </View>
          </View>

          <View>
            <ActivityIndicator visible={loading} color="#000" size={"large"} />
          </View>

        </View>
      }
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
    justifyContent: "center",
  },
  headerGradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "7%"
  },

  headerContainerReoc: {
    height: 50,
    width: "100%",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowColor: '#80ac06',
    backgroundColor: "#80ac06",
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
    height: 70,
    width: 60,
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
    height: Dimensions.get("window").height * 0.7,
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
    textAlign: "center"
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

  spacingHorizontal: {
    width: '100%',
    height: 2,
    backgroundColor: "#eee",
    marginVertical: 5
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  appointmentDetailsText: {
    fontSize: 14,
    color: "#ccc",
    fontWeight: "400",
  },
});
