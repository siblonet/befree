import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { picts, routx } from "../utilitis";
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";


export default function Explotation_Agricole({ navigation, route }) {
    const { enrol, agriculter } = route.params;

    const [sending, setSending] = useState(false);
    const [superficie_exploitation, setsuperficie_exploitation] = useState(enrol.superficie_exploitation ? enrol.superficie_exploitation : "");
    const [type_exploitation_agricole, settype_exploitation_agricole] = useState(enrol.type_exploitation_agricole ? enrol.type_exploitation_agricole : "");
    const [identifiant_national_exploitation_agricole, setidentifiant_national_exploitation_agricole] = useState(enrol.identifiant_national_exploitation_agricole ? enrol.identifiant_national_exploitation_agricole : "");
    const [nombre_culture_certifiees, setnombre_culture_certifiees] = useState(enrol.nombre_culture_certifiees ? enrol.nombre_culture_certifiees : "");
    const [localite, setlocalite] = useState(enrol.localite ? enrol.localite.name ? enrol.localite.name : "" : "");
    const [district, setdistrict] = useState(enrol.district ? enrol.district.name ? enrol.district.name : "" : "");
    const [region_inspection, setregion_inspection] = useState(enrol.region_inspection ? enrol.region_inspection.name ? enrol.region_inspection.name : "" : "");
    const [nombre_unites_agricoles_pour_cette_exploitation, setnombre_unites_agricoles_pour_cette_exploitation] = useState(enrol.nombre_unites_agricoles_pour_cette_exploitation ? enrol.nombre_unites_agricoles_pour_cette_exploitation : "");
    const [edidata, setEdidata] = useState(false);
    const [longitude, setlongitude] = useState(enrol.longitude ? enrol.longitude : "");
    const [latitute, setlatitute] = useState(enrol.longitude ? enrol.longitude : "");


    const handleSubmit = async () => {
        setSending(true);
        const operateur = {
            superficie_exploitation: superficie_exploitation,
            type_exploitation_agricole: type_exploitation_agricole,
            identifiant_national_exploitation_agricole: identifiant_national_exploitation_agricole,
            nombre_culture_certifiees: nombre_culture_certifiees,
            nombre_unites_agricoles_pour_cette_exploitation: nombre_unites_agricoles_pour_cette_exploitation,
            localite: {
                name: localite,
            },
            district: {
                name: district,
            },
            region_inspection: {
                name: region_inspection,
            },
            latitute: latitute,
            longitude: longitude,
            agriculter: agriculter
        }

        if (enrol._id) {
            const respon = await axios.put(`${routx.Baseurl}/BefreeAgriculter/updateByidBefreeExploitationAgricole/${enrol._id}`, operateur);
            if (respon.data.done) {
                navigation.goBack()
            } else {
                alert("échèc")
            };
        } else {
            const respon = await axios.post(`${routx.Baseurl}/BefreeAgriculter/postBefreeExploitationAgricole`, operateur);
            if (respon.data.localite) {
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

                <Text style={
                    {
                        fontWeight: "bold",
                        fontSize: 15,
                        textAlign: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        color: "#007bff"
                    }

                }>EXPLOITATION AGRICOLE</Text>

                <TouchableOpacity style={{ paddingHorizontal: 5, backgroundColor: "transparent", borderRadius: 10, width: 40 }} onPress={() => setEdidata(true)}>
                    <MaterialCommunityIcons name="note-edit" size={25} style={{ fontWeight: "bold" }} color={'#6fcaea'} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#007bff", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Identifiant national d’exploitation agricole</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={identifiant_national_exploitation_agricole} onChangeText={(value) => setidentifiant_national_exploitation_agricole(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#007bff", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Superficie totale de l’exploitation agricole</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={superficie_exploitation} onChangeText={(value) => setsuperficie_exploitation(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#007bff", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Type d’exploitation agricole</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={type_exploitation_agricole} onChangeText={(value) => settype_exploitation_agricole(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#007bff", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Nombre d’unités agricoles pour cette exploitation</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={nombre_unites_agricoles_pour_cette_exploitation} onChangeText={(value) => setnombre_unites_agricoles_pour_cette_exploitation(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#007bff", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Nombre de cultures certifiées</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={nombre_culture_certifiees} onChangeText={(value) => setnombre_culture_certifiees(value)} />
                </LinearGradient>


                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#007bff", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Localité</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={localite} onChangeText={(value) => setlocalite(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#007bff", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>District</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={district} onChangeText={(value) => setdistrict(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#007bff", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Région Inspection</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={region_inspection} onChangeText={(value) => setregion_inspection(value)} />
                </LinearGradient>


                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#007bff", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Latitute</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={latitute} onChangeText={(value) => setlatitute(value)} />
                </LinearGradient>

                <LinearGradient style={hilai.inpt_contaner}
                    colors={["#007bff", "#6fcaea"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1.5, y: 1 }}
                >
                    <Text style={hilai.text_self}>Longitude</Text>
                    <TextInput editable={edidata} placeholder='Saissie ici' placeholderTextColor={"#ccc"} style={hilai.input_self} value={longitude} onChangeText={(value) => setlongitude(value)} />
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
        color: "#ffff",
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