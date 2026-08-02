import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Bus, Bell, Gift, Wallet, ArrowRight, Ticket } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Dashboard() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-100">
          <View className="flex-row items-center space-x-2">
            <View className="p-2 bg-purple-600 rounded-xl">
              <Bus color="white" size={20} />
            </View>
            <Text className="text-xl font-black text-slate-900 ml-2">YatraSewa</Text>
          </View>
          <TouchableOpacity className="p-2 bg-slate-50 rounded-full">
            <Bell color="#64748b" size={24} />
          </TouchableOpacity>
        </View>

        {/* Loyalty Card */}
        <View className="p-6">
          <LinearGradient
            colors={['#7c3aed', '#4f46e5']}
            className="p-8 rounded-[40px] shadow-xl shadow-purple-200"
          >
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-purple-200 text-xs font-bold uppercase tracking-widest">Yatra Points</Text>
                <Text className="text-white text-4xl font-black mt-2">1,250</Text>
              </View>
              <Gift color="white" size={32} opacity={0.5} />
            </View>
            <View className="mt-8 pt-6 border-t border-purple-400/30 flex-row justify-between items-center">
              <View>
                <Text className="text-purple-200 text-[10px] font-bold uppercase">Redeemable Value</Text>
                <Text className="text-white font-bold mt-1">NPR 125.00</Text>
              </View>
              <TouchableOpacity className="bg-white/20 px-4 py-2 rounded-full">
                <Text className="text-white font-bold text-xs">Redeem</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View className="flex-row px-6 space-x-4">
          <View className="flex-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Wallet color="#10b981" size={24} />
            <Text className="text-slate-400 text-xs font-bold uppercase mt-4">Wallet</Text>
            <Text className="text-slate-900 text-lg font-black mt-1">NPR 500</Text>
          </View>
          <View className="flex-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <Bus color="#3b82f6" size={24} />
            <Text className="text-slate-400 text-xs font-bold uppercase mt-4">Trips</Text>
            <Text className="text-slate-900 text-lg font-black mt-1">12 Total</Text>
          </View>
        </View>

        {/* Search Call-to-action */}
        <View className="p-6">
          <TouchableOpacity className="bg-slate-900 p-8 rounded-[40px] flex-row justify-between items-center shadow-xl shadow-slate-200">
            <View>
              <Text className="text-white text-2xl font-black">Book Your Next{'\n'}Journey</Text>
              <Text className="text-slate-400 mt-2">120+ Operators available</Text>
            </View>
            <View className="w-14 h-14 bg-purple-600 rounded-2xl items-center justify-center">
              <ArrowRight color="white" size={28} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Upcoming Trip Placeholder */}
        <View className="px-6 mb-12">
          <Text className="text-lg font-black text-slate-900 mb-4">Upcoming Trip</Text>
          <View className="bg-white p-8 rounded-[40px] border border-slate-100 items-center">
             <View className="w-16 h-16 bg-slate-50 rounded-full items-center justify-center mb-4">
                <Ticket color="#cbd5e1" size={32} />
             </View>
             <Text className="text-slate-900 font-bold">No upcoming trips</Text>
             <Text className="text-slate-400 text-sm mt-1">Start by searching for a bus</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
