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
import styles from '../Static/main_style';
import pro_styles from '../Static/profile_style';

//TODO: Add error checking and editing interest
  
export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation,
            //proPic: props.profileImage
            userID: props.userID,
            username: "",
            location: "",
            age: "",
            occupation: "",
            about: "",
            verse: "",
            interests: [],
            interestEnabled: true,
            activities: [],
            activityEnabled: true,
            isOwner: props.isOwner,
            isEditing: false,
            prevState: {}
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
        this.setState(this.state.prevState);
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
        this.setState({isEditing: false});
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
            prevState: this.state,
            isEditing: true
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
        this.setState({ interestEnabled: !this.state.interestEnabled });
    }
  
    toggleActivity() {
        this.setState({ activityEnabled: !this.state.activityEnabled });
    }
  
    handleChange(value, key) {
        let temp = this.state;
        temp[key] = key != "age" ? value : value.replace(/[^0-9]/g, '');
        this.setState(temp);
    }

    render() {
        const { isOwner, isEditing, username, location, occupation, age } = this.state;
        const { about, verse, interestEnabled, activityEnabled, interests, activities } = this.state;
        return (
            <SafeAreaView style={pro_styles.background}>
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <Icon name='profile' size={160} />
                        {isOwner && !isEditing &&
                            <TouchableOpacity style={pro_styles.edit_button} onPress={this.onPressEdit}>
                                <Text style={styles.text__header}>Edit Profile</Text>
                            </TouchableOpacity>
                        }
                        <Headline 
                            isEdit={isEditing}
                            name={username}
                            location={location}
                            occupation={occupation}
                            age={age}
                            handleChange={this.handleChange}
                        />
                        <Bio
                            isEditing={isEditing}
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
