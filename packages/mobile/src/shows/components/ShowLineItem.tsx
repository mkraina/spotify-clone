import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { SimplifiedShow } from 'spotify-types';

import { LineItem, useLineItemContext } from '../../ui';

export const ShowLineItem: React.FC<SimplifiedShow> = item => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  return (
    <LineItem
      onPress={() => navigate('show', item)}
      image={item.images[0]?.url}
      title={item.name}
      subTitle={`${useLineItemContext()?.showExtraInfo ? `${t('showCardSubTitle')} · ` : ''}${
        item.publisher
      }`}
    />
  );
};
