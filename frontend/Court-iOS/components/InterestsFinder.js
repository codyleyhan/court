import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';

import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

import InterestsCloud from '../components/InterestsCloud';

import { queryGoogleKG } from '../utils/GoogleKGS';

/**
* Provides interface for searching for and selecting interests
*/
export default class InterestsFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '', results: [] };
  }

  searchCount = 1;

  handleQuery(query) {
    const countBefore = ++this.searchCount;
    // Query Google KnowledgeGraph
    let results = [];
    if (query !== '') {
      queryGoogleKG(query).then((result) => {
        // Another search happened before the response was done; cancel.
        if (countBefore !== this.searchCount) {
          return
        }
        for (var i = 0; i < result.length && i < 10; i++) {
          const title = result[i].result.name;
          const description = result[i].result.description;
          const id = result[i].result['@id'];
          results.push({title: title, description: description, id: id, imgUrl: result[i].result.image ? result[i].result.image.contentUrl : null });
        }
        this.setState({ query, results });
        return;
      });
    }
    this.setState({ query, results });
  }

  render() {
    const { query, results } = this.state;
    const { interests, onAddInterest, onRemoveInterest } = this.props;

    return (
      // Select your gender
      <View style={styles.outerView}>
        <View style={styles.textInputWrapper} >
          <TextInput
            multiline={false}
            placeholder="The Office"
            placeholderColor="rgba(255,255,255,0.5)"
            style={styles.textInput}
            onChangeText={(query) => this.handleQuery(query)}
            value={this.state.query}
          />
          <Icon.Ionicons
            name='ios-search'
            size={35}
            color={Colors.peach}
          />
        </View>
        {
          <View style={styles.results}>
            <InterestsCloud interests={interests} recommendations={results} onAddInterest={onAddInterest} onRemoveInterest={onRemoveInterest}/>
          </View>
        }
      </View>
    );
  }
}

InterestsFinder.propTypes = {
  /**
  * Object containing the user's current selected interests
  */
  interests: PropTypes.object.isRequired,
  /**
  * Callback function for when a user selects a new interest
  */
  onAddInterest: PropTypes.func.isRequired,
  /**
  * Callback function for when a user removes an interest
  */
  onRemoveInterest: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  outerView: {
    marginVertical: 15,
    marginHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputWrapper: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 9,
      },
      android: {
        elevation: 20,
      },
    }),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textInput: {
    fontSize: 30,
    paddingTop: 5,
    fontFamily: 'orkney-medium',
    color: Colors.peach,
    flex: 1,
  },
  results: {
    flex: 1,
  },
});
