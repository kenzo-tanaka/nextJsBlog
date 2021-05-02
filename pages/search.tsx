import Layout from "../components/layout";
import Search from "../components/search";
import { PageSEO } from "../components/pageSEO";

const SearchPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-5">
      <PageSEO title="検索" />
      <Search />
    </div>
  );
};

export default SearchPage;
