import React, { useState } from "react";
import { View, Picker, StyleSheet, Text } from "react-native";

export default function App() {
    const [selectedValue, setSelectedValue] = useState("Homme");
    return (

        <View style={stylespiker.container}>
            <Text style={stylespiker.MyText}>Sexe : </Text>
            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150} }
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="Homme" value="Homme" />
                <Picker.Item label="Femme" value="Femme" />
            </Picker>
        </View>
    );
}

const stylespiker = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    },
    MyText :{
        alignItems: "center"
    },
});
