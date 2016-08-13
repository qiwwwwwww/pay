import React from 'react-native';

module.exports = function (scene) {
    var componentMap = {
        'FrontPage': {
            title: 'FrontPage',
            id: 'FrontPage'
        },
        'OutlinePage': {
            title: 'OutlinePage',
            id: 'OutlinePage'
        },
        'SearchPage': {
            title: 'SearchPage',
            id: 'SearchPage'
        },
        'Profile': {
            title: 'Profile',
            id: 'Profile'
        },
        'DetailPage': {
            title: 'DetailPage',
            id: 'DetailPage'
        },
        'UsageList': {
            title: 'UsageList',
            id: 'UsageList'
        },
    }

    return componentMap[scene];
}
