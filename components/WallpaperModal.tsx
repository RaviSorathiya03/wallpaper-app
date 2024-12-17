import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';

const { width, height } = Dimensions.get('window');

export default function WallpaperModal({ wallpaper, onClose, isDarkMode }) {
  const dynamicTextColor = isDarkMode ? '#FFFFFF' : '#000000';
  const dynamicSubTextColor = isDarkMode ? '#DDDDDD' : '#666666';

  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      <BlurView
        intensity={80}
        tint={isDarkMode ? 'dark' : 'light'}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View
          style={{
            width: width * 0.9,
            backgroundColor: isDarkMode
              ? 'rgba(0, 0, 0, 0.7)'
              : 'rgba(255, 255, 255, 0.9)',
            borderRadius: 20,
            overflow: 'hidden',
            paddingBottom: 20,
            elevation: 5,
          }}
        >
          {/* Wallpaper Image */}
          <Image
            source={{ uri: wallpaper.url }}
            style={{
              width: '100%',
              height: height * 0.4,
            }}
          />

          {/* Info Container */}
          <View style={{ paddingHorizontal: 15, paddingTop: 15 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: dynamicTextColor,
                textAlign: 'center',
                marginBottom: 10,
              }}
            >
              {wallpaper.name}
            </Text>

            {/* Stats */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 20,
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <Ionicons name="heart" size={24} color="#ff6b6b" />
                <Text style={{ color: dynamicSubTextColor, marginTop: 5 }}>
                  {wallpaper.likes}
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Ionicons name="cloud-download" size={24} color="#74b9ff" />
                <Text style={{ color: dynamicSubTextColor, marginTop: 5 }}>
                  {wallpaper.downloads}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {[
                { name: 'share-outline', color: '#74b9ff', text: 'Share' },
                { name: 'trash-outline', color: '#ff6b6b', text: 'Delete' },
                { name: 'color-wand-outline', color: '#7bed9f', text: 'Edit' },
              ].map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor: action.color,
                    borderRadius: 12,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    flex: 1,
                    marginHorizontal: 5,
                  }}
                >
                  <Ionicons name={action.name} size={24} color="#fff" />
                  <Text style={{ color: '#fff', marginTop: 5 }}>{action.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Close Button */}
        <TouchableOpacity
          onPress={onClose}
          style={{
            position: 'absolute',
            top: 40,
            right: 20,
            backgroundColor: isDarkMode
              ? 'rgba(255, 255, 255, 0.2)'
              : 'rgba(0, 0, 0, 0.2)',
            borderRadius: 20,
            padding: 10,
          }}
        >
          <Ionicons name="close" size={24} color={dynamicTextColor} />
        </TouchableOpacity>
      </BlurView>
    </MotiView>
  );
}
