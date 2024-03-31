import BasicWrapper from "../components/BasicWrapper";
import FavoritesList from "../components/FavoritesList";
import { useFavorites } from "../context/FavoritesContext";
import AlertDisplay from "../components/AlertDisplay";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <BasicWrapper width={"100%"}>
      <AlertDisplay></AlertDisplay>
      {favorites && <FavoritesList recipes={favorites}></FavoritesList>}
    </BasicWrapper>
  );
}
