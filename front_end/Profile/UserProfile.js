import React, { Component } from 'react';
import {
    SafeAreaView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import Icon from '../Utility/Icon';
import styles from '../Static/style';
import pro_styles from '../Static/profile_style';
import { ScrollView } from 'react-native-gesture-handler';
import { ProfileOption } from '../NavBar';

//TODO: Add error checking

class SettingIcon extends Component{
    constructor(props) {
        super(props);
        this.state = {
            navigation: props.navigation
        }
    }

    render(){
        return(
            <TouchableOpacity onPress={() => this.state.navigation.navigate(ProfileOption[1])}>
                <Icon name="setting" size={30} />
            </TouchableOpacity>
        );
    }
}

class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: props.question,
            answer: props.answer
        };
        this.onPressActivities = this.onPressActivities.bind(this);
    }

    onPressActivities() {
        console.log("Pressed Activities");
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.onPressActivities}>
                    <View style={styles.class__container}>
                        <Text style={[pro_styles.text_header, { marginBottom: 12 }]}>{this.state.question}</Text>
                        <Text style={pro_styles.text_style}>{this.state.answer}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
}

class Interest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interest: props.interest
        }
    }
  
    render() {
        return (
            <View style={pro_styles.interest_container}>
                <Text>{this.state.interest}</Text>
            </View>
        );
    };
}
  
class UserProfile extends Component {
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
            editState: {}
        };
        this.onPressSave = this.onPressSave.bind(this);
        this.onPressCancel = this.onPressCancel.bind(this);
        this.onPressEdit = this.onPressEdit.bind(this);
        this.toggleSwitchInterest = this.toggleSwitchInterest.bind(this);
        this.toggleSwitchActivity = this.toggleSwitchActivity.bind(this);
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
  
    toggleSwitchInterest() {
        let temp = this.state.editState;
        temp.interestEnabled = !temp.interestEnabled;
        this.setState({ editState: temp });
    }
  
    toggleSwitchActivity() {
        let temp = this.state.editState;
        temp.activityEnabled = !temp.activityEnabled;
        this.setState({ editState: temp });
    }
  
    handleChange(value, variable) {
        let temp = this.state.editState;
        temp[variable] = variable != "age" ? value : value.replace(/[^0-9]/g, '');
        this.setState({ editState: temp });
    }
  
    render() {
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
                        {this.state.isEditing ?
                            <View style={styles.content__container}>
                                <Text style={pro_styles.edit_text}>Name</Text>
                                <TextInput
                                    style={pro_styles.edit_text_input}
                                    value={this.state.editState.username}
                                    onChangeText={value => this.handleChange(value, "username")}
                                />
                                <Text style={pro_styles.edit_text}>Location</Text>
                                <TextInput
                                    style={pro_styles.edit_text_input}
                                    value={this.state.editState.location}
                                    onChangeText={value => this.handleChange(value, "location")}
                                />
                                <View>
                                    <Text style={pro_styles.edit_text}>Occupation</Text>
                                    <TextInput
                                        style={pro_styles.edit_text_input}
                                        value={this.state.editState.occupation}
                                        onChangeText={value => this.handleChange(value, "occupation")}
                                    />
                                    <Text style={pro_styles.edit_text}>Age</Text>
                                    <TextInput
                                        keyboardType='numeric'
                                        style={pro_styles.edit_text_input}
                                        value={this.state.editState.age}
                                        onChangeText={value => this.handleChange(value, "age")}
                                    />
                                </View>
                            </View> :
                            <View style={{ alignItems: 'center' }}>
                                <Text style={pro_styles.username_header}>{this.state.username}</Text>
                                <Text style={pro_styles.text_header}>{this.state.location}</Text>
                                <Text style={pro_styles.text_header}>{this.state.age + ', ' + this.state.occupation} </Text>
                            </View>
                        }
                        <View style={styles.content__container}>
                            <Text style={pro_styles.category_header}>About</Text>
                            <View style={styles.class__container}>
                                {this.state.isEditing ?
                                    <TextInput
                                        keyboardType='numeric'
                                        value={this.state.editState.about}
                                        onChangeText={value => this.handleChange(value, "about")}
                                        multiline={true}
                                        maxLength={150}
                                    /> :
                                    <Text style={pro_styles.text_style}>{this.state.about}</Text>
                                }
                            </View>
                            <Text style={pro_styles.category_header}>Favorite Bible Verse</Text>
                            <View style={styles.class__container}>
                                <Text style={pro_styles.text_style}>{this.state.verse}</Text>
                            </View>
                            {(this.state.interestEnabled || this.state.isEditing) &&
                                <View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={pro_styles.category_header}>Interests</Text>
                                    {this.state.isEditing && <Switch
                                        trackColor={{ false: "#CBCBCB", true: "#16B7EA" }}
                                        onValueChange={this.toggleSwitchInterest}
                                        value={this.state.editState.interestEnabled}
                                        style={{ alignSelf: 'center', marginLeft: 'auto' }}
                                    />}
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {this.state.interests.map((interest) =>
                                        <Interest interest={interest} key={interest} />
                                    )}
                                    </View>
                                </View>
                            }
                            {(this.state.activityEnabled || this.state.isEditing) &&
                                <View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={pro_styles.category_header}>Recent activity</Text>
                                    {this.state.isEditing &&
                                        <Switch
                                        trackColor={{ false: "#CBCBCB", true: "#16B7EA" }}
                                        onValueChange={this.toggleSwitchActivity}
                                        value={this.state.editState.activityEnabled}
                                        style={{ alignSelf: 'center', marginLeft: 'auto' }}
                                        />}
                                    </View>
                                    <View>
                                    {this.state.activities.map((activity) =>
                                        <Activity
                                        question={activity.question}
                                        answer={activity.answer}
                                        key={activity.id}
                                        />
                                    )}
                                    </View>
                                </View>
                            }
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export { UserProfile, SettingIcon };