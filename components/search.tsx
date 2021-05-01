import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  SearchBox,
  Hits,
  Highlight,
  InstantSearch,
} from "react-instantsearch-dom";

const algoliaSettings = {
  searchClient: algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76"),
  indexName: "instant_search",
};

const Hit = ({ hit }: any) => {
  return (
    <div className="hit">
      <div className="hitImage">
        <img src={hit.image} />
      </div>
      <div className="hitName">
        <Highlight attribute="name" hit={hit} />
      </div>
    </div>
  );
};

const SearchResult = () => {
  return (
    <div className="search-result">
      <Hits hitComponent={Hit} />
    </div>
  );
};

const Search: React.FC = () => {
  return (
    <>
      <InstantSearch
        searchClient={algoliaSettings.searchClient}
        indexName={algoliaSettings.indexName}
      >
        <SearchBox translations={{ placeholder: "search..." }} />
        <div>
          <SearchResult />
        </div>
      </InstantSearch>
    </>
  );
};

export default Search;
