import { Text, Surface, IconButton, Badge, useTheme} from "react-native-paper";
import { View, Pressable, StyleSheet } from "react-native";

const ListItem = ({navigation, uid, name, date, ideas}) => {
  const theme = useTheme();
  const dateObject = new Date(date)
  const dateString = dateObject.toLocaleDateString("en-ca", {month:"long", day:"numeric"});
  const number = ideas.length;
  const visible = number > 0;
  return (
    <Pressable onPress={() => navigation.navigate("Idea List", {uid: uid})}>
      <Surface elevation={1} style={styles.surface}>
        <View style={styles.innerSurface}>
          <View>
            <Text>{name}</Text>
            <Text>{dateString}</Text>
          </View>
          
          <View>
            <IconButton mode="contained" icon="lightbulb-on-outline" 
              onPress={() => navigation.navigate("Idea List", {uid: uid})}>
              Ideas 
            </IconButton>
            <Badge visible={visible} style={{position: "absolute", top: 0, right: 0, backgroundColor:theme.colors.primary}}>{number}</Badge>
          </View>
        </View>
      </Surface>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  surface: {
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#fff"
  },
  innerSurface: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: 10, 
    width: "100%" 
  }
});

export default ListItem;