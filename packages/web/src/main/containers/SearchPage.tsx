import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { withParams } from '../../navigation';
import { SearchBar } from '../../ui';
import { Page } from '../components/Page';

export default withParams<'search'>(props => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  return (
    <Page
      toolbarComponent={
        <SearchBar placeholder={t('searchInputPlaceholder')} value={value} onChange={setValue} />
      }
    />
  );
});
