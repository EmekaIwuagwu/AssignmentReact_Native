import React, { Component } from 'react';
import {  StyleSheet, Platform, View, ActivityIndicator, FlatList, Text, Image, Alert, LayoutAnimation, YellowBox , Button , AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        UrlImage : '',
        movie_desc : '',
        favourite : false
    };
  }

  GetItem (movie_description) {
    Alert.alert(movie_description);
    }

    SaveData = () =>
    {
        const movieData = {
            UrlImage : this.state.UrlImage,
            movie_desc : this.state.movie_desc
        };

        AsyncStorage.setItem('movie',JSON.stringify(movieData));
    }

  ShowMovies = () =>{
    return fetch('https://uncoiled-crust.000webhostapp.com/api/movies_db.php')
    .then((response) => response.json())
    .then((responseJson) => {
        const result = responseJson.map((value, index) => ({
            ...value,
            isFavourite: 0
        }))

      this.setState({
        isLoading: false,
        dataSource: result
      }, function() {
        // In this block you can do something with new state.
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  componentWillMount()
  {
    const { movie_desc, UrlImage, favorite } = this.props;
    this.setState({ movie_desc, UrlImage, favorite });
  }

  SelectItem(movie_desc){
      Alert.alert(movie_desc);
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
}


  componentDidMount(){
      this.ShowMovies();
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

  changeisFavorite = (item, index) => {
    let arr = [...this.state.dataSource]
    arr[index].isFavorite = item.isFavorite == 1 ? 0:1;
    this.setState({ dataSource: arr });
}
  

  render() 
  {
    const { movie_desc, UrlImage, favorite } = this.state;
        return (
            <View style={styles.MainContainer}>
            <FlatList
            data={ this.state.dataSource }
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            renderItem={({item,index}) => 
                <View style={{flex:1, flexDirection: 'row'}}>
                    <Icon
                        name={item.isFavorite == 1 ? 'heart' : 'heart-o'}
                        color={item.isFavorite == 1 ? '#F44336' : 'rgb(50, 50, 50)'}
                        size={30}
                        style={{ marginBottom: 10, marginTop: 20 }}
                        onPress={() => this.changeisFavorite(item, index)}
                    />
                    <Image source = {{ uri: item.url_image}} style={styles.imageView} />
                    <Text style={styles.textView} >{item.movie_description}</Text>
                </View>
                }
            />
            </View>
        );
  }
}


const styles = StyleSheet.create({
    MainContainer :{
     
        justifyContent: 'center',
        flex:1,
        margin: 5,
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    imageView: {
        width: '50%',
        height: 350 ,
        margin: 7,
        borderRadius : 7
     
    },
    textView: {
        width:'50%', 
        textAlignVertical:'center',
        padding:10,
        color: '#000'
     
    }
    });