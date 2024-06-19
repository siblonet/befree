import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, TextInput, ActivityIndicator, Keyboard, Alert } from 'react-native';
import {
    Ionicons
} from '@expo/vector-icons';
import { picts, routx } from "../utilitis";
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";

const HEIGHT = Dimensions.get("window").height;

export default function ConneXion({ navigation }) {
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [isloaded, setIsLoaded] = useState(false);
    const [secure, setSecure] = useState(true);


    const saveData = async (name) => {
        try {
            await SecureStore.setItemAsync('befree', name);
            const yeahpermi = await SecureStore.getItemAsync('befreeends');
            if (!yeahpermi) {
                await SecureStore.setItemAsync('befreeends', '8-2024');
                navigation.goBack();
            } else {
                navigation.goBack();

            }
        } catch (error) {
            console.log('Error saving data:', error);
        }
    };


    const Connect = async () => {
        setIsLoaded(true);
        Keyboard.dismiss();

        const person = {
            phone: phone,
            password: password,
        };

        try {
            if (phone && password) {
                const response = await axios.post(`${routx.Baseurl}/signin/`, person);
                if (response.data.last_name) {
                    saveData(response.data.last_name + " " + response.data.first_name)
                    setIsLoaded(false);

                } else {
                    Alert.alert("Information Rejetée", "Veillez saisir correctement vos identifiants");
                    setIsLoaded(false);
                }
            } else {
                Alert.alert("Vide Rejetée", "Veillez saisir vos identifiants");
                setIsLoaded(false);
            }
        } catch (error) {
            Alert.alert("Errer incconu", error);
            setIsLoaded(false);
        }
    };



    return (
        <View style={hilai.container}>
            <StatusBar animated={true} style="light" backgroundColor="transparent" />

            <LinearGradient
                style={
                    {
                        position: "absolute",
                        height: HEIGHT,
                        width: 200,
                        left: 0,
                        borderTopRightRadius: 120,
                        //zIndex: 2
                    }
                }
                colors={["#661400", "#17052e", "#17052e"]}
                start={{ x: 1, y: 0 }}
                end={{ x: 2, y: 0.1 }}
            >
            </LinearGradient>

            <LinearGradient
                style={
                    {
                        position: "absolute",
                        height: HEIGHT,
                        width: 140,
                        right: 0,
                        borderBottomLeftRadius: 70
                    }
                }
                colors={["#17052e", "#661400"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            >
            </LinearGradient>




            <LinearGradient
                style={
                    {
                        position: "absolute",
                        height: 40,
                        width: 40,
                        left: 7,
                        top: 120,
                        borderRadius: 10,
                        elevation: 5
                    }
                }
                colors={["#fff", "#661400"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            >
            </LinearGradient>


            <LinearGradient
                style={
                    {
                        position: "absolute",
                        height: 40,
                        width: 40,
                        left: 15,
                        top: 150,
                        borderRadius: 10,
                        elevation: 5
                    }
                }
                colors={["#17052e", "#661400"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            >
            </LinearGradient>


            <LinearGradient
                style={
                    {
                        position: "absolute",
                        height: 40,
                        width: 40,
                        left: 7,
                        top: 190,
                        borderRadius: 10,
                        elevation: 5
                    }
                }
                colors={["#17052e", "#661400"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            >
            </LinearGradient>



            <LinearGradient
                style={
                    {
                        position: "absolute",
                        height: 40,
                        width: 40,
                        right: 5,
                        bottom: 250,
                        borderRadius: 10,
                        elevation: 5
                    }
                }
                colors={["#007fbb", "#f0687c"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            >
            </LinearGradient>


            <LinearGradient
                style={
                    {
                        position: "absolute",
                        height: 40,
                        width: 40,
                        right: 7,
                        bottom: 150,
                        borderRadius: 10,
                    }
                }
                colors={["#17052e", "#661400"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
            >
            </LinearGradient>







            <View style={{
                width: "25.5%",
                height: "12%",
                backgroundColor: "#eee",
                borderRadius: 55,
            }}
            >
                <Image
                    source={picts.logo}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </View>

            <View style={{
                width: "100%",
                height: "12%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                top: -20
            }}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    color: "red",
                    fontStyle: "italic"
                }}>Be</Text>
                <Text style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    color: "#aaa",
                    fontStyle: "italic"
                }}>free</Text>

            </View>



            <View style={{
                height: 50,
                width: "90%",
                backgroundColor: "#ffffff",
                borderRadius: 11,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: "2%",
                justifyContent: "space-between",
            }}>
                <View style={{ height: 30, width: 30 }}>
                    <Image
                        source={picts.avatar}
                        resizeMode="center"
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </View>

                <TextInput style={{
                    backgroundColor: 'transparent',
                    fontSize: 17,
                    height: 30,
                    width: "80%",
                    color: '#661400',
                }}
                    placeholderTextColor={'#aaa'}
                    placeholder={'Nom Utilisateur'}
                    value={phone}
                    onChangeText={text => setPhone(text)}
                />

                <Ionicons name="call" size={20} color={'#aaa'} />
            </View>

            <View style={{ height: "5%" }}>

            </View>

            <View style={{
                height: 50,
                width: "90%",
                backgroundColor: "#ffffff",
                borderRadius: 11,
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: "2%",
                justifyContent: "space-between"
            }}>
                <View style={{ height: 30, width: 30, backgroundColor: "#eee", borderRadius: 15, padding: 3, marginRight: 5 }}>
                    <Image
                        source={picts.fingerprint}
                        resizeMode="center"
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </View>

                <TextInput style={{
                    backgroundColor: 'transparent',
                    fontSize: 17,
                    height: 30,
                    width: "80%",
                    color: '#661400',
                }}
                    placeholderTextColor={'#aaa'}
                    placeholder={'Mot de passe'}
                    value={password}
                    secureTextEntry={secure}
                    onChangeText={text => setPassword(text)}
                />

                <TouchableOpacity style={
                    {
                        height: 30,
                        width: 30,
                        backgroundColor: "transparent",
                        padding: 3
                    }
                } onPress={() => setSecure(se => !se)}>
                    <Ionicons name={secure ? "eye-off" : "eye"} size={20} color={'#aaa'} />

                </TouchableOpacity>
            </View>



            <View style={{ height: "5%" }}>

            </View>

            <LinearGradient
                style={
                    {
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 1,
                        shadowColor: '#eee',
                        elevation: 3,
                        zIndex: 20,
                        borderRadius: 17,
                        width: "40%",
                        alignSelf: "center"
                    }
                }
                colors={["#000", "red"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1.5, y: 1 }}
            >
                <TouchableOpacity
                    style={{
                        paddingVertical: 12,
                        justifyContent: "center",
                        alignItems: "center"

                    }}
                    onPress={() => Connect()}
                >
                    {isloaded ?
                        <ActivityIndicator
                            visible={isloaded}
                            color="#fff"
                        /> :

                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Connexion</Text>
                    }

                </TouchableOpacity>
            </LinearGradient>

        </View>

    )
}

const hilai = StyleSheet.create({
    container: {
        backgroundColor: '#17052e',
        height: "100%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'scroll'
    },

});