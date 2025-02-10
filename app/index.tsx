import { Text, View , TextInput , FlatList, Image, StyleSheet, ActivityIndicator } from "react-native";
import {useState, useEffect } from "react-native";

const WayMate = () => {
    const [search, setSearch] = useState("");
    const [restaurants, setRestaurants] = useState([]);
    const [filterRestaurants, setFilterRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await fetch("https://codejudge-question-artifacts.s3.ap-south-1.amazonaws.com/q-1731/final.json");
                const  data = await response.json();
                setRestaurants(data.results);
                setFilterRestaurants(data.results);
                setLoading(false);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    }
                };
            fetchRestaurants();
            }, []);
        useEffect(() => {
            setFilterRestaurants(
                restaurants.filter((restaurants) =>
                restaurants.name.toLowercase().include(search.toLowercase())
                )
            );
        }, [search]);

    return (
        <View style ={styles.container}>
        <TextInput
        style ={styles.input}
        placeholder= "Search for a restaurants"
        value = {search}
        onChangeText={setSearch}
        />
        {loading ? (
           <ActivityIndicator size="large" color="#0000ff" />
            ): (
                <FlatList
                data={filterRestaurants}
                keyExtractor={(item) => item.name}
                renderItem = {({ item}) => (
                    <View style ={styles.item}>
                    <Image source = {{uri: item.image_url || "https://via.placeholder.com/100"}} style={styles.image} />
                    <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.category}>{item.category || "Dish"} </Text>
                    </View>
                    </View>
                    )}
                />
                )}
            </View>
            );
        };

    const styles = StyleSheet.create ({
        container:{ flex: 1,
            padding : 20,
            backgroundColor: "#fff"},

            input: {height: 50,
                borderColor: "#ccc",
                borderWidth: 1,borderRadius: 10 , paddingHorizontal: 15, marginBottom: 20},
                item: {flexDirection: "row", padding: 10},
                image: {width: 50 , height: 50, borderRadius:6},
                name:{fontSize: 18, fontWeight: "bold"},
                category: {fontSize: 14, color:"#555"},

                });

            export default WayMate;

