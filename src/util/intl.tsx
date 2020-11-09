import * as React from "react";
import { IntlProvider as IntlIntlProvider } from "react-intl";
import { Locale } from "../setup/loadLocale";
export type _IntlData = {
  locales: string[];
  messages: { [k: string]: string };
};
export type IntlData = _IntlData & { locale: string };

export function addLocaleDataAndResolve(
  locale: Locale,
  resolve: (intlData: IntlData) => void
) {
  return (intl: _IntlData) => {
    if (!Intl.PluralRules) {
      require("@formatjs/intl-pluralrules/polyfill");
      require(`@formatjs/intl-pluralrules/locale-data/${locale}`);
    }

    //@ts-ignore
    if (!Intl.RelativeTimeFormat) {
      require("@formatjs/intl-relativetimeformat/polyfill");
      require(`@formatjs/intl-relativetimeformat/locale-data/${locale}`);
    }

    resolve({ ...intl, locale });
  };
}

export type Props = {
  locale: Locale;
  loadLocale: (locale: Locale) => Promise<IntlData>;
  children: any;
};

export class IntlProvider extends React.Component<Props> {
  state: { intlData?: IntlData } = {};

  componentDidMount() {
    this.props.loadLocale(this.props.locale).then((intlData) => {
      this.setState({ intlData });
    });
  }

  render() {
    return this.state.intlData ? (
      <IntlIntlProvider {...this.state.intlData}>
        {this.props.children}
      </IntlIntlProvider>
    ) : null;
  }
}
