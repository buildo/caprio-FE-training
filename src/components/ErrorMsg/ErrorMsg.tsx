import * as React from 'react';
import View from '../View/View';
import { FormattedMessage } from 'react-intl';
import { AppErrors, YelpError } from '../../API';

import './errormsg.scss';

export function ErrorMsg(props: { content: AppErrors; location: string }) {
  const getMsgIdFromYelpApiErrorCode = (error: YelpError): string =>
    error.code ? `YelpApiErrorCode.${error.code}` : 'YelpApiErrorCode.GENERIC';

  const errTypeMapper: Array<{ type: AppErrors['type']; content: JSX.Element }> = [
    { type: 'Decoding', content: <FormattedMessage id="App.internalError" /> },
    {
      type: 'YelpError',
      content: (
        <FormattedMessage
          id={getMsgIdFromYelpApiErrorCode(props.content as YelpError)}
          values={{
            msg: `${(props.content as YelpError).description}`,
            location: `${props.location}`
          }}
        />
      )
    }
  ];
  const renderErrMsg = () =>
    errTypeMapper.reduce(
      (prev, defiendType) => (props.content.type == defiendType.type ? defiendType.content : prev),
      <FormattedMessage id="SearchContainer.error.generic" />
    );

  return <View className="message-container animate-msg">{renderErrMsg()}</View>;
}
