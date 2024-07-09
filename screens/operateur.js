import React, { useState } from 'react';
import { View, Text, Image, TextInput, ActivityIndicator, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { picts, routx } from "../utilitis";
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import QRCode from 'react-native-qrcode-svg';


export default function OperateurAgricole({ navigation, route }) {
    const { enrol } = route.params;
    const [sending, setSending] = useState(false);

    const [prenom, setprenom] = useState(enrol.prenom ? enrol.prenom : "prenom");
    const [nom, setnom] = useState(enrol.nom ? enrol.nom : "prenom");
    const [numero_telephone, setnumero_telephone] = useState(enrol.numero_telephone ? enrol.numero_telephone : "0700000000");
    const [identifiant_interne_exploitation, setidentifiant_interne_exploitation] = useState(enrol.identifiant_interne_exploitation ? enrol.identifiant_interne_exploitation : "000000");
    const [numero_etat_civil, setnumero_etat_civil] = useState(enrol.numero_etat_civil ? enrol.numero_etat_civil : "");
    const [numero_securite_sociale, setnumero_securite_sociale] = useState(enrol.numero_securite_sociale ? enrol.numero_securite_sociale : "");
    const [numero_identification_national, setnumero_identification_national] = useState(enrol.numero_identification_national ? enrol.numero_identification_national : "");
    const [genre, setgenre] = useState(enrol.genre ? enrol.genre : "genre");
    const [annee_naissance, setannee_naissance] = useState(enrol.annee_naissance ? enrol.annee_naissance : "");
    const [cooperative, setcooperative] = useState(enrol.cooperative.nom ? enrol.cooperative.nom : "");
    const [document, setdocument] = useState(enrol.document ? enrol.document : "");
    const [qrcode, setqrcode] = useState(enrol.qrcode ? enrol.qrcode : "");
    const [finger_print, setfinger_print] = useState(enrol.finger_print ? enrol.finger_print : "");
    const [signature, setsignature] = useState(enrol.signature ? enrol.signature : "");
    const [edidata, setEdidata] = useState(false);


    const handleSubmit = async () => {
        setSending(true);
        const operateur = {
            prenom: prenom,
            nom: nom,
            numero_telephone: numero_telephone,
            identifiant_interne_exploitation: identifiant_interne_exploitation,
            numero_etat_civil: numero_etat_civil,
            numero_securite_sociale: numero_securite_sociale,
            numero_identification_national: numero_identification_national,
            genre: genre,
            annee_naissance: annee_naissance,
        }
        const respon = await axios.put(`${routx.Baseurl}/BefreeAgriculter/updateBefreeAgrulter/${enrol._id}`, operateur);
        if (respon.data.done) {
            navigation.goBack()
        } else {
            alert("échèc")
        };
        setSending(true);
    };

    const selectImagePhoto = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                base64: true
            });

            if (!result.canceled) {
                const imageDara = {
                    ima: result.assets[0].base64,
                    nam: result.assets[0].uri.split('/').pop(),
                    old_image: null
                }
                setSending(true);
                const response = await axios.post(`${routx.Baseurl}/boutique/uploadImage`, imageDara);
                if (response.data.ima) {
                    setdocument(response.data.ima);
                    const respon = await axios.put(`${routx.Baseurl}/BefreeAgriculter/updateBefreeAgrulter/${enrol._id}`, {
                        document: response.data.ima,
                        qrcode: enrol.identifiant_interne_exploitation,
                    });
                    if (respon.data.done) {
                        navigation.goBack()
                    } else {
                        alert("échèc")
                    };
                } else {
                    alert("échèc")
                }
                setSending(false);
            }
        } catch (error) {
            setSending(false);
            console.log('Error selecting image:', error);
        }
    };



    const selectImagePrint = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                base64: true
            });

            if (!result.canceled) {
                const imageDaro = {
                    ima: result.assets[0].base64,
                    nam: result.assets[0].uri.split('/').pop(),
                    old_image: null
                }
                setSending(true);
                const response = await axios.post(`${routx.Baseurl}/boutique/uploadImage`, imageDaro);

                if (response.data.ima) {
                    setfinger_print(response.data.ima);
                    const respon = await axios.put(`${routx.Baseurl}/BefreeAgriculter/updateBefreeAgrulter/${enrol._id}`, {
                        finger_print: response.data.ima,
                    });
                    if (respon.data.done) {
                        navigation.goBack()
                    } else {
                        alert("échèc")
                    };
                } else {
                    alert("échèc")
                }
                setSending(false);

            }
        } catch (error) {
            console.log('Error selecting image:', error);
            setSending(false);
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
                    paddingVertical: '8%',
                    flexDirection: "row",
                    justifyContent: "space-between"
                }

            }>
                <TouchableOpacity style={{ paddingHorizontal: 5, backgroundColor: "#fff", borderRadius: 10, width: 40 }} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={25} style={{ fontWeight: "bold" }} color={'#007bff'} />
                </TouchableOpacity>

                <Text style={
                    {
                        fontWeight: "bold",
                        fontSize: 22,
                        textAlign: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        color: "#007bff"
                    }

                }>OPÉRATEUR</Text>

                <TouchableOpacity style={{ paddingHorizontal: 5, backgroundColor: "transparent", borderRadius: 10, width: 40 }} onPress={() => setEdidata(true)}>
                    <MaterialCommunityIcons name="note-edit" size={25} style={{ fontWeight: "bold" }} color={'#6fcaea'} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#99e6ae", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Prénom</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={prenom} onChangeText={(value) => setprenom(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#99e6ae", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Nom</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={nom} onChangeText={(value) => setnom(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#99e6ae", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Numéro Téléphone</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={numero_telephone} onChangeText={(value) => setnumero_telephone(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#99e6ae", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Identifiant Interne Exploitation</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={identifiant_interne_exploitation} onChangeText={(value) => setidentifiant_interne_exploitation(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#99e6ae", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Numéro Etat Civil</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={numero_etat_civil} onChangeText={(value) => setnumero_etat_civil(value)} />
                </LinearGradient>


                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#99e6ae", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Numéro Sécurité Sociale</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={numero_securite_sociale} onChangeText={(value) => setnumero_securite_sociale(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#99e6ae", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Numéro Identification National</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={numero_identification_national} onChangeText={(value) => setnumero_identification_national(value)} />
                </LinearGradient>


                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#99e6ae", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Genre</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={genre} onChangeText={(value) => setgenre(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#99e6ae", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Année de Naissance</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={annee_naissance} onChangeText={(value) => setannee_naissance(value)} keyboardType="numeric" />
                </LinearGradient>


                <View style={hilai.menuro}>
                    <TouchableOpacity style={hilai.emptyContainer} onPress={() => selectImagePhoto()} disabled={edidata ? false : true}>
                        <LinearGradient
                            style={
                                {
                                    height: "100%",
                                    width: "100%",
                                    alignSelf: "center",
                                    alignItems: "center",
                                    justifyContent: "center"

                                }
                            }
                            colors={["#6fcaea", "#99e6ae"]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1.5, y: 1 }}
                        >
                            {document ?
                                <Image
                                    source={{ uri: document }}
                                    resizeMode="contain"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                                :
                                <Image
                                    source={picts.faceid}
                                    resizeMode="stretch"
                                    style={{
                                        width: "95%",
                                        height: "95%",
                                    }}
                                />
                            }
                            {!document && (
                                <Text style={{ position: "absolute", color: "#007bff", alignSelf: "center", textAlign: "center", bottom: 5, fontWeight: "bold" }}>Photo (Vide)</Text>
                            )}
                            {document && (
                                <Text style={{ position: "absolute", color: "#fff", alignSelf: "center", textAlign: "center", bottom: 5, fontWeight: "bold" }}>Photo</Text>

                            )}
                        </LinearGradient>
                    </TouchableOpacity>


                    <TouchableOpacity style={hilai.emptyContainer} disabled={true}>
                        <LinearGradient
                            style={
                                {
                                    height: "100%",
                                    width: "100%",
                                    alignSelf: "center",
                                    alignItems: "center",
                                    justifyContent: "center"

                                }
                            }
                            colors={["#FAFAFC", "#FAFAFC"]}
                            start={{ x: 0, y: 1.2 }}
                            end={{ x: 1.5, y: 1 }}
                        >
                            {qrcode ?

                                <QRCode
                                    value={qrcode}
                                    size={150}
                                    ecl={"L"}
                                    color="#000"
                                    logo={picts.agricole}
                                    logoSize={30}
                                    logoBorderRadius={50}
                                    logoBackgroundColor="#fff"
                                    backgroundColor="#fff"
                                />
                                :
                                <Image
                                    source={picts.qrcode}
                                    resizeMode="stretch"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            }
                            {!qrcode && (
                                <Text style={{ position: "absolute", color: "#606060", alignSelf: "center", textAlign: "center", bottom: 5, fontWeight: "bold" }}>Qrcode (Vide)</Text>

                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 10 }}></View>

                <View style={hilai.menuro}>
                    <TouchableOpacity style={hilai.emptyContainer} onPress={() => navigation.navigate("signature", { ida: enrol._id, iie: enrol.identifiant_interne_exploitation })} disabled={edidata ? false : true}>
                        <LinearGradient
                            style={
                                {
                                    height: "100%",
                                    width: "100%",
                                    alignSelf: "center",
                                    alignItems: "center",
                                    justifyContent: "center"

                                }
                            }
                            colors={["#2F66C9", "#5D95E4"]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1.5, y: 1 }}
                        >
                            {signature ?
                                <Image
                                    source={{ uri: signature }}
                                    resizeMode="contain"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                                :
                                <Image
                                    source={picts.signatur}
                                    resizeMode="contain"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            }
                            {!signature && (
                                <Text style={{ position: "absolute", color: "#E178A6", alignSelf: "center", textAlign: "center", bottom: 5, fontWeight: "bold" }}>Signature (Vide)</Text>

                            )}
                            {signature && (
                                <Text style={{ position: "absolute", color: "#fff", alignSelf: "center", textAlign: "center", bottom: 5, fontWeight: "bold" }}>Signature</Text>

                            )}
                        </LinearGradient>
                    </TouchableOpacity>


                    <TouchableOpacity style={hilai.emptyContainer} onPress={() => selectImagePrint()} disabled={edidata ? false : true}>
                        <LinearGradient
                            style={
                                {
                                    height: "100%",
                                    width: "100%",
                                    alignSelf: "center",
                                    alignItems: "center",
                                    justifyContent: "center"

                                }
                            }
                            colors={["#6fcaea", "#007bff"]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1.5, y: 1 }}
                        >
                            {finger_print ?
                                <Image
                                    source={{ uri: finger_print }}
                                    resizeMode="contain"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                                :
                                <Image
                                    source={picts.fingerprint}
                                    resizeMode="contain"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            }
                            {!finger_print && (
                                <Text style={{ position: "absolute", color: "#007bff", alignSelf: "center", textAlign: "center", bottom: 5, fontWeight: "bold" }}>Emprinte (Vide)</Text>

                            )}
                            {finger_print && (
                                <Text style={{ position: "absolute", color: "#fff", alignSelf: "center", textAlign: "center", bottom: 5, fontWeight: "bold" }}>Signature</Text>

                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }}></View>

                {edidata && (sending ?
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
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 22 }}>Modifier</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                )}
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