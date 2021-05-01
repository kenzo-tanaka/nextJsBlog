import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  SearchBox,
  Hits,
  Highlight,
  InstantSearch,
} from "react-instantsearch-dom";

const algoliaSettings = {
  searchClient: algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  ),
  indexName: "kenzo_blog",
};

const Hit = ({ hit }: any) => {
  return (
    <div className="hit">
      <div className="hitImage">
        <h2>{hit.title}</h2>
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
