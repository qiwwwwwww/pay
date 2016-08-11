import React from 'react-native';

module.exports = function (scene) {
    var componentMap = {
        'FrontNav': {
            title: 'FrontNav',
            id: 'FrontNav'
        },
        'OutlineNav': {
            title: 'OutlineNav',
            id: 'OutlineNav'
        },
        'SearchNav': {
            title: 'SearchNav',
            id: 'SearchNav'
        },
        'Profile': {
            title: 'Profile',
            id: 'Profile'
        },
    }

    return componentMap[scene];
}
