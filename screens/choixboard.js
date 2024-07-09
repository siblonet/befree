import React, { useState, useCallback } from "react";
import { StyleSheet, ActivityIndicator, ScrollView, Text, Image, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient";
import { picts, routx } from "../utilitis";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native"



const fdaa = {
    "ExtraExploitation": {},
    "agricole": {},
    "inspecteur": {},
    "operateur": {
        "__v": 0,
        "_id": "668afe92e2bacf0b592621d2",
        "annee_naissance": "1980",
        "cooperative": {
            "__v": 0,
            "_id": "66888f10894767764689aeb1",
            "categorie": "66887e00673362ed6bf8cd00",
            "certificate": [Array],
            "created": "2024-07-06T00:25:52.974Z",
            "nom": "Befree"
        },
        "created": "2024-07-07T20:46:10.485Z",
        "district": {
            "name": "Vide"
        },
        "finger_print": "https://storage.googleapis.com/seeme-7a462.appspot.com/f55a2a1e-9d52-48c8-a7a0-fce5be589409A7B9DD6F-1D50-40DD-913C-33DB87912E37.jpg",
        "genre": "FEMME",
        "identifiant_interne_exploitation": "GA-BIA-001",
        "localite": { "name": "Vide" },
        "nom": "KOUSSI ",
        "numero_etat_civil": "Vide",
        "numero_identification_national": "C 0087 9636 26",
        "numero_piece_identite": "Vide",
        "numero_securite_sociale": "Vide",
        "numero_telephone": "07-48-38-44-98",
        "prenom": "AKISSI CHANTAL",
        "qrcode": "GA-BIA-001",
        "region_inspection": { "name": "Vide" },
        "signature": "https://storage.googleapis.com/seeme-7a462.appspot.com/b952b269-15a2-4ae7-b6ca-f3f73fa9d827signature.png"
    },
    "proprierteur": {},
    "travailleur": {}
}

export default function ChoxMenu({ navigation, route }) {
    const { enrol } = route.params;
    const [completdata, setcompletdata] = useState({
        "ExtraExploitation": {},
        "agricole": {},
        "inspecteur": {},
        "proprierteur": {},
        "travailleur": {}
    });


    useFocusEffect(
        useCallback(() => {
            const getSignle = async () => {
                await axios.get(`${routx.Baseurl}/BefreeAgriculter/getByIdBefreeAgrulter/${enrol._id}`).then((dee) => {
                    setcompletdata(dee.data)
                }).catch((eroo) => console.log(eroo));
            };
            getSignle()
        }, [])
    );



    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: "7%" }}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent={true}
                style={"dark"}
            />
            <View style={hilai.inpt_contaner}>
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
                        color: "#404040"
                    }

                }>{enrol.identifiant_interne_exploitation}</Text>

            </View>


            <TouchableOpacity style={[hilai.emptyContainer, { height: 200, alignSelf: "center", width: "55%" }]} onPress={() => navigation.navigate("Détail sur l'opérateur", { enrol: enrol })}>

                <LinearGradient
                    style={
                        {
                            height: "100%",
                            width: "100%",
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal: "5%"
                        }
                    }
                    colors={["#6fcaea", "#99e6ae"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <View style={{ padding: 3, borderRadius: 10 }}>
                        <Image
                            source={picts.avatar}
                            resizeMode="stretch"
                            style={{
                                width: 70,
                                height: 70,
                            }}
                        />
                    </View>
                    <View style={{ height: 10 }}></View>
                    <Text style={hilai.emptyText}>OPÉRATEUR DE L'EXPLOITATION AGRICOLE</Text>
                </LinearGradient>
            </TouchableOpacity>

            <View style={{ height: 10 }}></View>


            <View style={hilai.menuro}>
                <TouchableOpacity style={hilai.emptyContainer} onPress={() => navigation.navigate("ExplotationAgricole", { enrol: completdata.agricole, agriculter: enrol._id })}>
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
                        colors={["#007bff", "#fff"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1.5, y: 1 }}
                    >
                        <View style={{ padding: 3, borderRadius: 10 }}>
                            <Image
                                source={picts.fingerprint}
                                resizeMode="stretch"
                                style={{
                                    width: 70,
                                    height: 70,
                                }}
                            />
                        </View>
                        <View style={{ height: 10 }}></View>
                        <Text style={hilai.emptyText}>EXPLOITATION AGRICOLE</Text>

                        {!completdata.agricole.agriculter && <View style={{ height: 7 }}></View>}
                        {!completdata.agricole.agriculter && <Text style={{ color: "red" }}>Vide</Text>}
                    </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity style={hilai.emptyContainer} onPress={() => navigation.navigate("Travailleur", { enrol: completdata.travailleur, agriculter: enrol._id })}>
                    <View style={hilai.emptyOverlay} />
                    <View style={{ padding: 3, borderRadius: 10 }}>
                        <Image
                            source={picts.agricole}
                            resizeMode="stretch"
                            style={{
                                width: 70,
                                height: 70,
                            }}
                        />
                    </View>
                    <View style={{ height: 10 }}></View>

                    <Text style={hilai.emptyText}>TRAVAILLEURS PAR L'EXPLOITATION AGRICOLE</Text>

                    {!completdata.travailleur.agriculter && <View style={{ height: 7 }}></View>}
                    {!completdata.travailleur.agriculter && <Text style={{ color: "red" }}>Vide</Text>}
                </TouchableOpacity>
            </View>
            <View style={{ height: 10 }}></View>

            <View style={hilai.menuro}>
                <TouchableOpacity style={hilai.emptyContainer} onPress={() => navigation.navigate("ProExp_Agr", { enrol: completdata.proprierteur, agriculter: enrol._id })}>

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
                        colors={["#99e6ae", "#6fcaea"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1.5, y: 1 }}
                    >
                        <View style={{ padding: 3, borderRadius: 10 }}>
                            <Image
                                source={picts.faceid}
                                resizeMode="stretch"
                                style={{
                                    width: 70,
                                    height: 70,
                                }}
                            />
                        </View>
                        <View style={{ height: 10 }}></View>
                        <Text style={hilai.emptyText}>PROPRIÉTAIRE DE L'EXPLOITATION AGRICOLE</Text>

                        {!completdata.proprierteur.agriculter && <View style={{ height: 7 }}></View>}
                        {!completdata.proprierteur.agriculter && <Text style={{ color: "red" }}>Vide</Text>}
                    </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity style={hilai.emptyContainer} onPress={() => navigation.navigate("Inspecteur", { enrol: completdata.inspecteur, agriculter: enrol._id })}>
                    <View style={hilai.emptyOverlay} />
                    <View style={{ padding: 3, borderRadius: 10 }}>
                        <Image
                            source={picts.agricole}
                            resizeMode="stretch"
                            style={{
                                width: 70,
                                height: 70,
                            }}
                        />
                    </View>
                    <View style={{ height: 10 }}></View>

                    <Text style={hilai.emptyText}>DONNÉES D'INSPECTION INTERNE</Text>

                    {!completdata.inspecteur.agriculter && <View style={{ height: 7 }}></View>}
                    {!completdata.inspecteur.agriculter && <Text style={{ color: "red" }}>Vide</Text>}
                </TouchableOpacity>
            </View>



            <View style={{ height: 250 }}></View>
        </ScrollView>
    );
}

const hilai = StyleSheet.create({
    inpt_contaner: {
        width: '100%',
        paddingVertical: '5%',
        paddingHorizontal: "5%"
    },

    menuro: {
        flexDirection: "row",
        width: "100%",
        height: 220,
        backgroundColor: "transparent",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: "7%"
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