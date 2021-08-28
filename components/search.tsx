import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import Link from "next/link";
import {
  Hits,
  Highlight,
  InstantSearch,
  connectSearchBox
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
      <a tabIndex={0}>
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
  return <Hits hitComponent={Hit} />;
};

const SearchBox = ({ currentRefinement, refine }: any) => (
  <div className="bg-white shadow p-2 flex rounded-md">
    <span className="w-auto flex justify-end items-center text-gray-500 p-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </span>
    <input
      className='w-full rounded p-2 outline-none'
      type="text"
      placeholder='記事を検索'
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
    />
  </div>
);

const CustomSearchBox = connectSearchBox(SearchBox);

const Search: React.FC = () => {
  const [suggestDisplay, toggleDisplay] = useState("hidden");

  return (
    <div
      onFocus={() => toggleDisplay("block")}
    >
      <InstantSearch
        searchClient={algoliaSettings.searchClient}
        indexName={algoliaSettings.indexName}
      >
        <CustomSearchBox />
        <div className={`relative ${suggestDisplay}`}>
          <div className="bg-white search-result p-3 shadow-lg absolute w-full z-10 h-96 overflow-y-scroll border-t border-gray-300">
            <SearchResult />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

export default Search;
