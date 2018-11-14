

`Avatar` (component)
====================

Displays a Circular image of specified height

Props
-----

### `color`

Background color of resulting image, if PNG

type: `string`


### `isLocal`

Flag to specify loading local image

type: `bool`


### `src` (required)

The string uri to fetch, either a web url, or local uri

type: `string`


### `width` (required)

Specifies diameter of resulting image

type: `number`



`BackButton` (component)
========================

Used for returning to previous screen

Props
-----

### `navigation` (required)

Stack of previously viewed screens

type: `instanceOfStackNavigator`



`GenderSelector` (component)
============================

Allows a user to select their own gender, as well as the gender(s) they are seeking

Props
-----

### `onGenderSelected` (required)

Callback function for when a user selects their own gender

type: `func`


### `onPreferenceSelected` (required)

Callback function for when a user selected what gender(s) they are seeking

type: `func`



`Header` (component)
====================

Creates header with centered text, and optional left and right components

Props
-----

### `leftIcon`

Component to be rendered on right side of header

type: `node`


### `rightIcon`

Component to be rendered on left side of header

type: `node`


### `text` (required)

Text to be rendered in center of header

type: `string`



`IconImage` (component)
=======================

Used for loading predefined static images

Props
-----

### `avatar` (required)

The avatar name to fetch

type: `string`


### `color` (required)

Background color of avatar

type: `string`


### `size` (required)

Specifies width and height of avatar image

type: `number`



`InboxComponents` (component)
=============================

Card in the user's inbox for each of their current chats

Props
-----

### `imgUrl` (required)

URL for the given user's profile picture

type: `string`


### `lastMessage` (required)

The text of the last message sent in the chat

type: `string`


### `lastTime` (required)

The time that the last message was sent

type: `string`


### `name` (required)

Name of the other user in the chat

type: `string`


### `percent` (required)

Percent of profile unlocked for the given user

type: `string`



`InterestsCloud` (component)
============================

Displays a 'cloud' of interests in a flex box

Props
-----

### `interests` (required)

Object containing the user's current selected interests

type: `object`


### `onAddInterest` (required)

Callback function for when a user selects a new interest

type: `func`


### `onRemoveInterest` (required)

Callback function for when a user removes an interest

type: `func`


### `recommendations` (required)

List of recommended interests given a specific search

type: `arrayOf[object Object]`



`InterestsFinder` (component)
=============================

Provides interface for searching for and selecting interests

Props
-----

### `interests` (required)

Object containing the user's current selected interests

type: `object`


### `onAddInterest` (required)

Callback function for when a user selects a new interest

type: `func`


### `onRemoveInterest` (required)

Callback function for when a user removes an interest

type: `func`



`InterestsItem` (component)
===========================

Displays a singular interest with title, description, and image

Props
-----

### `description`

Description of the interest

type: `string`


### `disableSelect`

Disables the onPress handler for pressing the interest

type: `bool`


### `id` (required)

Unique identifier for the given interest (from Google KGS)

type: `string`


### `imgUrl`

URL for the interest's image preview

type: `string`


### `onRemoveInterest`

Callback for removing a given interest (used in onPress handler for the removeIcon)

type: `func`


### `showRemoveIcon`

Displays an dismiss icon on the right of the component

type: `bool`


### `title` (required)

Title of the interest

type: `string`



`LoginButton` (component)
=========================

Button that initiates facebook user authentication flow

Props
-----

### `onPress` (required)

Function that handles touch event

type: `func`


### `showLogo` (required)

Boolean indicating whether or not to show the facebook logo

type: `bool`


### `text` (required)

Text to be rendered in button

type: `string`



`StyledText` (component)
========================



Props
-----



`TabBarIcon` (component)
========================

Tab bar icon represnets a singular entry in the tab bar navigator

Props
-----

### `focused` (required)

Boolean indictating if tab icon is selected

type: `bool`


### `name` (required)

Name of icon to render

type: `string`

