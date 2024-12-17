import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { MotiView, AnimatePresence, useAnimationState } from 'moti';
import WallpaperModal from '@/components/WallpaperModal';
import { useTheme } from '@/components/ThemeContent';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const ITEM_WIDTH = width / COLUMN_COUNT;

// Mock data for demonstration
const mockWallpapers = [
    { id: '1', url: 'https://images.pexels.com/photos/29579097/pexels-photo-29579097/free-photo-of-young-woman-photographer-in-istanbul-archway.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', name: 'Sunset Beach' },
    { id: '2', url: 'https://images.pexels.com/photos/29535902/pexels-photo-29535902/free-photo-of-charming-venetian-gondolas-on-canal-in-venice.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', name: 'Mountain Peak' },
    { id: '3', url: 'https://images.pexels.com/photos/19600180/pexels-photo-19600180/free-photo-of-christmas-trees-in-the-hotel-lobby.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', name: 'City Lights' },
    { id: '4', url: 'https://images.pexels.com/photos/28506418/pexels-photo-28506418/free-photo-of-traditional-thai-huts-in-lush-koh-phangan-landscape.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', name: 'Forest Path' },
    { id: '5', url: 'https://images.pexels.com/photos/27244374/pexels-photo-27244374/free-photo-of-car-by-maelifell-on-iceland.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', name: 'Ocean Waves' },
    { id: '6', url: 'https://images.pexels.com/photos/29806391/pexels-photo-29806391/free-photo-of-energetic-australian-shepherd-playing-with-ball.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', name: 'Desert Dunes' },
  ];

export default function Library() {
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [sortBy, setSortBy] = useState('name'); // 'name', 'downloads', or 'likes'
  const { isDarkMode, toggleTheme } = useTheme();

  const sortedWallpapers = [...mockWallpapers].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return b[sortBy] - a[sortBy];
  });

  const animationState = useAnimationState({
    from: {
      opacity: 0,
      scale: 0.8,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
  });

  const renderItem = ({ item, index }) => (
    <MotiView
      state={animationState}
      transition={{ type: 'timing', duration: 500, delay: index * 100 }}
    >
      <TouchableOpacity
        style={[styles.itemContainer, { backgroundColor: isDarkMode ? '#2c2c2c' : '#f0f0f0' }]}
        onPress={() => setSelectedWallpaper(item)}
      >
        <Image source={{ uri: item.url }} style={styles.wallpaperImage} />
        <BlurView intensity={80} tint={isDarkMode ? 'dark' : 'light'} style={styles.infoContainer}>
          <Text style={[styles.wallpaperName, { color: isDarkMode ? '#fff' : '#000' }]}>{item.name}</Text>
          <View style={styles.statsContainer}>
            <Ionicons name="heart" size={12} color={isDarkMode ? '#ff6b6b' : '#e74c3c'} />
            <Text style={[styles.statsText, { color: isDarkMode ? '#ddd' : '#666' }]}>{item.likes}</Text>
            <Ionicons name="cloud-download" size={12} color={isDarkMode ? '#74b9ff' : '#3498db'} />
            <Text style={[styles.statsText, { color: isDarkMode ? '#ddd' : '#666' }]}>{item.downloads}</Text>
          </View>
        </BlurView>
      </TouchableOpacity>
    </MotiView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9' }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>My Library</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.sortButton} onPress={() => {
            setSortBy(sortBy === 'name' ? 'downloads' : sortBy === 'downloads' ? 'likes' : 'name');
          }}>
            <Ionicons name="funnel" size={24} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          />
        </View>
      </View>
      <Text style={[styles.sortText, { color: isDarkMode ? '#ddd' : '#666' }]}>
        Sorted by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
      </Text>
      <FlatList
        data={sortedWallpapers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.listContent}
      />
      <AnimatePresence>
        {selectedWallpaper && (
          <WallpaperModal
            wallpaper={selectedWallpaper}
            onClose={() => setSelectedWallpaper(null)}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  sortButton: {
    padding: 8,
    marginRight: 10,
  },
  sortText: {
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  itemContainer: {
    width: ITEM_WIDTH - 20,
    aspectRatio: 9 / 16,
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  wallpaperImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  wallpaperName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 12,
    marginLeft: 4,
    marginRight: 8,
  },
});

