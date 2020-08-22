import React, { Component } from 'react';
import {
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import Icon from '../Utility/Icon';
import styles from '../Static/main_style';
import pro_styles from '../Static/profile_style';
import { settings } from '../NavBar';

class SettingIcon extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate(settings)}>
                <Icon name="setting" size={30} />
            </TouchableOpacity>
        );
    }
}

class Activity extends Component {
    constructor(props) {
        super(props);
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
                        <Text style={[styles.text__header, { marginBottom: 12 }]}>{this.props.question}</Text>
                        <Text style={pro_styles.text_style}>{this.props.answer}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
}

class Interest extends Component {
    constructor(props) {
        super(props);
    }
  
    render() {
        return (
            <View style={pro_styles.interest_container}>
                <Text>{this.props.interest}</Text>
            </View>
        );
    };
}

class Headline extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        if(this.props.isEdit){
            return(
                <View style={styles.content__container}>
                    <Text style={pro_styles.edit_text}>Name</Text>
                    <TextInput
                        style={pro_styles.edit_text_input}
                        value={this.props.name}
                        onChangeText={value => this.props.handleChange(value, "username")}
                    />
                    <Text style={pro_styles.edit_text}>Location</Text>
                    <TextInput
                        style={pro_styles.edit_text_input}
                        value={this.props.location}
                        onChangeText={value => this.props.handleChange(value, "location")}
                    />
                    <View>
                        <Text style={pro_styles.edit_text}>Occupation</Text>
                        <TextInput
                            style={pro_styles.edit_text_input}
                            value={this.props.occupation}
                            onChangeText={value => this.props.handleChange(value, "occupation")}
                        />
                        <Text style={pro_styles.edit_text}>Age</Text>
                        <TextInput
                            keyboardType='numeric'
                            style={pro_styles.edit_text_input}
                            value={this.props.age}
                            onChangeText={value => this.props.handleChange(value, "age")}
                        />
                    </View>
                </View>
            );
        }
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={pro_styles.username_header}>{this.props.name}</Text>
                <Text style={styles.text__header}>{this.props.location}</Text>
                <Text style={styles.text__header}>{this.props.age + ', ' + this.props.occupation} </Text>
            </View>
        );
    }
}

class Bio extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.content__container}>
                <Text style={pro_styles.category_header}>About</Text>
                    {this.props.isEditing ?
                        <TextInput
                            value={this.props.about}
                            style={pro_styles.edit_text_input}
                            onChangeText={value => this.props.handleChange(value, "about")}
                            multiline={true}
                            maxLength={150}
                        /> :
                        <View style={pro_styles.edit_text_input}>
                            <Text>{this.props.about}</Text>
                        </View>
                    }
                <Text style={pro_styles.category_header}>Favorite Bible Verse</Text>
                <View style={pro_styles.edit_text_input}>
                    <Text>{this.props.verse}</Text>
                </View>
                {(this.props.interestEnabled || this.props.isEditing) &&
                    <View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={pro_styles.category_header}>Interests</Text>
                        {this.props.isEditing && 
                            <Switch
                                trackColor={{ false: "#CBCBCB", true: "#16B7EA" }}
                                onValueChange={this.props.toggleInterest}
                                value={this.props.interestEnabled}
                                style={{ alignSelf: 'center', marginLeft: 'auto' }}
                            />
                        }
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {this.props.interests.map((interest) =>
                            <Interest interest={interest} key={interest} />
                        )}
                        </View>
                    </View>
                }
                {(this.props.activityEnabled || this.props.isEditing) &&
                    <View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={pro_styles.category_header}>Recent activity</Text>
                        {this.props.isEditing &&
                            <Switch
                                trackColor={{ false: "#CBCBCB", true: "#16B7EA" }}
                                onValueChange={this.props.toggleActivity}
                                value={this.props.activityEnabled}
                                style={{ alignSelf: 'center', marginLeft: 'auto' }}
                            />
                        }
                        </View>
                        <View>
                        {this.props.activities.map((activity) =>
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
        );
    };
}

export { SettingIcon, Headline, Activity, Interest, Bio };
