// SignatureDrawing.js
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    PanResponder,
    View,
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { StatusBar } from "expo-status-bar";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { picts, routx } from "../utilitis";
import ViewShot from "react-native-view-shot";

const { width, height } = Dimensions.get('window');

const GesturePath = ({ path }) => {
    const points = path.map(p => `${p.x},${p.y}`).join(' ');
    return (
        <View style={styles.signatureContainer}>
            <Svg height="100%" width="100%" viewBox={`0 0 ${width} 300`}>
                <Polyline
                    points={points}
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                />
            </Svg>
        </View>
    );
};

const GestureRecorder = ({ onPathChanged, setHeight, resetFlag }) => {
    const pathRef = useRef([]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                if (resetFlag.current === "reset") {
                    pathRef.current = [];
                    resetFlag.current = "";
                }
            },
            onPanResponderMove: (event) => {
                pathRef.current.push({
                    x: event.nativeEvent.locationX,
                    y: event.nativeEvent.locationY,
                });
                onPathChanged([...pathRef.current]);
            },
            onPanResponderRelease: () => {
                onPathChanged([...pathRef.current]);
                setHeight(pathRef.current.length > 5);
            }
        })
    ).current;

    return (
        <View
            style={styles.gestureRecorder}
            {...panResponder.panHandlers}
        />
    );
};

const SignatureDrawing = ({ navigation, route }) => {
    const { ida, iie } = route.params;
    
    const [path, setPath] = useState([]);
    const [isHeightSufficient, setHeight] = useState(false);
    const resetFlag = useRef("");
    const ref = useRef();

    const resetPath = () => {
        resetFlag.current = "reset";
        setPath([]);
    };

    const shotScreen = () => {
        ref.current.capture().then(uri => {
            convertSvgToImage(uri)
        });

    }



    const convertSvgToImage = async (svgContent) => {
        const imageBuffer = await FileSystem.readAsStringAsync(svgContent, {
            encoding: 'base64',
        });

        const response = await axios.post(`${routx.Baseurl}/boutique/uploadImage`, {
            ima: imageBuffer,
            nam: 'signature.png',
            old_image: null
        });
        if (response.data.ima) {
            const respon = await axios.put(`${routx.Baseurl}/BefreeAgriculter/updateBefreeAgrulter/${ida}`, {
                signature: response.data.ima,
                qrcode: iie,
            });
            if(respon.data.done){
                navigation.goBack()
            }else{
                alert("échèc")
            };
        } else {
            alert("échèc")
        }


    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" backgroundColor="transparent" />
            <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={25} style={{ fontWeight: "bold" }} color={'#007bff'} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Signez a la main sur l'écran</Text>
            </TouchableOpacity>

            <ViewShot ref={ref} options={{ format: 'png', quality: 1 }} >
                {path.length > 0 && <GesturePath path={path} />}
                <GestureRecorder onPathChanged={setPath} setHeight={setHeight} resetFlag={resetFlag} />
            </ViewShot>


            {path.length > 0 &&
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.validateButton} onPress={() => shotScreen()}>
                        <Text style={styles.validateButtonText}>Valider</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.clearButton} onPress={resetPath}>
                        <Text style={styles.clearButtonText}>Effacer</Text>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "#fff"
    },
    header: {
        height: 70,
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: "5%",
        alignItems: "center",
        top: Platform.OS === "android" ? 50: 0,
    },
    backButton: {
        paddingHorizontal: 5,
        backgroundColor: "#eee",
        borderRadius: 10,
        width: 40,
        marginRight: "5%"
    },
    headerText: {
        color: "#007fbb",
        fontSize: 22,
        fontWeight: "bold"
    },
    signatureContainer: {
        marginVertical: "29%",
        height: 400,
        width: 400,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "green",
        backgroundColor: "#fff"
    },
    gestureRecorder: {
        alignItems: "center",
        marginVertical: "29%",
        justifyContent: "center",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#aaa",
        height: 400,
        width: 400,
        alignSelf: "center",
        position: "absolute",
        zIndex: 753
    },
    footer: {
        height: 70,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "5%",
        alignItems: "center",
    },
    validateButton: {
        padding: 10,
        backgroundColor: "#eee",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    validateButtonText: {
        color: "#007bff",
        fontSize: 20,
        textAlign: "center",
    },
    clearButton: {
        padding: 10,
        backgroundColor: "#eee",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    clearButtonText: {
        color: "#aaa",
        fontSize: 20,
        textAlign: "center",
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        height: "50%",
        position: "absolute",
        backgroundColor: "#eee",
        zIndex: 9999,
        width: "100%",
        alignSelf: "center",
    },
    imagePreview: {
        width: width * 0.8,
        height: 300,
        borderWidth: 1,
        borderColor: 'black',
    }
});

export default SignatureDrawing;
