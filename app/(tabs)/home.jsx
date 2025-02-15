import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import React from 'react'
import { images } from '../../constants'

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
     <FlatList  
     data={[{id:1},{id:2},{id:3}]}
     keyExtractor={(item)=>item.$id}
     renderItem={({item})=>(
         <Text className="text-3xl text-white">{item.id}</Text>
     )}
     ListHeaderComponent={()=>(
      <View className="my-6 px-4 space-y-6">
      <View className="justify-between items-center flex-row mb-6">
      <View>
      <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
      <Text className="font-pmedium text-2xl font-semibold text-white">Native Mastery</Text>
      </View>

      <View className="mt-1.5">
      <Image className="w-9 h-10" source={images.logoSmall} resizeMode="contain" />
      </View>
      </View>


      

      </View>
     )}
     />
    </SafeAreaView>
  )
}

export default Home