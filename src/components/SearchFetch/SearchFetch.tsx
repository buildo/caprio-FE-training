import * as React from 'react';

import * as queryResult from 'avenger/lib/QueryResult';
import View from '../View/View';
import { WithQueries } from 'avenger/lib/react';
import { searchResturantQuery } from '../../queries/queries';
import { FormattedMessage, useIntl } from 'react-intl';
import { SearchResults } from '../SearchResults/SearchResults';
import { ErrorMsg } from '../ErrorMsg/ErrorMsg';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import Button from '../Button/Button';
import NavBar from '../NavBar/NavBar';
import ScrollView from '../ScrollView/ScrollView';
import './searchfetch.scss';
import { PAGE_SIZE_CONFIG } from '../../API/API';

export function SearchFetch(props: { location: string; range: number }) {
  const [curPage, setPage] = React.useState<{ page: number }>({
    page: 0
  });

  const intl = useIntl();
  const nextLabel = intl.formatMessage({ id: 'SearchContainer.result.next.button.label' });
  const prevLabel = intl.formatMessage({ id: 'SearchContainer.result.prev.button.label' });

  const curPageIsLast = (page: number, total: number) =>
    page < Math.ceil(total / PAGE_SIZE_CONFIG) - 1;

  const prevPage = (page: number) =>
    page > 0 ? setPage({ page: page - 1 }) : setPage({ page: 0 });

  const nextPage = (page: number, total: number) => {
    if (curPageIsLast(page, total)) {
      setPage({ page: page + 1 });
    }
  };

  const renderLoader = () => (
    <div style={{ position: 'relative', height: 200 }}>
      <LoadingSpinner size={150} />
    </div>
  );

  const renderPrevButton = () =>
    !curPage.page ? '' : <Button onClick={() => prevPage(curPage.page)} label={prevLabel} />;

  const renderNextButton = (total: number) =>
    curPageIsLast(curPage.page, total) ? (
      <Button label={nextLabel} onClick={() => nextPage(curPage.page, total)} />
    ) : (
      ''
    );

  return !props.location ? (
    <View className="message-empty-list" grow>
      <FormattedMessage id="SearchContainer.empty.list" />
    </View>
  ) : (
    <WithQueries
      queries={{ searchResturantQuery }}
      params={{
        searchResturantQuery: {
          location: props.location,
          range: props.range,
          page: curPage.page
        }
      }}
      render={queryResult.fold(
        renderLoader,
        error => (
          <ErrorMsg content={error} location={props.location} />
        ),
        res => (
          <View className="query-result-container" column hAlignContent="center">
            <b className="search-term-txt">
              <FormattedMessage
                id="SearchContainer.search.term"
                values={{
                  location: `${props.location}`,
                  total: res.searchResturantQuery.total,
                  page: curPage.page
                }}
              />
            </b>
            <View grow width={600}>
              <NavBar
                style={{ padding: 20 }}
                content={{
                  left: renderPrevButton(),
                  right: renderNextButton(res.searchResturantQuery.total)
                }}
              ></NavBar>
            </View>
            <ScrollView style={{ width: 600 }}>
              <SearchResults {...res.searchResturantQuery} />
            </ScrollView>
          </View>
        )
      )}
    />
  );
}
