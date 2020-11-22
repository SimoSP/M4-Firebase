import React, { useEffect, useState } from 'react'
import { FlatList,  Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { firestore } from 'firebase';

export default function UpdateScreen(props) {

    const [entityText, setEntityText] = useState('')
    const [contentText, setContentText] = useState('')
    const [dateText, setDateText] = useState('')
    const [updateID, setUpdateID] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('entities')
    const userID = props.extraData.id
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

    /// Renders item to the flatlist. Also houses the function to delete by pressing item on the flatlist
    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText} onPress={() => updateField(item.id)}>
                  (Item id: {item.id}) Todo: {item.todo} has to be done by {item.date}. Extra info: {item.content}
                </Text>
            </View>
        )
    }

    /// Handles updating database entrys. Insert new values for the entry in the field and click button "Update" or click the flatlist below. 
    const updateField = (updateID) => {
        firebase.firestore().collection('entities').doc(updateID).update(
            {
                todo: entityText,
                content: contentText,
                date: dateText,
                
            }
            )
            .then(function() {
                console.log("Remove succeeded.")
                setUpdateID('')
                setEntityText('')
                setDateText('')
                setContentText('')
              })
   
        }
        /// Updating entry with the button using provided id
        const updatebyButton = () => {
            firebase.firestore().collection('entities').doc(updateID).update(
                {
                    todo: entityText,
                    content: contentText,
                    date: dateText,
                    
                }
                )
                .then(function() {
                    console.log("Remove succeeded.")
                    setUpdateID('')
                    setEntityText('')
                    setDateText('')
                    setContentText('')
                  })
       
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
            <View style={styles.formContainer}>
            <TextInput
                    style={styles.input}
                    placeholder='ID'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setUpdateID(text)}
                    value={updateID}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Add new thing to do!'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEntityText(text)}
                    value={entityText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Date'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setDateText(text)}
                    value={dateText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='Extra information'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setContentText(text)}
                    value={contentText}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={updatebyButton}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
            </View>
            { entities && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={entities}
                        renderItem={renderEntity} onPress={() => onUpdate(item)}
                        keyExtractor={(item) => item.id}
                        removeClippedSubviews={true}
                        ItemSeparatorComponent={itemSeparator}
                        
                    />
                </View>
            )}
        </View>
        
        
    )
}