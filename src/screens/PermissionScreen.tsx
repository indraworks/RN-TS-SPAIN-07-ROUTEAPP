import { Button,View, Text,StyleSheet,  Platform } from 'react-native'
import React,{useEffect,useState }from 'react'
import { check,PERMISSIONS,PermissionStatus, request } from 'react-native-permissions'

//type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

const PermissionScreen = () => {
  //const [permissionStatus,setPermissionStatus] = useState<PermissionStatus>('granted')
  //sorri jangan pake state sbb nilai status diambil dari sistem hp! yaitu PermitionStatus 
  //bukan dari state permitionStatus kita yg kaish nilai tapi system!
  //jadi cara setting kita cari setting manager find Permission -->Location->ask everytime 
  //jadi tiap ditekan button nnti muncul modal utk pilihan!
  

  const checkPermission = async()=>{
    let status :PermissionStatus //kembaloan grandted /denied / etc 
    if (Platform.OS === 'ios') {
      //kita ganti dari check jadi request agar ada modal kluar dan pilihan 
      // status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

    } else {
      // status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    }
    //setPermissionStatus(status)
    console.log(status)
  }
 
  


  return (
    <View style={styles.container}>
      <Text>Permission</Text>
      
      <Button 
         title="Permision"
         onPress={checkPermission}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})

export default PermissionScreen


/*
stlah betulkan ini kita buat contextProvider utk PermissionContext 
agar nnti misalkan ada component2 dibawahnya tidak hanya butuh permiston 
location tapi permission yg lain misal camera,notifcation,sms,dll bisa 
langsung dipakai useContext nya krn kita sudah buat pada pusat hirarki 
jadi bisa diakses di compoentn manapun level tree-nya 


*/


/*
script awal error ini sbb: ( yg dibenarkan diatas)
const PermissionScreen = async() => {
  //check permitions 
  let permissionStatus :PermissionStatus // ini builtin react-native 
  if(Platform.OS === 'ios') {
    permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
  } else {
    permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
  }

  return (
    <View style={styles.container}>
      <Text>Permission</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})

export default PermissionScreen





*/


/*
npm react-native -permitions 
https://www.npmjs.com/package/react-native-permissions

dibawah ada pada android/app/src/main/AndroidManifest.xml 
nnti piluh yg mana yg mau di ambil utk permissionya  taru disitu ! 
utk maps biasanya ini :
 <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_MEDIA_LOCATION" />

utk camera :
<uses-permission android:name="android.permission.CAMERA" /> 

isinya :


<manifest xmlns:android="http://schemas.android.com/apk/res/android">

  <!-- 🚨 Keep only the permissions used in your app 🚨 -->

  <uses-permission android:name="android.permission.ACCEPT_HANDOVER" />
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_MEDIA_LOCATION" />
  <uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
  <uses-permission android:name="com.android.voicemail.permission.ADD_VOICEMAIL" />
  <uses-permission android:name="android.permission.ANSWER_PHONE_CALLS" />
  <uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />
  <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
  <uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
  <uses-permission android:name="android.permission.BODY_SENSORS" />
  <uses-permission android:name="android.permission.BODY_SENSORS_BACKGROUND" />
  <uses-permission android:name="android.permission.CALL_PHONE" />
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.GET_ACCOUNTS" />
  <uses-permission android:name="android.permission.NEARBY_WIFI_DEVICES" />
  <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
  <uses-permission android:name="android.permission.PROCESS_OUTGOING_CALLS" />
  <uses-permission android:name="android.permission.READ_CALENDAR" />
  <uses-permission android:name="android.permission.READ_CALL_LOG" />
  <uses-permission android:name="android.permission.READ_CONTACTS" />
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.READ_MEDIA_AUDIO" />
  <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
  <uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
  <uses-permission android:name="android.permission.READ_MEDIA_VISUAL_USER_SELECTED" />
  <uses-permission android:name="android.permission.READ_PHONE_NUMBERS" />
  <uses-permission android:name="android.permission.READ_PHONE_STATE" />
  <uses-permission android:name="android.permission.READ_SMS" />
  <uses-permission android:name="android.permission.RECEIVE_MMS" />
  <uses-permission android:name="android.permission.RECEIVE_SMS" />
  <uses-permission android:name="android.permission.RECEIVE_WAP_PUSH" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.SEND_SMS" />
  <uses-permission android:name="android.permission.USE_SIP" />
  <uses-permission android:name="android.permission.UWB_RANGING" />
  <uses-permission android:name="android.permission.WRITE_CALENDAR" />
  <uses-permission android:name="android.permission.WRITE_CALL_LOG" />
  <uses-permission android:name="android.permission.WRITE_CONTACTS" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

  <!-- … -->

</manifest>



*/