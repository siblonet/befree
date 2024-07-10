import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { picts, routx } from "../utilitis";
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import getNextIdentifier from "./generator";


export default function EnrollerOperateurAgricole({ navigation, route }) {
  const [sending, setSending] = useState(false);

  const [prenom, setprenom] = useState();
  const [nom, setnom] = useState();
  const [numero_telephone, setnumero_telephone] = useState();
  const [numero_etat_civil, setnumero_etat_civil] = useState();
  const [numero_securite_sociale, setnumero_securite_sociale] = useState();
  const [numero_identification_national, setnumero_identification_national] = useState();
  const [genre, setgenre] = useState();
  const [annee_naissance, setannee_naissance] = useState();


  const handleSubmit = async () => {
    if (prenom && nom && genre && annee_naissance) {
      setSending(true);
      const last_itemda = await axios.get(`${routx.Baseurl}/BefreeAgriculter/getLastItemtogenerate`);
      const iie = getNextIdentifier(last_itemda.data.identifiant_interne_exploitation);
      const operateur = {
        prenom: prenom,
        nom: nom,
        numero_telephone: numero_telephone,
        identifiant_interne_exploitation: iie,
        numero_etat_civil: numero_etat_civil,
        numero_securite_sociale: numero_securite_sociale,
        numero_identification_national: numero_identification_national,
        genre: genre,
        annee_naissance: annee_naissance,
        cooperative: "66888f10894767764689aeb1"
      }
      const respon = await axios.post(`${routx.Baseurl}/BefreeAgriculter/postBefreeAgrulter/`, operateur);
      if (respon.data.done) {
        navigation.goBack()
      } else {
        alert("échèc")
      };
      setSending(true);
    } else {
      alert("Renseignez Tous")
    }
  };




  return (
    <View showsVerticalScrollIndicator={false} style={{ padding: "7%" }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
        style={"dark"}
      />
      <View style={

        {
          width: '100%',
          paddingTop: '8%',
          flexDirection: "row",
          justifyContent: "space-between"
        }

      }>
        <TouchableOpacity style={{ paddingHorizontal: 5, backgroundColor: "#fff", borderRadius: 10, width: 40 }} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} style={{ fontWeight: "bold" }} color={'#007bff'} />
        </TouchableOpacity>

        <View style={{ height: 10, width: 20 }}></View>
      </View>


      <View style={

        {
          paddingHorizontal: '2%',
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          paddingVertical: "5%"
        }

      }>
        <Text style={
          {
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "center",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            color: "#007bff"
          }

        }>CREATION D'OPÉRATEUR</Text>

      </View>



      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient style={hilai.inpt_contaner}
          colors={["#99e6ae", "#6fcaea"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.5, y: 1 }}
        >
          <Text style={hilai.text_self}>Prénom</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={prenom} onChangeText={(value) => setprenom(value)} />
        </LinearGradient>

        <LinearGradient style={hilai.inpt_contaner}
          colors={["#99e6ae", "#6fcaea"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.5, y: 1 }}
        >
          <Text style={hilai.text_self}>Nom</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={nom} onChangeText={(value) => setnom(value)} />
        </LinearGradient>

        <LinearGradient style={hilai.inpt_contaner}
          colors={["#99e6ae", "#6fcaea"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.5, y: 1 }}
        >
          <Text style={hilai.text_self}>Numéro Téléphone</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={numero_telephone} onChangeText={(value) => setnumero_telephone(value)} />
        </LinearGradient>


        <LinearGradient style={hilai.inpt_contaner}
          colors={["#99e6ae", "#6fcaea"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.5, y: 1 }}
        >
          <Text style={hilai.text_self}>Numéro Etat Civil</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={numero_etat_civil} onChangeText={(value) => setnumero_etat_civil(value)} />
        </LinearGradient>


        <LinearGradient style={hilai.inpt_contaner}
          colors={["#99e6ae", "#6fcaea"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.5, y: 1 }}
        >
          <Text style={hilai.text_self}>Numéro Sécurité Sociale</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={numero_securite_sociale} onChangeText={(value) => setnumero_securite_sociale(value)} />
        </LinearGradient>

        <LinearGradient style={hilai.inpt_contaner}
          colors={["#99e6ae", "#6fcaea"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.5, y: 1 }}
        >
          <Text style={hilai.text_self}>Numéro Identification National</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={numero_identification_national} onChangeText={(value) => setnumero_identification_national(value)} />
        </LinearGradient>


        <LinearGradient style={hilai.inpt_contaner}
          colors={["#99e6ae", "#6fcaea"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.5, y: 1 }}
        >
          <Text style={hilai.text_self}>Genre</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={genre} onChangeText={(value) => setgenre(value)} />
        </LinearGradient>

        <LinearGradient style={hilai.inpt_contaner}
          colors={["#99e6ae", "#6fcaea"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.5, y: 1 }}
        >
          <Text style={hilai.text_self}>Année de Naissance</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={annee_naissance} onChangeText={(value) => setannee_naissance(value)} keyboardType="numeric" />
        </LinearGradient>




        <View style={{ height: 40 }}></View>

        {sending ?
          <LinearGradient
            style={
              {
                width: "100%",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                height: 50,
                borderRadius: 10,
                elevation: 2
              }
            }
            colors={["#6fcaea", "#007bff"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.5, y: 1 }}
          >
            <TouchableOpacity style={{
              height: '100%',
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Text style={{ color: "#000", fontSize: 15 }}>En cours patientez</Text>

              <ActivityIndicator
                visible={sending}
                color="#000"
              />
            </TouchableOpacity>
          </LinearGradient>


          :
          <LinearGradient
            style={
              {
                width: "100%",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                height: 50,
                borderRadius: 10,
                elevation: 2
              }
            }
            colors={["#6fcaea", "#007bff"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.5, y: 1 }}
          >
            <TouchableOpacity
              style={hilai.button}
              onPress={() => handleSubmit()}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 22 }}>Enrôler</Text>
            </TouchableOpacity>
          </LinearGradient>
        }
        <View style={{ height: 300 }}></View>
      </ScrollView>
    </View>
  );
}

const hilai = StyleSheet.create({
  inpt_contaner: {
    width: '100%',
    height: 90,
    backgroundColor: "#ccc",
    paddingTop: '2%',
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 25
  },
  input_self: {
    width: '100%',
    height: "75%",
    paddingHorizontal: '2%',
    backgroundColor: "#fff",
    marginTop: '2%',
    fontSize: 22,
    color: "#404040"
  },
  text_self: {
    color: "#000",
    paddingLeft: 10
  },

  button: {
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "100%"
  },
  menuro: {
    flexDirection: "row",
    width: "100%",
    height: 200,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptyContainer: {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowColor: '#ccc',
    elevation: 5,
    borderRadius: 15,
    backgroundColor: "transparent",
    height: "100%",
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"

  },
  emptyOverlay: {
    position: "absolute",
    height: "110%",
    width: "110%",
    backgroundColor: "#fff",
    opacity: 1,
    borderRadius: 20,
  },
  emptyText: {
    textAlign: "center",
    fontWeight: "bold"
  },
})