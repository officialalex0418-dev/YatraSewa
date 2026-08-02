import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { CheckCircle, Ticket, Download, Share2, Home } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function BookingSuccess() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-8 pt-12">
        {/* Success Header */}
        <View className="items-center mb-12">
          <View className="w-24 h-24 bg-emerald-50 rounded-full items-center justify-center mb-6">
            <CheckCircle color="#10b981" size={48} />
          </View>
          <Text className="text-3xl font-black text-slate-900 text-center">Booking{'\n'}Successful!</Text>
          <Text className="text-slate-500 mt-2 text-center">Your seats are confirmed. Pack your bags!</Text>
        </View>

        {/* Digital Ticket / QR Section */}
        <View className="bg-slate-50 p-8 rounded-[50px] border border-slate-100 mb-8 overflow-hidden">
          <View className="items-center mb-8">
             <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">Boarding Pass</Text>
             {/* QR Code Placeholder */}
             <View className="w-48 h-48 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm items-center justify-center">
                <View className="w-full h-full bg-slate-900 rounded-xl items-center justify-center">
                   <Text className="text-white text-[8px] font-mono opacity-50">QR CODE DATA: YS-72819-B</Text>
                </View>
             </View>
             <Text className="text-slate-900 font-bold mt-4">YS-72819-B</Text>
          </View>

          <View className="space-y-4 pt-6 border-t border-slate-200 border-dashed">
             <View className="flex-row justify-between">
                <Text className="text-slate-400 text-xs font-bold uppercase">Bus No.</Text>
                <Text className="text-slate-900 font-bold">BA 2 KHA 4452</Text>
             </View>
             <View className="flex-row justify-between">
                <Text className="text-slate-400 text-xs font-bold uppercase">Seats</Text>
                <Text className="text-slate-900 font-bold">A7, A8</Text>
             </View>
             <View className="flex-row justify-between">
                <Text className="text-slate-400 text-xs font-bold uppercase">Date</Text>
                <Text className="text-slate-900 font-bold">Aug 15, 2026</Text>
             </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row space-x-4 mb-12">
           <TouchableOpacity className="flex-1 p-4 bg-slate-50 rounded-2xl flex-row items-center justify-center space-x-2 border border-slate-100">
              <Download color="#64748b" size={18} />
              <Text className="text-slate-600 font-bold text-xs">Save PDF</Text>
           </TouchableOpacity>
           <TouchableOpacity className="flex-1 p-4 bg-slate-50 rounded-2xl flex-row items-center justify-center space-x-2 border border-slate-100">
              <Share2 color="#64748b" size={18} />
              <Text className="text-slate-600 font-bold text-xs">Share</Text>
           </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Primary Action */}
      <View className="p-8 bg-white border-t border-slate-100">
         <TouchableOpacity
           onPress={() => router.replace('/(tabs)/dashboard')}
           className="w-full py-5 bg-slate-900 rounded-3xl flex-row justify-center items-center"
         >
            <Home color="white" size={20} />
            <Text className="text-white text-lg font-bold ml-3">Back to Home</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
