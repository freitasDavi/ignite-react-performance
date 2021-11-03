import { memo, useState } from "react";
import { IAddProductToWishListProps } from "./AddProductToWishlist";
import dynamic from "next/dynamic";
import lodash from "lodash";

const AddProductToWishList = dynamic<IAddProductToWishListProps>(
  () => {
    return import("./AddProductToWishlist").then(
      (mod) => mod.AddProductToWishList
    );
  },
  {
    loading: () => <span>Carregando..</span>,
  }
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  // async function showFormattedDate() {
  //   const { format } = await import("date-fns");

  //   format();
  // }

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);

/**
 * Quando se deve usar o Memo
 * 1. Pure functional Components
 * 2. Renders too often (demais)
 * 3. Re-renders with same props
 * 4. Medium to big size
 */
