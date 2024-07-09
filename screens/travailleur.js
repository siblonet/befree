import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { picts, routx } from "../utilitis";
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";


export default function Travailleur({ navigation, route }) {
    const { enrol, agriculter } = route.params;
    const [sending, setSending] = useState(false);

    const [nombre_travailleur_permanent, setnombre_travailleur_permanent] = useState(enrol.nombre_travailleur_permanent ? enrol.nombre_travailleur_permanent : "");
    const [estimation_nombre_travailleurs_temporaires, setestimation_nombre_travailleurs_temporaires] = useState(enrol.estimation_nombre_travailleurs_temporaires ? enrol.estimation_nombre_travailleurs_temporaires : "");
    const [edidata, setEdidata] = useState(false);


    const handleSubmit = async () => {
        setSending(true);
        const operateur = {
            nombre_travailleur_permanent: nombre_travailleur_permanent,
            estimation_nombre_travailleurs_temporaires: estimation_nombre_travailleurs_temporaires,
            agriculter: agriculter
        }
        if (enrol._id) {
            const respon = await axios.put(`${routx.Baseurl}/BefreeAgriculter/updateByidBefreeTravailleurAgricole/${enrol._id}`, operateur);
            if (respon.data.done) {
                navigation.goBack()
            } else {
                alert("échèc")
            };
        } else {
            const respon = await axios.post(`${routx.Baseurl}/BefreeAgriculter/postBefreeTravailleurAgricole`, operateur);
            if (respon.data.nombre_travailleur_permanent) {
                navigation.goBack()
            } else {
                alert("échèc")
            };
        }

        setSending(true);
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

                <TouchableOpacity style={{ paddingHorizontal: 5, backgroundColor: "transparent", borderRadius: 10, width: 40 }} onPress={() => setEdidata(true)}>
                    <MaterialCommunityIcons name="note-edit" size={25} style={{ fontWeight: "bold" }} color={'#6fcaea'} />
                </TouchableOpacity>
            </View>


            <View style={

                {
                    paddingHorizontal: '2%',
                    justifyContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    paddingVertical: "8%"
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

                }>TRAVAILLEURS PAR L'EXPLOITATION AGRICOLE</Text>

            </View>


            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#99e6ae", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Nombre de travailleurs permanents</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={nombre_travailleur_permanent} onChangeText={(value) => setnombre_travailleur_permanent(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#99e6ae", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Estimation du nombre de travailleurs temporaires par an</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={estimation_nombre_travailleurs_temporaires} onChangeText={(value) => setestimation_nombre_travailleurs_temporaires(value)} />
                </LinearGradient>


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