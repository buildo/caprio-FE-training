import * as React from 'react';
import View from '../View/View';
import { FormattedMessage } from 'react-intl';
import { AppErrors, YelpError } from '../../API';
import cx from 'classnames';
import './errormsg.scss';

export function ErrorMsg(props: { content: AppErrors; location: string }) {
  const getMsgIdFromYelpApiErrorCode = (error: YelpError): string =>
    `YelpApiErrorCode.${error.code}`;

  const renderErrMsg = () =>
    props.content.type === 'YelpError' ? (
      <FormattedMessage
        id={getMsgIdFromYelpApiErrorCode(props.content as YelpError)}
        values={{
          msg: `${(props.content as YelpError).description}`,
          location: `${props.location}`
        }}
      />
    ) : (
      <FormattedMessage id="App.internalError" />
    );

  return <View className={cx('message-container', 'animate-msg')}> {renderErrMsg()}</View>;
}
