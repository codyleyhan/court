

`Avatar` (component)
====================

Displays a Circular image of specified height

Props
-----

### `animalName`

The string uri to fetch corresponding to a local uri

type: `string`


### `color`

Background color of resulting image, if PNG

type: `string`


### `imgURL`

The string uri to fetch that corrosponds to a web url

type: `string`


### `showSubIcon`

Displays the nested subicon

type: `bool`


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

type: `object`



`ChatView` (component)
======================



Props
-----

### `color`

Background color of received messages

type: `string`


### `goToProfile` (required)

Callback function back to navigation to route user to the selected user's profile page

type: `func`


### `messages`

Text to be rendered in chat bubble

type: `arrayOf[object Object]`


### `profileInfo` (required)

Object containing all of the user's profile fields

type: `object`



`FadeWrapper` (component)
=========================



Props
-----



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

### `color`

Specifies header color

type: `string`


### `leftIcon`

Component to be rendered on right side of header

type: `node`


### `navigation`

Stack of previously viewed screens - required when showBack == True

type: `object`


### `rightIcon`

Component to be rendered on left side of header

type: `node`


### `showBack`

Displays the back icon on the left side of the component

type: `bool`


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


### `showBorder`

Displays a border around the icon image

type: `bool`


### `size` (required)

Specifies width and height of avatar image

type: `number`



`InboxComponents` (component)
=============================

Card in the user's inbox for each of their current chats

Props
-----

### `animalName`

The string uri to fetch corresponding to a local uri

type: `string`


### `color`

Background color of icon image

type: `string`


### `lastMessage` (required)

The text of the last message sent in the chat

type: `object`



`InterestsCloud` (component)
============================

Displays a 'cloud' of interests in a flex box

Props
-----

### `color`

Fill color for interest pill

type: `string`


### `interests`

Object containing the user's current selected interests

type: `object`


### `onAddInterest`

Callback function for when a user selects a new interest

type: `func`


### `onRemoveInterest`

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


### `onAddInterest`

Callback for adding a given interest (used in onPress handler for the addIcon)

type: `func`


### `onRemoveInterest`

Callback for removing a given interest (used in onPress handler for the removeIcon)

type: `func`


### `showRemoveIcon`

Displays a dismiss icon on the right of the component

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


### `showLogo`

Boolean indicating whether or not to show the facebook logo

type: `bool`


### `text` (required)

Text to be rendered in button

type: `string`



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

