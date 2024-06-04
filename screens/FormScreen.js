import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { picts, routx } from "../utilitis";

export default function FormScreen({ navigation }) {
  const [sending, setSending] = useState(false);
  const [formState, setFormState] = useState({
    identifiant_interne_exploitation: '',
    numero_etat_civil: '',
    numero_piece_identite: '',
    numero_securite_sociale: '',
    localite: '',
    district: '',
    region_inspection: '',
    superficie_exploitation: '',
    type_exploitation_agricole: 'petite',
    nombre_unite_agricole: '',
    nombre_culture_certifiees: '',
    prenom: '',
    nom: '',
    numero_telephone: '',
    numero_identification_national: '',
    genre: 'H',
    annee_naissance: '',
    prenom_proprietaire_exploitation: '',
    nom_proprietaire_exploitation: '',
    numero_telephone_proprietaire_exploitation: '',
  });

  const handleChange = (name, value) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = () => {
    setSending(true);
    axios.post(`${routx.Baseurl}/enrollement`, formState)
      .then(response => {
        console.log(response.data);
        navigation.goBack();
      })
      .catch(error => {
        console.error(error);
        setSending(false);
        navigation.goBack();
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator="false" style={{ padding: "7%" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <View style={
          [
            hilai.inpt_contaner,
            {
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: 50,
            }
          ]
        }>
          <Text style={
            {
              fontWeight: "bold",
              fontSize: 22,
              textAlign: "center",
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              color: "#404040"
            }

          }>Veuillez renseigner</Text>
          <Text style={
            {
              fontWeight: "bold",
              fontSize: 22,
              textAlign: "center",
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              color: "#404040"
            }

          }>tous les chemps</Text>
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Identifiant Interne Exploitation</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.identifiant_interne_exploitation} onChangeText={(value) => handleChange('identifiant_interne_exploitation', value)} />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Numéro Etat Civil</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.numero_etat_civil} onChangeText={(value) => handleChange('numero_etat_civil', value)} />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Numéro Piece Identite</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.numero_piece_identite} onChangeText={(value) => handleChange('numero_piece_identite', value)} />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Numéro Sécurité Sociale</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.numero_securite_sociale} onChangeText={(value) => handleChange('numero_securite_sociale', value)} />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Localité</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.localite} onChangeText={(value) => handleChange('localite', value)} />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>District</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.district} onChangeText={(value) => handleChange('district', value)} />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Région Inspection</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.region_inspection} onChangeText={(value) => handleChange('region_inspection', value)} />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Superficie Exploitation</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.superficie_exploitation} onChangeText={(value) => handleChange('superficie_exploitation', value)} keyboardType="numeric" />
        </View>

        <View style={[hilai.inpt_contaner, { height: 170 }]}>
          <Text style={hilai.text_self}>Type Exploitation Agricole</Text>
          <Picker style={{ backgroundColor: "#fff", borderRadius: 10, justifyContent: "center", height: "100%" }} selectedValue={formState.type_exploitation_agricole} onValueChange={(value) => handleChange('type_exploitation_agricole', value)}>
            <Picker.Item label="Petite Plantation" value="petite" />
            <Picker.Item label="Grande Plantation" value="grande" />
          </Picker>
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Nombre Unité Agricole</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.nombre_unite_agricole} onChangeText={(value) => handleChange('nombre_unite_agricole', value)} keyboardType="numeric" />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Nombre Culture Certifiées</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.nombre_culture_certifiees} onChangeText={(value) => handleChange('nombre_culture_certifiees', value)} keyboardType="numeric" />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Prénom</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.prenom} onChangeText={(value) => handleChange('prenom', value)} />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Nom</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.nom} onChangeText={(value) => handleChange('nom', value)} />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Numéro Téléphone</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.numero_telephone} onChangeText={(value) => handleChange('numero_telephone', value)} />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Numéro Identification National</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.numero_identification_national} onChangeText={(value) => handleChange('numero_identification_national', value)} />
        </View>

        <View style={[hilai.inpt_contaner, { height: 170 }]}>
          <Text style={hilai.text_self}>Genre</Text>
          <Picker style={{ backgroundColor: "#fff", borderRadius: 10, justifyContent: "center", height: "100%" }} selectedValue={formState.genre} onValueChange={(value) => handleChange('genre', value)}>
            <Picker.Item label="Homme" value="H" />
            <Picker.Item label="Femme" value="F" />
          </Picker>
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Année de Naissance</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.annee_naissance} onChangeText={(value) => handleChange('annee_naissance', value)} keyboardType="numeric" />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Prénom Propriétaire Exploitation</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.prenom_proprietaire_exploitation} onChangeText={(value) => handleChange('prenom_proprietaire_exploitation', value)} />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Nom Propriétaire Exploitation</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.nom_proprietaire_exploitation} onChangeText={(value) => handleChange('nom_proprietaire_exploitation', value)} />
        </View>

        <View style={hilai.inpt_contaner}>
          <Text style={hilai.text_self}>Numéro Téléphone Propriétaire Exploitation</Text>
          <TextInput placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={formState.numero_telephone_proprietaire_exploitation} onChangeText={(value) => handleChange('numero_telephone_proprietaire_exploitation', value)} />
        </View>

        {sending ?
          <ActivityIndicator
            visible={sending}
            color="#fff"
          />

          :
          <TouchableOpacity style={hilai.button} onPress={handleSubmit}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 22 }}>Submet</Text>
          </TouchableOpacity>
        }

      </KeyboardAvoidingView>
      <View style={{ height: 150 }}></View>
    </ScrollView>
  );
}

const hilai = StyleSheet.create({
  inpt_contaner: {
    width: '100%',
    height: 90,
    paddingHorizontal: '2%',
    backgroundColor: "#ccc",
    marginBottom: "5%",
    paddingVertical: '2%',
    borderRadius: 10,
    overflow: "hidden"
  },
  input_self: {
    width: '100%',
    height: "75%",
    paddingHorizontal: '2%',
    backgroundColor: "#fff",
    marginTop: '2%',
    borderRadius: 10,
    fontSize: 22,
    color: "#404040"
  },
  text_self: {
    color: "#333"
  },

  button: {
    width: '100%',
    backgroundColor: "#007bff",
    paddingVertical: '5%',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  }
})