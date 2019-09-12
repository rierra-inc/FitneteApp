import {
    createAppContainer,
    createSwitchNavigator,
    StackActions,
    NavigationActions,
} from 'react-navigation'
import {
    createStackNavigator,
    Header
} from 'react-navigation-stack';
import React from 'react';

import { Route, InitialStoryboard } from './NavConstants';
import HeaderBackButton from '../components/HeaderBackButton';

import LoadingScreen from '../../loading/LoadingScreen';
import AppIntroScreen from '../../app-intro/AppIntroScreen';
import PrivacyPolicyScreen from '../../terms-and-conditions/privacy-policy/PrivacyPolicyScreen';
import TermsAndConditionsScreen from '../../terms-and-conditions/terms/TermsAndConditionsScreen';
import WaterTrackerScreen from '../../water-tracker/WaterTrackerScreen';
import AreasOfFocusScreen from '../../user-data-input/areas-of-focus/AreasOfFocusScreen';

const HEADER_TITLE_STYLE = {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#3E3750'
};

const UserDataInputScreens = {
    AreasOfFocus: AreasOfFocusScreen
}

const WaterTrackerScreens = {
    WaterTracker: WaterTrackerScreen
};

const AppIntroStack = createStackNavigator(
    {
        AppIntro: {
            screen: AppIntroScreen,
            navigationOptions: () => ({
                headerBackTitle: null
            })
        },
        PrivacyPolicy: PrivacyPolicyScreen,
        TermsAndConditions: TermsAndConditionsScreen,
        ...WaterTrackerScreens,
        ...UserDataInputScreens
    },
    {
        defaultNavigationOptions: () => ({
            headerBackImage: <HeaderBackButton />,
            headerStyle: {
                backgroundColor: '#F3F4FA',
                borderBottomWidth: 0,
                elevation: 0
            },
            headerTitleStyle: HEADER_TITLE_STYLE
        })
    }
);

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function createAppNavigator(initialRoute = InitialStoryboard.Loading) {
    const AppNavigator = createSwitchNavigator(
        {
            Loading: LoadingScreen,
            AppIntro: AppIntroStack
        },
        {
            initialRouteName: initialRoute
        }
    );
    return createAppContainer(AppNavigator)
}

function push(route, params) {
    const action = StackActions.push({
        routeName: route,
        params: params
    });
    _navigator.dispatch(action);
}

function navigate(route, params) {
    const action = NavigationActions.navigate({
        routeName: route,
        params: params
    });
    _navigator.dispatch(action);
}

function headerHeight() {
    return Header.HEIGHT;
}

export {
    Route,
    InitialStoryboard,
    createAppNavigator,
    setTopLevelNavigator,
    push,
    navigate,
    headerHeight
}