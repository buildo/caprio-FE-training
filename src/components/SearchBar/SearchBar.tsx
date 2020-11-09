import * as React from "react"

import { Input, Button } from 'buildo-react-components'
import Dropdown from "../Dropdown";

import "./searchbar.scss";
import View from "../View/View";

type RadiusType = { value: number; label: string };

class SearchBar extends React.Component {

    render() {
        let tmpVal: string = 'Search Location'
        
        // TODO : 
        const mockUpdateLocation = (val: String) => console.log(`Location ${val}`);
        const mockUpdateRadius = (radius: RadiusType) => console.log(`Radius ${radius.label}`);
        const mockPerformSearch = () => console.log('Search with Yelp API')

        const buttonProps = {
            onClick: mockPerformSearch,
            style: { margin: 10, width: 100 }
          };

        return (
            <View width='100%'
                hAlignContent='center'
                vAlignContent='center'
                basis={300}
                className='search-bar'>

                <form>
                    <View vAlignContent='center'>
                        <Input label="Location search :"
                            value={tmpVal}
                            onChange={mockUpdateLocation} />
                        <Dropdown
                            options={[{ value: 5, label: '5 km' }]}
                            value={5}
                            onChange={mockUpdateRadius} />
                        <Button label="Search" flat {...buttonProps} />
                    </View>
                </form>
            </View>
        );
    }
}

export default SearchBar