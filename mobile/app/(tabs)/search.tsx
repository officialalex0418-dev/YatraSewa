import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MapPin, Calendar, Search as SearchIcon, ChevronRight } from 'lucide-react-native';

export default function Search() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-4 pb-8 bg-white border-b border-slate-100">
        <Text className="text-3xl font-black text-slate-900">Find a Bus</Text>
        <Text className="text-slate-500 mt-1">120+ Operators across Nepal</Text>
      </View>

      <ScrollView className="flex-1 p-6 space-y-6">
        <View className="bg-slate-50 p-6 rounded-[40px] space-y-4">
          <View className="space-y-2">
            <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">From</Text>
            <View className="bg-white p-4 rounded-2xl flex-row items-center border border-slate-100">
              <MapPin color="#7c3aed" size={20} />
              <TextInput placeholder="Departure City" className="flex-1 ml-3 font-bold" />
            </View>
          </View>

          <View className="items-center py-2">
             <View className="w-10 h-10 bg-white rounded-full items-center justify-center border border-slate-100">
                <ChevronRight color="#94a3b8" size={20} style={{ transform: [{ rotate: '90deg' }] }} />
             </View>
          </View>

          <View className="space-y-2">
            <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">To</Text>
            <View className="bg-white p-4 rounded-2xl flex-row items-center border border-slate-100">
              <MapPin color="#7c3aed" size={20} />
              <TextInput placeholder="Destination City" className="flex-1 ml-3 font-bold" />
            </View>
          </View>

          <View className="space-y-2 mt-4">
            <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Date</Text>
            <TouchableOpacity className="bg-white p-4 rounded-2xl flex-row items-center border border-slate-100">
              <Calendar color="#7c3aed" size={20} />
              <Text className="ml-3 font-bold text-slate-900">Select Date</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="w-full py-5 bg-purple-600 rounded-[30px] shadow-lg shadow-purple-200 flex-row justify-center items-center mt-6">
            <SearchIcon color="white" size={20} />
            <Text className="text-white text-lg font-bold ml-2">Search Buses</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Searches */}
        <View className="mt-8">
           <Text className="text-lg font-black text-slate-900 mb-4">Recent Searches</Text>
           <View className="space-y-3">
              <TouchableOpacity className="flex-row items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl">
                 <View className="flex-row items-center space-x-3">
                    <MapPin color="#94a3b8" size={18} />
                    <Text className="font-bold text-slate-700 ml-2">Kathmandu → Pokhara</Text>
                 </View>
                 <ChevronRight color="#cbd5e1" size={18} />
              </TouchableOpacity>
           </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
