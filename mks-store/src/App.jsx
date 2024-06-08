import { useState } from "react";
import styled from "styled-components";
import ProductList from "./components/ProductList";
import MksSVG from "../src/assets/mks.svg";
import SystemSvg from "../src/assets/system.svg";
import Cart from "../src/assets/cart.svg";
import SideBar from "./components/SideBar";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #0f52ba;
  border-bottom: 1px solid #ddd;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImageMks = styled.img`
  width: 128px;
  height: 44px;
  margin-right: 10px;
`;

const ImageSystem = styled.img`
  width: 100px;
  height: 44px;
  margin-top: 20px;
`;

const ButtonCart = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 45px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  cursor: pointer;

  img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  h1 {
    font-size: 18px;
    margin: 0;
  }
`;

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  const handleCheckout = () => {
    setCart([]);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div>
      <Header>
        <LogoContainer>
          <ImageMks src={MksSVG} alt="MksSVG" />
          <ImageSystem src={SystemSvg} alt="SystemSvg" />
        </LogoContainer>
        <ButtonCart onClick={toggleCart}>
          <img src={Cart} alt="Cart" />
        </ButtonCart>
      </Header>
      <main>
        <ProductList addToCart={addToCart} />
      </main>
      {isCartOpen && (
        <SideBar
          isOpen={isCartOpen}
          toggleCart={toggleCart}
          handleCheckout={handleCheckout}
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      )}
    </div>
  );
};

export default App;
