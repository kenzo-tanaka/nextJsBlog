import Layout from "../components/layout";
import Search from "../components/search";
import { PageSEO } from "../components/pageSEO";

const SearchPage = () => {
  return (
    <Layout>
      <Search />
      <PageSEO title="検索" />
    </Layout>
  );
};

export default SearchPage;
