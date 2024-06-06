import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function DetailScreen({ navigation, route }) {
    const { enrol } = route.params;

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
                <Text style={hilai.input_self}>{enrol.identifiant_interne_exploitation}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Numéro Etat Civil</Text>
                <Text style={hilai.input_self}>{enrol.numero_etat_civil}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Numéro Piece Identite</Text>
                <Text style={hilai.input_self}>{enrol.numero_piece_identite}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Numéro Sécurité Sociale</Text>
                <Text style={hilai.input_self}>{enrol.numero_securite_sociale}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Localité</Text>
                <Text style={hilai.input_self}>{enrol.localite.name}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>District</Text>
                <Text style={hilai.input_self}>{enrol.district.name}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Région Inspection</Text>
                <Text style={hilai.input_self}>{enrol.region_inspection.name}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Superficie Exploitation</Text>
                <Text style={hilai.input_self}>{enrol.superficie_exploitation}</Text>
            </View>



            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Nombre Unité Agricole</Text>
                <Text style={hilai.input_self}>{enrol.nombre_unite_agricole}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Nombre Culture Certifiées</Text>
                <Text style={hilai.input_self}>{enrol.nombre_culture_certifiees}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Prénom</Text>
                <Text style={hilai.input_self}>{enrol.prenom}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Nom</Text>
                <Text style={hilai.input_self}>{enrol.nom}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Numéro Téléphone</Text>
                <Text style={hilai.input_self}>{enrol.numero_telephone}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Numéro Identification National</Text>
                <Text style={hilai.input_self}>{enrol.numero_identification_national}</Text>
            </View>


            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Année de Naissance</Text>
                <Text style={hilai.input_self}>{enrol.annee_naissance}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Prénom Propriétaire Exploitation</Text>
                <Text style={hilai.input_self}>{enrol.prenom_proprietaire_exploitation}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Nom Propriétaire Exploitation</Text>
                <Text style={hilai.input_self}>{enrol.nom_proprietaire_exploitation}</Text>
            </View>

            <View style={hilai.inpt_contaner}>
                <Text style={hilai.text_self}>Numéro Téléphone Propriétaire Exploitation</Text>
                <Text style={hilai.input_self}>{enrol.numero_telephone_proprietaire_exploitation}</Text>
            </View>
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