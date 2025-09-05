// src/utils/animations.js

import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
  withRepeat,
  Easing,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

// Button press animation hooks
export const useButtonAnimation = (disabled = false) => {
  const pressed = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(disabled ? 0.6 : 1);

  // Handle press animations
  const handlePressIn = () => {
    pressed.value = 1;
    scale.value = withSpring(0.95, {damping: 10, stiffness: 200});
    opacity.value = withTiming(0.9, {duration: 150});
  };

  const handlePressOut = () => {
    pressed.value = 0;
    scale.value = withSpring(1, {damping: 10, stiffness: 200});
    opacity.value = withTiming(disabled ? 0.6 : 1, {duration: 150});
  };

  // Update animation values when disabled state changes
  const updateDisabledState = isDisabled => {
    if (isDisabled) {
      scale.value = 1;
      opacity.value = 0.6;
    } else {
      opacity.value = 1;
    }
  };

  // Container animation style
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: opacity.value,
    };
  });

  // Shadow animation style
  const animatedShadowStyle = useAnimatedStyle(() => {
    const elevation = interpolate(
      pressed.value,
      [0, 1],
      [5, 2],
      Extrapolate.CLAMP,
    );

    return {
      elevation,
      shadowOpacity: interpolate(
        pressed.value,
        [0, 1],
        [0.25, 0.15],
        Extrapolate.CLAMP,
      ),
      shadowRadius: interpolate(
        pressed.value,
        [0, 1],
        [8, 3],
        Extrapolate.CLAMP,
      ),
    };
  });

  return {
    pressed,
    scale,
    opacity,
    handlePressIn,
    handlePressOut,
    updateDisabledState,
    animatedContainerStyle,
    animatedShadowStyle,
  };
};

// Bounce animation for loading indicators
export const useLoadingAnimation = () => {
  const bounce1 = useSharedValue(0);
  const bounce2 = useSharedValue(0);
  const bounce3 = useSharedValue(0);

  const startLoadingAnimation = () => {
    // Animation logic for dots
    // (We'll use CSS animation in the component instead)
  };

  return {
    startLoadingAnimation,
  };
};

// Scale animation (can be used for various UI elements)
export const useScaleAnimation = (initialScale = 1) => {
  const scale = useSharedValue(initialScale);

  const scaleUp = (toValue = 1.1, config = {duration: 300}) => {
    scale.value = withSpring(toValue, {
      damping: 10,
      stiffness: 100,
      ...config,
    });
  };

  const scaleDown = (toValue = 1, config = {duration: 300}) => {
    scale.value = withSpring(toValue, {
      damping: 10,
      stiffness: 100,
      ...config,
    });
  };

  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return {
    scale,
    scaleUp,
    scaleDown,
    scaleStyle,
  };
};

// Fade animation
export const useFadeAnimation = (initialOpacity = 1) => {
  const opacity = useSharedValue(initialOpacity);

  const fadeIn = (duration = 300) => {
    opacity.value = withTiming(1, {duration});
  };

  const fadeOut = (duration = 300) => {
    opacity.value = withTiming(0, {duration});
  };

  const fadeTo = (value, duration = 300) => {
    opacity.value = withTiming(value, {duration});
  };

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return {
    opacity,
    fadeIn,
    fadeOut,
    fadeTo,
    fadeStyle,
  };
};

// Slide animation (useful for modals, drawers, etc.)
export const useSlideAnimation = (initialPosition = {x: 0, y: 0}) => {
  const position = {
    x: useSharedValue(initialPosition.x),
    y: useSharedValue(initialPosition.y),
  };

  const slideTo = ({x, y} = {x: 0, y: 0}, config = {duration: 300}) => {
    if (x !== undefined) {
      position.x.value = withSpring(x, {
        damping: 15,
        stiffness: 150,
        ...config,
      });
    }
    if (y !== undefined) {
      position.y.value = withSpring(y, {
        damping: 15,
        stiffness: 150,
        ...config,
      });
    }
  };

  const slideStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: position.x.value},
        {translateY: position.y.value},
      ],
    };
  });

  return {
    position,
    slideTo,
    slideStyle,
  };
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Advanced custom easing functions for ultra-smooth animations
const customEasings = {
  // Smooth ease-out cubic
  smooth: Easing.bezier(0.33, 1, 0.68, 1),

  // Extra smooth ease-out quintic
  extraSmooth: Easing.bezier(0.22, 1, 0.36, 1),

  // Gentle elastic-like effect
  softElastic: Easing.bezier(0.25, 0.1, 0.25, 1),

  // Strong bounce effect
  strongBounce: Easing.bezier(0.34, 1.56, 0.64, 1),
};

