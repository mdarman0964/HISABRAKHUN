import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { colors, borderRadius } from '../theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gradientColors?: string[];
  intensity?: 'light' | 'medium' | 'heavy';
  animated?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  gradientColors = ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)'],
  intensity = 'medium',
  animated = true,
}) => {
  const intensityMap = {
    light: 0.05,
    medium: 0.1,
    heavy: 0.2,
  };

  const CardWrapper = animated ? MotiView : View;

  return (
    <CardWrapper
      from={animated ? { opacity: 0, translateY: 20 } : undefined}
      animate={animated ? { opacity: 1, translateY: 0 } : undefined}
      transition={animated ? { type: 'spring', damping: 15 } : undefined}
      style={[styles.container, style]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradient,
          { opacity: intensityMap[intensity] },
        ]}
      >
        {children}
      </LinearGradient>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  gradient: {
    padding: 16,
  },
});
