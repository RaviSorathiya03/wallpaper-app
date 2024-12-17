import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { DownloadPicture } from '@/components/BottomSheet';
import { StatusBar } from 'expo-status-bar';

const AccountStat = ({ label, value }) => (
  <Animated.View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </Animated.View>
);

const QuickActionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.quickActionButton} onPress={onPress}>
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.quickActionGradient}
    >
      <Ionicons name={icon} size={24} color="#ffffff" />
    </LinearGradient>
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);

export default function Account() {
  const [openPicture, setPictureOpen] = useState(false);
  const scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [200, 100],
    extrapolate: 'clamp',
  });

  const imageSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 60],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.headerGradient, { height: headerHeight }]}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={StyleSheet.absoluteFill}
          >
            <BlurView intensity={20} style={styles.profileContainer}>
              <Animated.Image
                source={{ uri: 'https://example.com/profile-picture.jpg' }}
                style={[styles.profilePicture, { width: imageSize, height: imageSize }]}
              />
              <Animated.Text style={[styles.username, { fontSize: scrollY.interpolate({
                inputRange: [0, 100],
                outputRange: [24, 20],
                extrapolate: 'clamp',
              }) }]}>John Doe</Animated.Text>
              <Text style={styles.userHandle}>@johndoe</Text>
            </BlurView>
          </LinearGradient>
        </Animated.View>

        <View style={styles.statsContainer}>
          <AccountStat label="Wallpapers" value="247" />
          <AccountStat label="Downloads" value="1.2K" />
          <AccountStat label="Likes" value="5.7K" />
        </View>

        <View style={styles.quickActionsContainer}>
          <QuickActionButton icon="create-outline" label="Edit Profile" onPress={() => {}} />
          <QuickActionButton icon="settings-outline" label="Settings" onPress={() => {}} />
          <QuickActionButton icon="heart-outline" label="Favorites" onPress={() => {}} />
          <QuickActionButton icon="cloud-upload-outline" label="Upload" onPress={() => {}} />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {/* Add your recent activity list here */}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <LinearGradient
            colors={['#ff6b6b', '#ff3b30']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoutGradient}
          >
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.ScrollView>

      {openPicture && (
        <DownloadPicture
          onClose={() => setPictureOpen(false)}
          wallpaper={{ url: 'https://example.com/wallpaper.jpg', name: 'Sample Wallpaper' }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profilePicture: {
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  username: {
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  userHandle: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  quickActionButton: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    margin: 8,
    width: '45%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionLabel: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  sectionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  logoutButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  logoutGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