// Common spring configurations
const springConfigs = {
  // Gentle spring with subtle bounce
  gentle: {
    damping: 15,
    mass: 1,
    stiffness: 90,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  },

  // Standard spring with moderate bounce
  standard: {
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  },

  // Bouncy spring with exaggerated effect
  bouncy: {
    damping: 8,
    mass: 1,
    stiffness: 80,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  },

  // Ultra smooth spring with minimal bounce
  ultraSmooth: {
    damping: 18,
    mass: 1,
    stiffness: 80,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  },
};

// ======= FADE ANIMATIONS =======

export const FadeIn = ({
  children,
  style,
  duration = 500,
  delay = 0,
  onAnimationComplete,
  useSpring = false,
  easing = 'extraSmooth',
}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Make the animation callback a worklet-safe operation
    const workletCallback = finished => {
      'worklet';
      if (finished && onAnimationComplete) {
        runOnJS(onAnimationComplete)();
      }
    };

    if (useSpring) {
      opacity.value = withDelay(
        delay,
        withSpring(1, springConfigs.ultraSmooth, workletCallback),
      );
    } else {
      opacity.value = withDelay(
        delay,
        withTiming(
          1,
          {
            duration,
            easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
          },
          workletCallback,
        ),
      );
    }
  }, [delay, duration, easing, onAnimationComplete, useSpring]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export const FadeOut = ({
  children,
  style,
  duration = 500,
  delay = 0,
  onAnimationComplete,
  useSpring = false,
  easing = 'extraSmooth',
}) => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    // Make the animation callback a worklet-safe operation
    const workletCallback = finished => {
      'worklet';
      if (finished && onAnimationComplete) {
        runOnJS(onAnimationComplete)();
      }
    };

    if (useSpring) {
      opacity.value = withDelay(
        delay,
        withSpring(0, springConfigs.ultraSmooth, workletCallback),
      );
    } else {
      opacity.value = withDelay(
        delay,
        withTiming(
          0,
          {
            duration,
            easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
          },
          workletCallback,
        ),
      );
    }
  }, [delay, duration, easing, onAnimationComplete, useSpring]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export const FadeInDown = ({
  children,
  style,
  duration = 600,
  delay = 0,
  distance = 50,
  onAnimationComplete,
  useSpring = true,
  easing = 'extraSmooth',
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-distance);

  useEffect(() => {
    // Make the animation callback a worklet-safe operation
    const workletCallback = finished => {
      'worklet';
      if (finished && onAnimationComplete) {
        runOnJS(onAnimationComplete)();
      }
    };

    if (useSpring) {
      opacity.value = withDelay(
        delay,
        withTiming(1, {
          duration: duration * 0.7,
          easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
        }),
      );

      translateY.value = withDelay(
        delay,
        withSpring(0, springConfigs.gentle, workletCallback),
      );
    } else {
      opacity.value = withDelay(
        delay,
        withTiming(1, {
          duration: duration * 0.7,
          easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
        }),
      );

      translateY.value = withDelay(
        delay,
        withTiming(
          0,
          {
            duration,
            easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
          },
          workletCallback,
        ),
      );
    }
  }, [delay, distance, duration, easing, onAnimationComplete, useSpring]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export const FadeInUp = ({
  children,
  style,
  duration = 600,
  delay = 0,
  distance = 50,
  onAnimationComplete,
  useSpring = true,
  easing = 'extraSmooth',
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(distance);

  useEffect(() => {
    // Make the animation callback a worklet-safe operation
    const workletCallback = finished => {
      'worklet';
      if (finished && onAnimationComplete) {
        runOnJS(onAnimationComplete)();
      }
    };

    if (useSpring) {
      opacity.value = withDelay(
        delay,
        withTiming(1, {
          duration: duration * 0.7,
          easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
        }),
      );

      translateY.value = withDelay(
        delay,
        withSpring(0, springConfigs.gentle, workletCallback),
      );
    } else {
      opacity.value = withDelay(
        delay,
        withTiming(1, {
          duration: duration * 0.7,
          easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
        }),
      );

      translateY.value = withDelay(
        delay,
        withTiming(
          0,
          {
            duration,
            easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
          },
          workletCallback,
        ),
      );
    }
  }, [delay, distance, duration, easing, onAnimationComplete, useSpring]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateY: translateY.value}],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export const FadeInLeft = ({
  children,
  style,
  duration = 600,
  delay = 0,
  distance = 50,
  onAnimationComplete,
  useSpring = true,
  easing = 'extraSmooth',
}) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-distance);

  useEffect(() => {
    // Make the animation callback a worklet-safe operation
    const workletCallback = finished => {
      'worklet';
      if (finished && onAnimationComplete) {
        runOnJS(onAnimationComplete)();
      }
    };

    if (useSpring) {
      opacity.value = withDelay(
        delay,
        withTiming(1, {
          duration: duration * 0.7,
          easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
        }),
      );

      translateX.value = withDelay(
        delay,
        withSpring(0, springConfigs.gentle, workletCallback),
      );
    } else {
      opacity.value = withDelay(
        delay,
        withTiming(1, {
          duration: duration * 0.7,
          easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
        }),
      );

      translateX.value = withDelay(
        delay,
        withTiming(
          0,
          {
            duration,
            easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
          },
          workletCallback,
        ),
      );
    }
  }, [delay, distance, duration, easing, onAnimationComplete, useSpring]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateX: translateX.value}],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export const FadeInRight = ({
  children,
  style,
  duration = 600,
  delay = 0,
  distance = 50,
  onAnimationComplete,
  useSpring = true,
  easing = 'extraSmooth',
}) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(distance);

  useEffect(() => {
    // Make the animation callback a worklet-safe operation
    const workletCallback = finished => {
      'worklet';
      if (finished && onAnimationComplete) {
        runOnJS(onAnimationComplete)();
      }
    };

    if (useSpring) {
      opacity.value = withDelay(
        delay,
        withTiming(1, {
          duration: duration * 0.7,
          easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
        }),
      );

      translateX.value = withDelay(
        delay,
        withSpring(0, springConfigs.gentle, workletCallback),
      );
    } else {
      opacity.value = withDelay(
        delay,
        withTiming(1, {
          duration: duration * 0.7,
          easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
        }),
      );

      translateX.value = withDelay(
        delay,
        withTiming(
          0,
          {
            duration,
            easing: customEasings[easing] || Easing.bezier(0.22, 1, 0.36, 1),
          },
          workletCallback,
        ),
      );
    }
  }, [delay, distance, duration, easing, onAnimationComplete, useSpring]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateX: translateX.value}],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

