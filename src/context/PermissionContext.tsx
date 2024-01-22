import React,{createContext,useEffect,useState} from "react";
import { AppState,Platform } from "react-native";
import {check,PERMISSIONS,PermissionStatus,request,openSettings} from 'react-native-permissions'
import { create } from "react-test-renderer";

//langkah1
export interface PermissionState { 
    locationStatus:PermissionStatus //typedata diambil langsing dair system
}

//salah satu element diatas locationStatus kita jadikan 
//sbgai bagian element dari state bernama PermissionState dan typedata PermitionState
//dan kita beri value nilai
//locatoonStatu adalah variable yg kita jadikan dari sbgai element state object dari  permissionInitState
//dimana typedata adalah PermissionState ini adalah dari system dimana typenya ada  'granted'|'blocked'| 'unavailable'| 'denied'
export const permissionInitState:PermissionState = {
     locationStatus:'unavailable'
}


//kita akan buat PermisionProvider dan kita buat dulu typedata contextProps 
//yg akan dipakai yg kita tahuy 
//1.yg diatas avr pemissions sbga ariable state permissonState 
//2. function request utk asking permisiton disistem local kita buat functionnya (fiedl abstrack)
//3.funct9on utk hasil yg kita tamgkap dari sistem hasil kmbalian function no.2 
//sbb:

type PermissionContextProps = {
   permissions:PermissionState;
   askLocationPermission:()=>void;
   checkLocationPermission:()=>void
}

//  declare create Context bernama permisstionProvider
export const PermissionContext= createContext({} as PermissionContextProps)


//setelah declate context diatas buat Providernya yaitu PermissionProvider 
//implementasi Context dgn memasukan element2 property: permision,askLocationPermisson(),checkLOcationPermission
//   itu smua di buat functional state dan logic isi functionya masing2 
//sbb:

export const PermissionProvider =({children}:any) => {
   const [permissions,setPermissions] = useState(permissionInitState)

   //pake useEffect utk pantau dan ambil nilai permissions dari system 
   //dgn cara jalankan checkLocationPermision jika ada perubahan render di Page 
   //dimana perubahan render ini user tekan tombol permsion button  -->askPermitionLocation atau request
   //nah useEffect kerja langsung check jalankan checkLocationPwermission Fucntion 
     useEffect(()=> {
      AppState.addEventListener('change',state=>{
         if(state !== 'active') return
         checkLocationPermission()
      })
     })
   
     //request function ->ke system Permissons

      const askLocationPermission = async ()=> {
         let permissionStatus :PermissionStatus;
           if(Platform.OS === 'ios') {
             permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
           } else {
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
           }
            //jika diblock jln kan functon openSetting dari system
           if (permissionStatus === 'blocked') {
             openSettings()
           }
           //update state dari permission sesuai hasil request 
           setPermissions({
            ...permissions, // copy variable obj state permission dan update dgn nilai locationStatus
            locationStatus:permissionStatus
           })
      }


     //result function dari system 
     //kita sudah request diatas dapat jawaban dari system kita ambil status jawaban dan update state kita 

     const checkLocationPermission = async () => {
          let permissionStatus :PermissionStatus
          if(Platform.OS === 'ios') {
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          } else {
           permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
          }
          //update hasil dari permitionStatus yg saat ini disimpan di LocationStatus 
          setPermissions({
            ...permissions,
            locationStatus:permissionStatus
          })
     }
    
     return (
      <PermissionContext.Provider value={{
         permissions,
         askLocationPermission,
         checkLocationPermission
      }}>
         {children}
      </PermissionContext.Provider>
     )

}

//catatan:sbnarnya variable locatoonStatus sudah cukup  tetapi kita gunakan 
//permission sbgai variable state hook utk dapat nilai perubahan yg didapat dari (system) hasil dari checkLocation
//dimana variable penampung tsb adalah checkLocation dimana hasilnya utk ubah permission dgn update state :
//setPermissions({
//   ...permissions , // coy objectnya saat ini 
  //   locationsStatus: permisssionStatus  // update nilai permission dgn nilai location Status saat ini!
//  })  





/*KEterangan Langkah2 BUAT Context 
langkah2 buat context:
1.baut interface atau abstrack  typedatanya 
utk element variable anggota dari interface kita define typedartanya 
utk function/jika ada paramnya kita define sbngai typedata void atau ada returnya


2.jika tadi diatas ada variable element merupaka state kita buatr 
  state dan vriableelement diatas tadi kita beri nilai default 

3. kita buat variable utk contextName - createContext({} as contexNameProps) 
   //sbgai context yg akan dipanggil permasing2 nnti dicompoent anak akalu mau akses variable/fucntion di context 
   //yg saat ini kita buat 

4. kita buat context Providernya ,
   export const namaCOntextProvider =({children}:any)=>{}
   stlahnya didalamnya nnti kita jabarkan 
   function2 diatas yg udah kita define di interface kita jabarkan smua disini (versi lengkapnya )
    
    didalam context provider ygkita buat:
    4.a) kita juga apakah butuh perubahan ygdipicu oleh perubahan layar maka kita 
         /render maka kita butuh useEffect(()=>utk olah state kita ).

    4.b)  masih dalam namaContextProvider function:
        utk return kita bungkus  utk compoennt2 sbgai childfen yg nnti akan akses si context 
        sbb:
          return (
             <namaContext.Provider value={{
                isi value disini adalah 
                kita tulis :
                -variable2 yg kita declare diatas /element2 state
                -nama2 function yg kita declare diatas
             }}
               >
                {children}
            </namaContext.Provider>   
          )
         
   catatan:
    utk fucntion diatas ada 2 case ini dimana 
    1.utk state kita ambil state dari sistem yaitu react-native-permissions
       dimana ada 'unavailable',granted,denied        
       
   5.terakhidr jangal lupa taruh import provider masuikan kde jsx di App.tsx 
    sbb contohnya :
    //kita buat fucntion AppState-nya dimana  Provider wraper children ~perwakilan 
    //dari tree2 /anak2 component
   
    const AppState = ({ children }: any) =>{

               return (
                  <PermissionsProvider>
                     { children }
                  </PermissionsProvider>
               )

               }

    
    //stlahnya masukan AppState di App function sbb:
      const App =()=> {
         return ( 
            <NavigationContainer>
                <AppState>
                <NavigationApp/>
                </AppState>
            </NavigationContainer>
         )
      }





     note: dgn mmbungkus  component2 children berapanpun  tree levelnya level1 -->kebahah trus 
                                                              level2 dst 
     sehingga nnti tinggal kita panggil dgn  useCOntext(namaELementVariableyg didiclare di context)
       sbb contoh di page PermissonScreen :
       //kita mau pakai variable element permissions dan func askLocationPermissions yg udah kita declare di contect 
       //sperti ini cara panggilnya 
        const {permissions,askLocationPermission} = useContext(PermissionsContext)

     6.lesimpulan :
        createCpmtext utk dipamggil oleh component 
        create Provider ukt wraping agar component bisa akass dimanapun 
        ketika di compinent kita bisa aksaes variable state,dan function dgn panggil useCOntext( nama context yg kita buat) 


     SELESAI!!
*/