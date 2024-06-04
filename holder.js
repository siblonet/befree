import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Platform, ActivityIndicator, Dimensions, ScrollView, Text, View, Image, TouchableOpacity, TextInput, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { picts, routx } from "../utilitis";


export default function DashBoard({ navigation }) {
  const [isloaded, setIsLoaded] = useState(false);
  const [token, setToken] = useState();
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
      // Add your code here for focus effect
    }, [])
  );

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

  async function Log_Me_Out() {
    Alert.alert(
      "Deconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter?",
      [
        { text: 'Non', onPress: () => console.log('Non pressed'), style: 'cancel' },
        { text: 'Oui', onPress: async () => { /* Add your logout code here */ } },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"  // Set to "dark-content" for dark text on light background
        backgroundColor="transparent" // Make the status bar background transparent
        translucent={true} // Ensure the status bar overlays the content
      />
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={["#411d49", "#ffbb28", "#b41578", "#99e6ae", "#009de0", "#009de0"]}
          start={{ x: 0.0, y: 1.0 }}
          end={{ x: 1.0, y: 1.5 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerSpacer} />
          <View style={styles.headerContent}>
            <TouchableOpacity style={styles.logoButton} onPress={() => navigation.navigate("Profile")}>
              <Image source={picts.logo} resizeMode="contain" style={styles.logo} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Operateur Agricole</Text>
          </View>
          <View style={styles.headerDecoration}>
            <Image source={picts.decora} resizeMode="stretch" style={styles.decoraImage} />
          </View>
        </LinearGradient>
      </View>
      <View style={styles.overlayDecoration}>
        <Image source={picts.decora} resizeMode="stretch" style={styles.decoraImage} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name='search' size={25} color={"#aaa"} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            onEndEditing={() => { if (typin.length < 1) { setIsEmpty(false); setData(datao); } }}
            placeholderTextColor={'#aaa'}
            placeholder={'Cherchez avec numéro de tél'}
            value={typin} onChangeText={text => { setTypin(text); Chertcha(text); }}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <Text style={styles.appointmentListTitle}>Listes des rendez-vous</Text>
          <View style={styles.spacing} />
          {data.length < 1 && (
            <TouchableOpacity style={styles.emptyContainer} onPress={() => Reloader()}>
              <View style={styles.emptyOverlay} />
              {loading ? (
                <ActivityIndicator visible={loading} color="#000" size={"large"} />
              ) : (
                <Ionicons name="refresh-outline" size={50} color="#000" />
              )}
              {loaderro && <Text style={styles.errorText}>Échec de chargement</Text>}
              {!loading && !loaderro && <Text style={styles.emptyText}>Vide (actualiser)</Text>}
            </TouchableOpacity>
          )}
          {data.length > 0 && data.map((appoint, index) => (
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
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  headerContainer: {
    height: 150,
    width: "100%",
    overflow: "hidden",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  headerGradient: {
    height: "100%",
    width: "100%",
  },
  headerSpacer: {
    height: 35,
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
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 2,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "400",
    textTransform: "capitalize",
    color: "#fff",
    fontFamily: "Great_Vibes",
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
    height: 40,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowColor: '#201d1d',
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
    fontFamily: "Great_Vibes",
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
    fontFamily: "Great_Vibes",
    fontWeight: "400",
  },
  emptyText: {
    fontSize: 20,
    color: '#000',
    fontWeight: "400",
    alignSelf: "center",
    fontFamily: "Great_Vibes",
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
