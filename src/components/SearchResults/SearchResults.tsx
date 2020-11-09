import React from "react"
import View from "../View"
import { pipe } from "fp-ts/lib/pipeable";
import { FormattedMessage } from "react-intl";

import "./searchresults.scss"

const mockList: Array<string> = ["Item 1", "Item 2", "Item 3"]

class SearchResults extends React.Component {
    render() {
        return <View className="search-results" column hAlignContent={"center"}>
            <h2 className="container-title" > <FormattedMessage id="Homepage.results.title" /> </h2>
            {
                pipe(
                    mockList,
                    (items) => (
                        items.map(name => <View
                            className="result-item"
                            hAlignContent={"center"}
                            width='100%'>  - {name}
                        </View>)
                    )
                )
            }
        </View>
    }
}

export default SearchResults
