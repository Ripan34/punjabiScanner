import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {signOutUser} from '../service/firebase';
import { MaterialIcons } from '@expo/vector-icons';

const Profile = ({route, navigation}) => {
  const {name} = route.params;
    return (
        <SafeAreaView style={{    backgroundColor: '#FFEEEB'        , height: '100%'}}>
        <View style={styles.header}>
          <Text style={{ fontSize: 20 }}>My Profile</Text>
          <TouchableOpacity
            style={{ position: "absolute", top: -3, left: 0, padding: 5 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.profile}>
                <Ionicons name="person" size={60} color="black" />
            </View>
            </View>
            <View style={styles.rows}>
                <Ionicons name="person-outline" size={35} color="black" />
                <Text style={{marginLeft: 40, fontSize: 18}}>{name}</Text>
            </View>
            <View style={styles.rows}>
            <MaterialCommunityIcons name="email-outline" size={32} color="black" />
                <Text style={{marginLeft: 40, fontSize: 18}}>sh.2100.ra@gmail.com</Text>
            </View>
            <TouchableOpacity style={styles.rows} onPress={async () => {
            navigation.navigate("changePassword");
            }}>
            <AntDesign name="eyeo" size={32} color="black" />
                <Text style={{marginLeft: 40, fontSize: 18}}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows} onPress={async () => {await signOutUser();
            navigation.navigate("welcome");
            }}>
            <MaterialIcons name="logout" size={30} color="black" />
                <Text style={{marginLeft: 40, fontSize: 18}}>Logout</Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    header: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        borderBottomColor: '#F5694D',
        borderBottomWidth: 0.5,
        paddingBottom: 10
      },
      container: {
        width: '100%',
        height: '100%',
      },
      profile: {
        width: 100,
        height: 100,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.2,
        backgroundColor: 'white',
        margin: 40
      },
      rows: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        padding: 30,
      }
})
export default Profile;