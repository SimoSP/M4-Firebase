import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View,Button } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { firestore } from 'firebase';


export default function HomeScreen(props,{navigation}) {
    const [entityText, setEntityText] = useState('')
    const [contentText, setContentText] = useState('')
    const [dateText, setDateText] = useState('')
    const [deleteID, setdeleteID] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id
    const userEmail = props.extraData.email
    const userName = props.extraData.fullName
    
    /// This fetches data from Firebase and pushes them to entities[]
    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])
    //// Deletes documents from Firebase using deleteID which is item.id. Usable with giving deleteID and pushing button and also by clicking item on flatlist
    const onDelete = (deleteID) => {
      firebase.firestore().collection('entities').doc(deleteID).delete()
        .then(function() {
          console.log("Remove succeeded.")
          setdeleteID('')
          entityRef.onSnapshot(
          )
        })
        .catch(function(error) {
          console.log("Remove failed: " + error.message)
        });
  }
    /// Renders item to the flatlist. Also houses the function to delete by pressing item on the flatlist
    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText} onPress={() => onDelete(item.id)}>
                  (Item id: {item.id}) Todo: {item.todo} has to be done by {item.date}. Extra info: {item.content}
                </Text>
            </View>
        )
    }
    /// Logout function. Removes user from firebase
    const logOut = () => {
        try {
          firebase.auth().signOut().then(() => {
            props.navigation.navigate('Logout')

          })
        } catch (e) {
            console.log(e);
        }
    }
    /// Moving function to the add new todo page. Not good implementation
    const addNew = () => {
        try {
            props.navigation.navigate('Add');
        } catch (e) {
            console.log(e);
        }
    }
    /// Moving function to the update page. Not good implementation
    const updateOld = () => {
      try {
          props.navigation.navigate('Update');
      } catch (e) {
          console.log(e);
      }
  }
   /// Separator for the flatlist
   const itemSeparator = () => {
    return (
      <View
          style={{
              height: 5,
              width: '100%',
              backgroundColor: '#C8C8C8'
          }}
      />
    );
  };
    return (
        <View style={styles.container}>
         <View style={styles.buttons}>
          <Button title="Add new Todo"  color="green"  onPress={addNew}/>
          <Button title="Update Todo" color="green" onPress={updateOld}/>
          <Button title="Logout" color="red" onPress={logOut}/>
          </View>
            <View style={styles.container}>
        <Text style = {styles.textStyle}>Hello, {userName}from {userEmail}.</Text>
        <View style={styles.formContainer}>
            <TextInput
                    style={styles.input}
                    placeholder='Delete by id'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setdeleteID(text)}
                    value={deleteID}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.deletebutton} onPress={() => onDelete(deleteID)}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.text}>ToDo list </Text>
            </View>
            { entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity} onPress={() => onPress(item)}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                        ItemSeparatorComponent={itemSeparator}
                    />
                </View>
            )}
        </View>
    )
}