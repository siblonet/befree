import React from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, Text, Image, TouchableOpacity, TextInput, View, Alert, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient";
import { picts } from "../utilitis";


export default function ChoxMenu({ navigation, route }) {
    const { enrol } = route.params;




    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: "7%" }}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent={true}
                style={"dark"}
            />
            <View style={hilai.inpt_contaner}>
                <TouchableOpacity style={{paddingHorizontal: 5, backgroundColor: "#fff", borderRadius: 10, width: 40}} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={25} style={{fontWeight: "bold"}} color={'#007bff'} />
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
                <TouchableOpacity style={hilai.emptyContainer} onPress={() => console.log("")}>
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

                        {!enrol.agriculture && <View style={{ height: 7 }}></View>}
                        {!enrol.agriculture && <Text style={{ color: "red" }}>Vide</Text>}
                    </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity style={hilai.emptyContainer}>
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

                    {!enrol.travailleur && <View style={{ height: 7 }}></View>}
                    {!enrol.travailleur && <Text style={{ color: "red" }}>Vide</Text>}
                </TouchableOpacity>
            </View>
            <View style={{ height: 10 }}></View>

            <View style={hilai.menuro}>
                <TouchableOpacity style={hilai.emptyContainer} onPress={() => console.log("")}>

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

                        {!enrol.propietaire && <View style={{ height: 7 }}></View>}
                        {!enrol.propietaire && <Text style={{ color: "red" }}>Vide</Text>}
                    </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity style={hilai.emptyContainer}>
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

                    {!enrol.inspection && <View style={{ height: 7 }}></View>}
                    {!enrol.inspection && <Text style={{ color: "red" }}>Vide</Text>}
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