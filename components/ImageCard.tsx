import { Image, StyleSheet, Text, useColorScheme, View } from "react-native";
import { Wallpapers } from "@/hooks/useWallpapers";
import { ThemedText } from "./ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ImageCard({
  wallpaper,
  onPress,
}: {
  wallpaper: Wallpapers;
  onPress: () => void;
}) {
  const theme = useColorScheme() ?? "light";

  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        {/* Display Image */}
        <Image
          source={{ uri: wallpaper.url }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.gradientOverlay}
        />

        {/* Bottom Container */}
        <View style={styles.infoContainer}>
          <ThemedText style={styles.label}>{wallpaper.name}</ThemedText>
          <Ionicons
            name={"heart-outline"}
            size={20}
            color={theme === "light" ? "#FFF" : "#F0F0F0"}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  label: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
