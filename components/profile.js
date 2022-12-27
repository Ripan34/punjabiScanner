import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {signOutUser} from '../service/firebase';
import { MaterialIcons } from '@expo/vector-icons';
import MontserratText from "./montserratText";

const Profile = ({route, navigation}) => {
  const {name, email} = route.params;
    return (
        <SafeAreaView style={{ height: '100%', backgroundColor: '#F6F5FC'}}>
        <View style={styles.header}>
        <MontserratText style={{ fontSize: 20 }} val={"My Profile"} />
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
                <MontserratText style={{marginLeft: 40, fontSize: 18}} val={name} />
            </View>
            <View style={styles.rows}>
            <MaterialCommunityIcons name="email-outline" size={32} color="black" />
              <MontserratText style={{marginLeft: 40, fontSize: 18}} val={email} />
            </View>
            <TouchableOpacity style={styles.rows} onPress={async () => {
            navigation.navigate("changePassword");
            }}>
            <AntDesign name="eyeo" size={32} color="black" />
            <MontserratText style={{marginLeft: 40, fontSize: 18}} val={"Change Password"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rows} onPress={async () => {await signOutUser();
            navigation.navigate("welcome");
            }}>
            <MaterialIcons name="logout" size={30} color="black" />
            <MontserratText style={{marginLeft: 40, fontSize: 18}} val={"Logout"} />
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
        borderBottomColor: '#3461FD',
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