import React from "react";
import algoliasearch from "algoliasearch/lite";
import Link from "next/link";
import {
  SearchBox,
  Hits,
  Highlight,
  InstantSearch,
} from "react-instantsearch-dom";

const algoliaSettings = {
  searchClient: algoliasearch(
    `${process.env.ALGOLIA_APP_ID}`,
    `${process.env.ALGOLIA_API_KEY}`
  ),
  indexName: "kenzo_blog",
};

const Hit = ({ hit }: any) => {
  return (
    <Link href={`/posts/${hit.slug}`}>
      <a>
        <div className="p-7">
          <div className="hitName">
            <Highlight attribute="title" tagName="span" hit={hit} />
          </div>
        </div>
      </a>
    </Link>
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
        <SearchBox />
        <div className="mt-2 bg-white shadow-md p-3">
          <SearchResult />
        </div>
      </InstantSearch>
    </>
  );
};

export default Search;
