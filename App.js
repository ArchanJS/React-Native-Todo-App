import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View,TextInput, Button, TouchableHighlight, ScrollView, Alert,Keyboard, TouchableNativeFeedback } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function App() {

  const [text,setText]=useState("");
  const [key,setKey]=useState(1);
  const [notes,setNotes]=useState([]);

  const addNote=(text)=>{
    console.log("Clicked");
    if(text.trim()!=""){
      setNotes((prev)=>{
        return [...prev,{text:text,key:key}]
      });
      setKey(key+1);
      setText("");
    }
    else{
      Alert.alert('OOPS!',"Don't leave the input field empty!",[
        {text:"Got it!",onPress:()=>setText("")}
      ])
    }
  }

  const deleteNote=(key)=>{
    setNotes((prev)=>{
      return notes.filter(item=>item.key!=key)
    })
  }

  return (
    <TouchableNativeFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <View style={styles.inpView}>
        <TextInput placeholder="Add a note..." value={text} 
        multiline
        onChangeText={(v)=>setText(v)}
        style={styles.textInp}
        />
        <TouchableHighlight style={styles.inpBtn}>
        <MaterialIcons name="add" size={40} color="purple" onPress={()=>addNote(text)}/>
        </TouchableHighlight>
      </View>
      <ScrollView>
      {
        notes.length>0
        ?
        notes.map((item)=>{
          return (
            <View key={item.key} style={styles.note}>
              <Text style={styles.noteText}>{item.text}</Text>
              <MaterialIcons size={20} name="delete" color="purple" onPress={()=>deleteNote(item.key)}/>
            </View>
          )
        })
    :
    <Text style={styles.nothing}>Nothing to show</Text>
    }
    </ScrollView>
      <StatusBar style="auto" />
    </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe0fc',
    alignItems: 'center',
  },
  header:{
    backgroundColor:"purple",
    color:"white",
    paddingHorizontal:100,
    paddingVertical:10,
    marginHorizontal:10,
    marginVertical:30,
    fontSize:29,
    fontWeight:'bold',
    borderRadius:20
  },
  textInp:{
    borderBottomWidth:2,
    borderBottomColor:"purple",
    fontSize:22,
    width:260,
    height:40,
    color:"purple"
  },
  inpView:{
    display:"flex",
    flexDirection:"row"
  },
  inpBtn:{
    backgroundColor:"#ffe0fc",
    color:"#ffe0fc",
    padding:4,
    fontSize:20,
    borderRadius:6,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  note:{
    width:260,
    paddingHorizontal:6,
    paddingVertical:4,
    borderWidth:1,
    borderColor:'purple',
    borderRadius:1,
    borderStyle:'dashed',
    marginVertical:6,
    display:'flex',
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'center'
  },
  noteText:{
    textAlign:'center',
    fontSize:20,
    marginEnd:6,
    flex:0.99
  },
  nothing:{
    paddingHorizontal:40,
    fontSize:20,
    borderWidth:1,
    borderRadius:2,
    borderColor:"#EA87FE",
    color:"#C1BFC1",
    borderStyle:'dashed',
    marginVertical:40
  }
});
