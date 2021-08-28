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
  <input
    type="text"
    value={currentRefinement}
    onChange={event => refine(event.currentTarget.value)}
  />
);

const CustomSearchBox = connectSearchBox(SearchBox);

const Search: React.FC = () => {
  const [suggestDisplay, toggleDisplay] = useState("hidden");

  return (
    <>
      <InstantSearch
        searchClient={algoliaSettings.searchClient}
        indexName={algoliaSettings.indexName}
      >
        <div
          onFocus={() => toggleDisplay("block")}
          onBlur={() =>
            setTimeout(() => {
              toggleDisplay("hidden");
            }, 300)
          }
        >
          <CustomSearchBox />
        </div>
        <div className={`relative ${suggestDisplay}`}>
          <div className="bg-white search-result p-3 shadow-lg absolute w-full z-10 h-96 overflow-y-scroll">
            <SearchResult />
          </div>
        </div>
      </InstantSearch>
    </>
  );
};

export default Search;
