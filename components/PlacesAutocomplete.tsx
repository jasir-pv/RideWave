import { GoogleInputProps } from "@/types/type";
import axios from "axios";
import React from "react";
import { View, TextInput, Text, TouchableOpacity, FlatList } from "react-native";
import { debounce } from 'lodash'

interface GeoapifyProps {
    features: {
        properties: {
            datasource: {
                lat?: number;
                lng?: number;
                address_line1?: string;
            };
        };
        geometry: {
            coordinates: [number, number];
        };
    }[];
    query: object;
}
export default function PlacesAutocomplete({
    containerStyle,
    handlePress
}: GoogleInputProps) {

    const key = `${process.env.EXPO_PUBLIC_GEOAPIFY_AUTOCOMPLETE_KEY}`

    const [query, setquery] = React.useState('')

    const [suggestions, setsuggestions] = React.useState<GeoapifyProps | null>(null)

    const fetchsuggestions = async (text: string) => {
        if (text.length < 3) {
            setsuggestions(null)
            return;
        }
        try {
            const encoded = encodeURIComponent(query)
            const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encoded}&apiKey=${key}`)

            console.log(response.status)
            console.log(response.data)
            setsuggestions(response.data)

        } catch (err) {
            console.error('i am in error block');
            console.log(err);
        }
    }
    const debouncedSuggestions = React.useCallback(debounce(fetchsuggestions, 700), [])

    const handleInputChange = (text: string) => {
        setquery(text);
        debouncedSuggestions(text)
    }
    return (
        <View className={`flex flex-row items-center justify-center relative z-10 rounded-lg ${containerStyle} mb-5`}>
            <TextInput
                value={query}
                onChangeText={handleInputChange}
                placeholder="Search a location..."
                className="h-20 border-2 border-cyan-700 px-3 w-full"
            />
            {suggestions?.features.length !== undefined &&
                suggestions.features.length > 0 && (
                    <FlatList
                        data={suggestions.features}
                        // keyExtractor={(item)=>item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handlePress({
                                    latitude: item.properties.datasource.lat!,
                                    longitude: item.properties.datasource.lng!,
                                    address: item.properties.datasource.address_line1!
                                })}
                            >
                                <Text>
                                    {item.properties.datasource.address_line1}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
        </View>
    )
}