import React, {useState} from 'react'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal} from 'react-native';

export default function App() {
  const movieapi = "http://www.omdbapi.com/?&apikey=6fc87060"
  const [state, setState]  = useState({
    s: "Search",
    results: [],
    selected: {}
  })

  const search = () => {
    axios(movieapi + "&s=" + state.s).then(({data}) => {
      let results = data.Search
      console.log(results)
      setState(prevState => {
        return {...prevState, results:results}
      })
    })
  }

  const openPopup = id =>{
    axios(movieapi + "&i=" + id ).then(({data})=> {
      let result = data;

      // console.log(result);
      
      setState(prevState => {
        return{...prevState, selected: result}
      })
    }) 
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fake Netflix 
      </Text>
      <TextInput 
        style={styles.searchbar} 
        onChangeText={movieText => setState(prevState => {
          return {...prevState, s: movieText}
        })}
        onSubmitEditing={search}
        value={state.s}/>
      <StatusBar style="auto" />
      <ScrollView style={styles.results}>
          {state.results.map(result => (
            <TouchableHighlight 
              key={result.imdbID} 
              onPress={() => openPopup(result.imdbID)}>
              <View style={styles.result}>
                  <Image 
                    source={{uri: result.Poster}} 
                    style={styles.poster} 
                    resizeMode='cover'/>
                  <Text style={styles.heading}>{result.Title}</Text>
              </View>
            </TouchableHighlight>
          ))}
      </ScrollView>
      <Modal
        animationType='fade'
        transparent={false}
        visible={(typeof state.selected.Title != "undefined")}
      >
        <View style={styles.popup}>
  
          <Text style={styles.popuptitle}>{state.selected.Title}</Text>
          <Text style={styles.popupyear}>Year: {state.selected.Year}</Text>
          <Text style={styles.popupgenre}>Genre: {state.selected.Genre}</Text>
          <Text style={styles.popupplot}>{state.selected.Plot}</Text>
        </View>
        <TouchableHighlight 
          onPress={() => setState(prevState => {
            return {...prevState, selected: {}}
          })}
        >
          <Text style={styles.closebtn}>
              Close
          </Text>
        </TouchableHighlight>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FAFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  title:{
    color: '#E50914',
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20
  },
  searchbar:{
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: '#F4F2EC',
    borderRadius: 8,
    marginBottom: 40,
    borderColor: '#E1E8EC',
    borderWidth: 1,
  },
  results:{
    flex:1,
    width: '100%',
  },
  result:{
    flex:1,
    width: '100%',
    marginBottom: 20 
   },
   heading:{
     color: '#002D40',
     fontSize: 18,
     fontWeight: '700',
     padding: 20,
     backgroundColor: '#D9ECF2'
   },
   poster:{
     width: '100%',
     height: 400,
   },
   popup:{
    marginTop: 70,
    padding: 20,
   },
   popuptitle:{
     fontSize: 24,
     fontWeight: '700',
     marginBottom: 5
   },
   popupyear:{
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 5
  },
  popupgenre:{
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5
  },
  popupplot:{
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  closebtn:{
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#011936'
   }
});
