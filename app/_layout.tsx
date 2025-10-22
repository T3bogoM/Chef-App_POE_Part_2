import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { MenuProvider } from '@/context/MenuContext';
import { CourseSelectionProvider } from '@/context/CourseSelectionContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <MenuProvider>
      <CourseSelectionProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            <Stack.Screen name="add-menu-item" options={{ title: 'Add Menu Item', headerShown: true }} />
            <Stack.Screen name="courses" options={{ title: 'Courses', headerShown: true }} />
            <Stack.Screen name="course-selection" options={{ title: 'Select Course', headerShown: true }} />
            <Stack.Screen name="course-details/[course]" options={{ title: 'Course Details', headerShown: true }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </CourseSelectionProvider>
    </MenuProvider>
  );
}
