import BasicWrapper from "../components/BasicWrapper";
import SearchRecipes from "../components/SearchRecipes";

export default function HomePage() {
  return (
    <BasicWrapper width="calc(100% - 6em)">
      <SearchRecipes></SearchRecipes>
    </BasicWrapper>
  );
}
