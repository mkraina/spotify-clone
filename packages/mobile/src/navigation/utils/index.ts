import React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

import { AppParamList } from '../types';

import * as screenOptions from './screenOptions';

export { screenOptions };

export const navigationRef = React.createRef<NavigationContainerRef<AppParamList>>();
