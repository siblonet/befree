import React, { useState } from 'react';
import { View, Text, Image, TextInput, ActivityIndicator, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { picts, routx } from "../utilitis";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Picker } from '@react-native-picker/picker';


export default function DetailScreen({ navigation, route }) {
    const { enrol } = route.params;
    const [sending, setSending] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);

    const [formState, setFormState] = useState({
        identifiant_interne_exploitation: enrol.identifiant_interne_exploitation ? enrol.identifiant_interne_exploitation : "",
        numero_etat_civil: enrol.numero_etat_civil ? enrol.numero_etat_civil : "",
        numero_piece_identite: enrol.numero_piece_identite ? enrol.numero_piece_identite : "",
        numero_securite_sociale: enrol.numero_securite_sociale ? enrol.numero_securite_sociale : "",
        localite: enrol.localite ? enrol.localite : "",
        district: enrol.district ? enrol.district : "",
        region_inspection: enrol.region_inspection ? enrol.region_inspection : "",
        superficie_exploitation: enrol.superficie_exploitation ? enrol.superficie_exploitation : "",
        type_exploitation_agricole: enrol.type_exploitation_agricole ? enrol.type_exploitation_agricole : "petite",
        nombre_unite_agricole: enrol.nombre_unite_agricole ? enrol.nombre_unite_agricole : "",
        nombre_culture_certifiees: enrol.nombre_culture_certifiees ? enrol.nombre_culture_certifiees : "",
        prenom: enrol.prenom ? enrol.prenom : "",
        nom: enrol.nom ? enrol.nom : "",
        numero_telephone: enrol.numero_telephone ? enrol.numero_telephone : "",
        numero_identification_national: enrol.numero_identification_national ? enrol.numero_identification_national : "",
        genre: enrol.genre ? enrol.genre : "H",
        annee_naissance: enrol.annee_naissance ? enrol.annee_naissance : "",
        prenom_proprietaire_exploitation: enrol.prenom_proprietaire_exploitation ? enrol.prenom_proprietaire_exploitation : "",
        nom_proprietaire_exploitation: enrol.nom_proprietaire_exploitation ? enrol.nom_proprietaire_exploitation : "",
        numero_telephone_proprietaire_exploitation: enrol.numero_telephone_proprietaire_exploitation ? enrol.numero_telephone_proprietaire_exploitation : "",
        photo: capturedImage,
    });

    const handleChange = (name, value) => {
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = () => {
        setSending(true);
        axios.post(`${routx.Baseurl}/manage-operateurs/`, formState)
            .then(() => navigation.goBack())
            .catch(error => {
                console.error(error);
                setSending(false);
                navigation.goBack();
            });
    };

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });

            if (!result.canceled) {
                const editedImage = await ImageManipulator.manipulateAsync(
                    result.assets[0].uri,
                    [{ resize: { width: 600, height: 600 } }],
                    {
                        compress: 1, format: ImageManipulator.SaveFormat.JPEG,
                        base64: true
                    }
                );
                setCapturedImage(editedImage.base64);
            }
        } catch (error) {
            console.log('Error selecting image:', error);
        }
    };







    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: "7%" }}>
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

                }>Détail Complet</Text>

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

    

            <View style={{ width: "100%", flexDirection: "row", paddingHorizontal: 10, paddingBottom: 15, justifyContent: "space-around" }}>

                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    onPress={() => selectImage()}>

                    <TouchableOpacity style={
                        {
                            alignItems: "center",
                            justifyContent: "center",
                            height: 45,
                            width: 45,
                            borderRadius: 17,
                            backgroundColor: "transparent"
                        }
                    } onPress={() => selectImage()}>
                        <Image
                            source={picts.faceid}
                            resizeMode="center"
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: "#aaa" }}>Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>

                    <TouchableOpacity style={
                        {
                            alignItems: "center",
                            justifyContent: "center",
                            height: 40,
                            width: 40,
                            borderRadius: 17,
                            elevation: 5,
                            backgroundColor: "#eee"
                        }
                    }>
                        <Image
                            source={picts.fingerprint}
                            resizeMode="center"
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: "#aaa" }}>Emprinte</Text>
                </TouchableOpacity>
            </View>



            {sending ?
                <ActivityIndicator
                    visible={sending}
                    color="#fff"
                />

                :
                <TouchableOpacity style={hilai.button} onPress={handleSubmit}>
                    <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 22 }}>Modifier</Text>
                </TouchableOpacity>
            }
            <View style={{ height: 250 }}></View>
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