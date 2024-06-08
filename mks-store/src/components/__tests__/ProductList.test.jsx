import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider } from "../../contexts/CartContext";
import ProductList from "../ProductList";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);
const queryClient = new QueryClient();

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description 1",
    image: "image1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description 2",
    image: "image2.jpg",
  },
];

mock
  .onGet(
    "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/products"
  )
  .reply(200, { products });

describe("ProductList", () => {
  it("renders products", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductList />
        </CartProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });
});
