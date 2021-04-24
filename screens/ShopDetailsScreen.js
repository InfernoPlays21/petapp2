import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{ Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config.js';
import {RFValue} from "react-native-responsive-fontsize";

var C1 = '#004643';
var C2 = "#44BBA4";
var C3 = "E7BB41";
var C4 = '#393E41';
var C5 = '#E7E5DF';

export default class ShopDetailsScreen extends Component{
    constructor(props){
        super(props);
        this.state {
            userId : firebase.auth().currentUser.email,
            userName : "",
            shopkeeperId : this.props.navigation.getParam('details')["email_id"],
            shopName : this.props.navigation.getParam('details')["shopName"],
            shopkeeperName : '',
            shopkeeperContact : '',
            shopAddress : '',
        }
    }


    getshopkeeperDetails(){
        db.collection('users').where('email_id','==',this.state.shopkeeperId).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    shopkeeperName : doc.data().first_name,
                    shopkeeperContact : doc.data().contact,
                    shopAddress : doc.data().Shopaddress,
                })
            })
        });
    }


    getUserDetails=(userId)=>{
        db.collection("users").where('email_id','==',userId).get().then((snapshot)=>{
            snapshot.forEach((doc) => {
                this.setState({
                    userName :doc.data().first_name + "" + doc.data().last_name
                })
            })
        })
    }


    componentDidMount(){
        this.getshopkeeperDetails()
        this.getUserDetails(this.state.userId)
    }


    render(){
        return(
            <View style={style.container}>
            <View style={{flex:0.1}}>
                <Header
                leftComponent ={<Icon name= 'arrow-left' type= 'feather' color={C2} onPress={() =>this.navigation.goBack()}}></Header>
                centerComponent={{text:"Shop Details",style: { color: C4, fontSize:20,fontWeight:"bold",}}}
                backgroundColor = {C5}
                navigation={this.props,navigation}
                />
                </View>
                <View style={{flex:0.3}}>
                    <Card
                    title={"Shop Information"}
                    titleStyle= {{fontSize : 20, color:C2}}
                    containerStyle = {{backgroundColor:C4}}
                    >
                        <Card containerStyle = {{backgroundColor:C5}}>
                        <Text style={{fontWeight:'bold'}}>Name: {this.state.shopName}</Text>
                        </Card>
                        </Card>
                        </View>
                        <View style={{flex:0.3}}>

                        
                        
        )
    }
}          
