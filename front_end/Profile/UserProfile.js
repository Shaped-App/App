import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Icon from '../Utility/Icon';
import { Headline, SettingIcon, Bio } from './UserProfileComponents'
import styles from '../Static/style';
import pro_styles from '../Static/profile_style';

//TODO: Add error checking and editing interest
  
export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            //proPic: props.profileImage
            userID: props.userID,
            username: "Bob Ross",
            location: "Ann Arbor, Michigan",
            age: "21",
            occupation: "Student",
            about: "hi i like to paint",
            verse: "Always have been",
            interests: ["Sports"],
            interestEnabled: true,
            activities: [],
            activityEnabled: true,
            isOwner: props.isOwner,
            isEditing: false,
            editState: {}
        };
        this.onPressSave = this.onPressSave.bind(this);
        this.onPressCancel = this.onPressCancel.bind(this);
        this.onPressEdit = this.onPressEdit.bind(this);
        this.toggleInterest = this.toggleInterest.bind(this);
        this.toggleActivity = this.toggleActivity.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
  
    onPressCancel() {
        console.log("Pressed Cancel Button");
        this.setState({ isEditing: false });
        this.state.navigation.setOptions({
            title: " ",
            headerLeft: null,
            headerRight: () => (
                this.state.isOwner ? <SettingIcon navigation={this.state.navigation}/> : null
            )
        });
    }
  
    onPressSave() {
        console.log("Pressed Save");
        this.setState(this.state.editState);
        this.state.navigation.setOptions({
            title: " ",
            headerLeft: null,
            headerRight: () => (
                this.state.isOwner ? <SettingIcon navigation={this.state.navigation}/> : null
            )
        });
    }
  
    onPressEdit() {
        console.log("Pressed Edit Button");
        this.setState({
            isEditing: true,
            editState: {
                isEditing: false,
                username: this.state.username,
                location: this.state.location,
                age: this.state.age,
                occupation: this.state.occupation,
                about: this.state.about,
                verse: this.state.verse,
                interests: this.state.interests,
                interestEnabled: this.state.interestEnabled,
                activities: this.state.activities,
                activityEnabled: this.state.activityEnabled,
            }
        });
        this.state.navigation.setOptions({
            title: "Edit Profile",
            headerLeft: () => (
                <TouchableOpacity onPress={this.onPressCancel}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={this.onPressSave}>
                    <Text>Save</Text>
                </TouchableOpacity>
            )
        });
    }
  
    toggleInterest() {
        let temp = this.state.editState;
        temp.interestEnabled = !temp.interestEnabled;
        this.setState({ editState: temp });
    }
  
    toggleActivity() {
        let temp = this.state.editState;
        temp.activityEnabled = !temp.activityEnabled;
        this.setState({ editState: temp });
    }
  
    handleChange(value, key) {
        let temp = this.state.editState;
        temp[key] = key != "age" ? value : value.replace(/[^0-9]/g, '');
        this.setState({ editState: temp });
    }

    render() {
        let curState;
        if(this.state.isEditing){
            curState = this.state.editState;
        }else{
            curState = this.state;
        }
        const { username, location, occupation, age } = curState;
        const { about, verse, interestEnabled, activityEnabled, interests, activities } = curState;
        return (
            <SafeAreaView style={pro_styles.background}>
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <Icon name='profile' size={160} />
                        {this.state.isOwner && !this.state.isEditing &&
                            <TouchableOpacity style={pro_styles.edit_button} onPress={this.onPressEdit}>
                                <Text style={styles.location}>Edit Profile</Text>
                            </TouchableOpacity>
                        }
                        <Headline 
                            isEdit={this.state.isEditing}
                            name={username}
                            location={location}
                            occupation={occupation}
                            age={age}
                            handleChange={this.handleChange}
                        />
                        <Bio
                            isEditing={this.state.isEditing}
                            about={about}
                            verse={verse}
                            handleChange={this.handleChange}
                            interestEnabled={interestEnabled}
                            activityEnabled={activityEnabled}
                            interests={interests}
                            activities={activities}
                            toggleInterest={this.toggleInterest}
                            toggleActivity={this.toggleActivity}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
