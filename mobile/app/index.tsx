import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Bus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Landing() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-8 py-12 items-center justify-between">
        <View className="items-center mt-20">
          <LinearGradient
            colors={['#7c3aed', '#4f46e5']}
            className="p-6 rounded-3xl"
          >
            <Bus color="white" size={64} />
          </LinearGradient>
          <Text className="text-4xl font-black text-slate-900 mt-8">YatraSewa</Text>
          <Text className="text-lg text-slate-500 mt-2 text-center">
            Your Journey, Simplified.
          </Text>
        </View>

        <View className="w-full space-y-4">
          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            className="w-full py-5 bg-purple-600 rounded-3xl shadow-lg shadow-purple-200 flex-row justify-center items-center"
          >
            <Text className="text-white text-lg font-bold">Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(auth)/register')}
            className="w-full py-5 border-2 border-slate-100 rounded-3xl flex-row justify-center items-center"
          >
            <Text className="text-slate-900 text-lg font-bold">Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
