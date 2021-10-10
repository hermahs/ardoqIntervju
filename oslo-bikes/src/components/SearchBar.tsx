import * as React from 'react';
import SearchResult from './SearchResults';
import { searchStationMultiple, Station } from './types/Station';

const SearchBar = (props: {stations: Station[], parentCallback: (data: Station) => void}) => {

    const [search, setSearch] = React.useState<string>("");
    const [searchResult, setSearchResult] = React.useState<Station[]>([]);
    let input: HTMLInputElement | null = null;

    const handleChange = () => {
        searchStuff();
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        searchStuff();
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if(event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            searchStuff();
        }
    }

    const searchStuff = (): void => {
        if(input?.value) {
            setSearch(input.value);
        }
        setSearchResult(searchStationMultiple(search, props.stations));

    }

    const handleClickOnResult = (data: Station) => {
        props.parentCallback(data);
    }

    return (
        <div className="SearchBar">
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                <input type="text" name="yeet" id="yeet" placeholder="Søk opp en stasjon" onChange={handleChange} ref={node => input = node}/>
            </form>
            <SearchResult results={searchResult} parentCallback={handleClickOnResult}></SearchResult>
        </div>
    )

}

export default SearchBar;