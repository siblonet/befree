import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, ActivityIndicator, ScrollView, Text, Image, TouchableOpacity, TextInput, View, Alert, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { picts, routx } from "../utilitis";

const datoo = [
  {
    "annee_inspection_interne": 2023,
    "annee_naissance": 1980,
    "croissance_recolte": 0,
    "district": {
      "description": null,
      "id": 1,
      "name": "GAGNOA "
    },
    "estimation_totale_recolte": 1314,
    "estimation_travailleurs_temporaires": 0,
    "genre": "f",
    "genre_proprietaire_exploitation": "",
    "id": 1,
    "identifiant_interne_exploitation": "GA-BIA-001",
    "identifiant_national_exploitation": "",
    "identifiant_unite_agricole": "GA-BIA-001 P1 ",
    "inspecteur": {
      "description": null,
      "id": 1,
      "name": "YAO N'GUESSAN LAMBERT "
    },
    "jour_inspection_interne": 2,
    "latitute": "6.358055",
    "localite": {
      "description": null,
      "id": 1,
      "name": "BIAKOU"
    },
    "longitude": "-5.829862",
    "mois_inspection_interne": 8,
    "nom": "KOUSSI ",
    "nom_proprietaire_exploitation": "",
    "nombre_culture_certifiees": 2023,
    "nombre_travailleurs_permanents": 0,
    "nombre_unite_agricole": 1,
    "numero_etat_civil": null,
    "numero_identification_national": "C 0087 9636 26",
    "numero_identification_national_proprietaire_exploitation": "",
    "numero_piece_identite": "",
    "numero_securite_sociale": "",
    "numero_telephone": "07-48-38-44-98",
    "numero_telephone_proprietaire_exploitation": "",
    "prenom": "AKISSI CHANTAL",
    "prenom_proprietaire_exploitation": "",
    "produit_agricole": 1,
    "recolte_totale_annee_precedente": 1312,
    "region_inspection": {
      "description": null,
      "id": 1, "name": "GOH"
    },
    "rendement": 1,
    "rendement_annee_precedente": 1,
    "superficie_exploitation": 2.51,
    "superficie_produits_agricoles": 2.51,
    "superficie_unite_agricole": 2.51,
    "type_exploitation_agricole": "petite",
    "variete_produit_agricole": "",
    "verification_latitute": "=IF(D3=0,\"\",D3)",
    "verification_longitude": "=IF(E3=0,\"\",E3)",
    "volume_vendu": 0
  }
]


export default function DashBoard({ navigation }) {
  const [username, setusername] = useState('');


  const [data, setData] = useState([]);
  const [datao, setDatao] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaderro, setLoadderro] = useState(false);
  const [typin, setTypin] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [loged, setLoged] = useState(false);
  //npx expo install expo-splash-screen expo-system-ui react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens react-native-svg




  useFocusEffect(
    useCallback(() => {
      const checkAndFetchData = async () => {
        if (await chekingCorrection()) {
          axios.get(`${routx.Baseurl}/operateurs/`)
            .then((response) => {
              setData(response.data.results);
              setDatao(response.data.results);
              expirationService()
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
    if (datao) {
      let filteredData = datao.filter(s => s.nom.startsWith(typ, 0));
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
    setData([]);
    setDatao([]);

    axios.get(`${routx.Baseurl}/operateurs/`).then((response) => {
      setData(response.data.results);
      setDatao(response.data.results);
      setLoading(false);

    }).catch((error) => {
      console.log(error);
      setLoadderro(true);
      setLoading(false);

    });

  }


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
                placeholder={'Recherche par nom ici ...'}
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


              {data.length > 0 && data.map((enro, index) => (
                <View key={enro.id} style={styles.appointmentCard}>
                  <TouchableOpacity
                    style={styles.appointmentButton}
                    onPress={() => navigation.navigate("Détails", { enrol: enro })}
                  >
                    <View style={styles.appointmentHeader}>
                      <Text style={{ color: "#aaa" }}>{index + 1}</Text>

                      <Text style={styles.appointmentPhoneText}>{enro.nom} {enro.prenom}</Text>
                    </View>

                    <View style={styles.spacingHorizontal} />

                    <View style={styles.appointmentDetails}>
                      <Text style={styles.appointmentDetailsText}>
                        {enro.district.name} - {enro.inspecteur.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
              <View style={{height: 150}}/>
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
        </>
        :
        <View style={
          {
            height: "100%",
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center"

          }
        }>

          <View style={
            {
              height: "50%",
              width: "90%",
              overflow: "hidden",
            }
          }>
            <Image source={picts.logo} resizeMode="contain" style={styles.logo} />

            <View style={
              {
                position: "absolute",
                bottom: 20,
                width: '100%',
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }
            }>
              <Text style={{ color: 'red', fontStyle: "italic", fontWeight: "bold", fontSize: 32 }}>Be</Text>
              <Text style={{ color: '#aaa', fontStyle: "italic", fontWeight: "bold", fontSize: 32 }}>free</Text>
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
