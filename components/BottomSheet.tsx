import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Wallpapers } from '@/hooks/useWallpapers';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export const DownloadPicture = ({
  onClose,
  wallpaper,
}: {
  onClose: () => void;
  wallpaper: Wallpapers;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadProgress = useRef(new Animated.Value(0)).current;

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose();
    }
  }, [onClose]);

  const handleDownload = useCallback(() => {
    setIsDownloading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Simulate download progress
    Animated.timing(downloadProgress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      setIsDownloading(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    });
  }, [downloadProgress]);

  const progressWidth = downloadProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <BlurView intensity={80} style={StyleSheet.absoluteFill}>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[height * 0.9]}
          onChange={handleSheetChanges}
          enablePanDownToClose={true}
          handleIndicatorStyle={styles.handleIndicator}
          backgroundStyle={styles.sheetBackground}
          index={0}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: wallpaper.url }}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.gradient}
              >
                <Text style={styles.wallpaperName}>{wallpaper.name}</Text>
              </LinearGradient>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.statItem}>
                <Ionicons name="heart" size={24} color="#FF6B6B" />
                <Text style={styles.statText}>{wallpaper.likes} Likes</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="download" size={24} color="#4CAF50" />
                <Text style={styles.statText}>{wallpaper.downloads} Downloads</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleDownload}
              disabled={isDownloading}
            >
              <Text style={styles.buttonText}>
                {isDownloading ? 'Downloading...' : 'Download Wallpaper'}
              </Text>
              {isDownloading && (
                <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
              )}
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      </BlurView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  handleIndicator: {
    height: 4,
    width: 60,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
  sheetBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.5,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  wallpaperName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    marginTop: 4,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 4,
    backgroundColor: '#4CAF50',
  },
});

