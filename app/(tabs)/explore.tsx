import React, { useState, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { DownloadPicture } from "@/components/BottomSheet";
import ImageCard from "@/components/ImageCard";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import useWallpapers, { Wallpapers } from "@/hooks/useWallpapers";

export default function Explore() {
  const wallpapers = useWallpapers();
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpapers | null>(null);
  const { colors } = useTheme();

  const renderItem = useCallback(({ item, index }: { item: Wallpapers; index: number }) => (
    <MotiView
      from={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: 'timing',
        duration: 650,
        easing: Easing.out(Easing.quad),
        delay: index * 100,
      }}
      style={styles.imageContainer}
    >
      <ImageCard
        wallpaper={item}
        onPress={() => setSelectedWallpaper(item)}
      />
    </MotiView>
  ), []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <ParallaxScrollView
        headerBackgroundColor={{ dark: colors.background, light: colors.background }}
        headerImage={
          <Image
            style={styles.headerImage}
            source={{
              uri: "https://ideogram.ai/assets/progressive-image/balanced/response/FQGWyuXsSDqLMma0dEcbMQ",
            }}
            resizeMode="cover"
          />
        }
        parallaxHeaderHeight={300}
        renderForeground={() => (
          <BlurView intensity={80} style={styles.blurContainer}>
            <Animated.Text style={[styles.titleText, { color: colors.text }]}>
              Explore Wallpapers
            </Animated.Text>
          </BlurView>
        )}
      >
        <View style={styles.gridContainer}>
          <FlatList
            data={wallpapers}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            numColumns={2}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ParallaxScrollView>

      {selectedWallpaper && (
        <DownloadPicture
          onClose={() => setSelectedWallpaper(null)}
          wallpaper={selectedWallpaper}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    flex: 1,
    height: 300,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  gridContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    flex: 1,
    margin: 8,
  },
});