// ======= ZOOM ANIMATIONS =======

export const ZoomIn = ({
  children,
  style,
  duration = 600,
  delay = 0,
  onAnimationComplete,
  useSpring = true,
  easing = 'strongBounce',
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    // Make the animation callback a worklet-safe operation
    const workletCallback = finished => {
      'worklet';
      if (finished && onAnimationComplete) {
        runOnJS(onAnimationComplete)();
      }
    };

    if (useSpring) {
      scale.value = withDelay(
        delay,
        withSpring(1, springConfigs.bouncy, workletCallback),
      );
    } else {
      scale.value = withDelay(
        delay,
        withTiming(
          1,
          {
            duration,
            easing: customEasings[easing] || customEasings.strongBounce,
          },
          workletCallback,
        ),
      );
    }
  }, [delay, duration, easing, onAnimationComplete, useSpring]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export const ZoomOut = ({
  children,
  style,
  duration = 500,
  delay = 0,
  onAnimationComplete,
  useSpring = false,
  easing = 'smooth',
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    // Make the animation callback a worklet-safe operation
    const workletCallback = finished => {
      'worklet';
      if (finished && onAnimationComplete) {
        runOnJS(onAnimationComplete)();
      }
    };

    if (useSpring) {
      scale.value = withDelay(
        delay,
        withSpring(0, springConfigs.standard, workletCallback),
      );
    } else {
      scale.value = withDelay(
        delay,
        withTiming(
          0,
          {
            duration,
            easing: customEasings[easing] || customEasings.smooth,
          },
          workletCallback,
        ),
      );
    }
  }, [delay, duration, easing, onAnimationComplete, useSpring]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

// ======= ATTENTION SEEKING ANIMATIONS =======

export const Pulse = ({
  children,
  style,
  duration = 1000,
  delay = 0,
  repeat = true,
  minScale = 0.97,
  maxScale = 1.03,
  onAnimationComplete,
  useSpring = true,
}) => {
  const scale = useSharedValue(1);

  useEffect(() => {
    // Instead of nesting callbacks, use withRepeat for continuous animation
    if (repeat) {
      // For repeating animation, simplify the sequence
      if (useSpring) {
        scale.value = withDelay(
          delay,
          withRepeat(
            withSequence(
              withSpring(maxScale, {
                ...springConfigs.ultraSmooth,
                stiffness: 70,
                damping: 8,
              }),
              withSpring(minScale, {
                ...springConfigs.ultraSmooth,
                stiffness: 70,
                damping: 8,
              }),
              withSpring(1, {
                ...springConfigs.ultraSmooth,
                stiffness: 70,
                damping: 8,
              }),
            ),
            -1, // -1 for infinite repeat
            false, // don't reverse
          ),
        );
      } else {
        scale.value = withDelay(
          delay,
          withRepeat(
            withSequence(
              withTiming(maxScale, {
                duration: duration / 3,
                easing: customEasings.softElastic,
              }),
              withTiming(minScale, {
                duration: duration / 3,
                easing: customEasings.softElastic,
              }),
              withTiming(1, {
                duration: duration / 3,
                easing: customEasings.softElastic,
              }),
            ),
            -1, // -1 for infinite repeat
            false, // don't reverse
          ),
        );
      }
    } else {
      // Make the animation callback a worklet-safe operation
      const workletCallback = finished => {
        'worklet';
        if (finished && onAnimationComplete) {
          runOnJS(onAnimationComplete)();
        }
      };

      // For non-repeating animation, run it once with callback
      if (useSpring) {
        scale.value = withDelay(
          delay,
          withSequence(
            withSpring(maxScale, {
              ...springConfigs.ultraSmooth,
              stiffness: 70,
              damping: 8,
            }),
            withSpring(minScale, {
              ...springConfigs.ultraSmooth,
              stiffness: 70,
              damping: 8,
            }),
            withSpring(
              1,
              {
                ...springConfigs.ultraSmooth,
                stiffness: 70,
                damping: 8,
              },
              workletCallback,
            ),
          ),
        );
      } else {
        scale.value = withDelay(
          delay,
          withSequence(
            withTiming(maxScale, {
              duration: duration / 3,
              easing: customEasings.softElastic,
            }),
            withTiming(minScale, {
              duration: duration / 3,
              easing: customEasings.softElastic,
            }),
            withTiming(
              1,
              {
                duration: duration / 3,
                easing: customEasings.softElastic,
              },
              workletCallback,
            ),
          ),
        );
      }
    }

    return () => {
      // Reset animation when component unmounts
      scale.value = 1;
    };
  }, [
    delay,
    duration,
    maxScale,
    minScale,
    onAnimationComplete,
    repeat,
    useSpring,
  ]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

export const BounceIn = ({
  children,
  style,
  duration = 750,
  delay = 0,
  onAnimationComplete,
  useSpring = true,
}) => {
  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Make the animation callback a worklet-safe operation
    const workletCallback = finished => {
      'worklet';
      if (finished && onAnimationComplete) {
        runOnJS(onAnimationComplete)();
      }
    };

    // Animate opacity separately for a smoother effect
    opacity.value = withDelay(
      delay,
      withTiming(1, {duration: duration * 0.5, easing: customEasings.smooth}),
    );

    if (useSpring) {
      // For spring animation, use a more bouncy spring
      scale.value = withDelay(
        delay,
        withSpring(
          1,
          {
            ...springConfigs.bouncy,
            stiffness: 70, // Lowering stiffness increases bounciness
            damping: 6, // Lowering damping increases bounciness
          },
          workletCallback,
        ),
      );
    } else {
      // For timing animation, use a sequence to create bounce effect
      scale.value = withDelay(
        delay,
        withSequence(
          withTiming(1.1, {
            duration: duration * 0.4,
            easing: customEasings.strongBounce,
          }),
          withTiming(0.9, {
            duration: duration * 0.2,
            easing: customEasings.strongBounce,
          }),
          withTiming(1.03, {
            duration: duration * 0.2,
            easing: customEasings.strongBounce,
          }),
          withTiming(
            1,
            {duration: duration * 0.2, easing: customEasings.strongBounce},
            workletCallback,
          ),
        ),
      );
    }
  }, [delay, duration, onAnimationComplete, useSpring]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{scale: scale.value}],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
  );
};

// ======= EXPORT DEFAULT WITH ALL ANIMATIONS =======

export default {
  // Fade Animations
  FadeIn,
  FadeOut,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,

  // Zoom Animations
  ZoomIn,
  ZoomOut,

  // Attention Seeking Animations
  Pulse,
  BounceIn,
};
