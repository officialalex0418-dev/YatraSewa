import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, ChevronLeft, Bus } from 'lucide-react-native';
import { useAppDispatch } from '../../hooks/redux';

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 p-2 w-10 h-10 items-center justify-center bg-slate-50 rounded-xl"
          >
            <ChevronLeft color="#64748b" size={24} />
          </TouchableOpacity>

          <View className="items-center mt-12 mb-12">
            <View className="p-4 bg-purple-600 rounded-3xl mb-6">
              <Bus color="white" size={32} />
            </View>
            <Text className="text-3xl font-black text-slate-900">Sign In</Text>
            <Text className="text-slate-500 mt-2">Welcome back to YatraSewa</Text>
          </View>

          <View className="space-y-6">
            <View className="space-y-2">
              <Text className="text-sm font-bold text-slate-700 ml-1">Email Address</Text>
              <View className="relative">
                <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                  <Mail color="#94a3b8" size={18} />
                </View>
                <TextInput
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-3xl"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View className="space-y-2">
              <Text className="text-sm font-bold text-slate-700 ml-1">Password</Text>
              <View className="relative">
                <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                  <Lock color="#94a3b8" size={18} />
                </View>
                <TextInput
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-3xl"
                  secureTextEntry
                />
              </View>
            </View>

            <TouchableOpacity
              className="w-full py-5 bg-purple-600 rounded-3xl shadow-lg shadow-purple-200 flex-row justify-center items-center mt-4"
              onPress={() => router.replace('/(tabs)/dashboard')}
            >
              <Text className="text-white text-lg font-bold">Sign In</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-auto py-8">
            <Text className="text-center text-slate-500">
              Don't have an account? {' '}
              <Text
                onPress={() => router.push('/(auth)/register')}
                className="text-purple-600 font-black"
              >
                Create one
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
