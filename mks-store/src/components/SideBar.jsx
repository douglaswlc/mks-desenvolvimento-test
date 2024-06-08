import { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CartContext } from "../contexts/CartContext";

const Sidebar = styled.div`
  width: 400px;
  height: 100vh;
  background-color: #0f52ba;
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-400px")};
  transition: right 0.3s ease-in-out;
  box-shadow: ${({ isOpen }) =>
    isOpen ? "0px 0px 20px rgba(0, 0, 0, 0.5)" : "none"};

  h2 {
    font-family: Montserrat, sans-serif;
    color: #fff;
    font-size: 27px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 30px;
    line-height: 32px;
  }
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;

const CardProduct = styled.div`
  width: 360px;
  background-color: #fff;
  margin-bottom: 20px;
  margin-left: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  position: relative;
`;

const RemoveButton = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
  background-color: black;
  color: #fff;
  cursor: pointer;
  position: absolute;
  top: -10px;
  right: 10px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  p {
    flex: 2;
    margin: 0;
  }

  input {
    flex: 1;
  }

  h4 {
    flex: 1;
    margin: 0;
    text-align: right;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  margin: 0 10px;
`;

const TotalPrice = styled.div`
  color: #fff;
  margin-top: auto;
  position: absolute;
  bottom: 100px;
  left: 20px;
  margin-bottom: 30px;

  h1 {
    font-family: Montserrat, sans-serif;
    font-size: 28px;
    line-height: 15px;
  }
`;

const CheckoutButton = styled.button`
  width: calc(100%);
  background-color: black;
  color: #fff;
  border: none;
  padding: 30px;
  cursor: pointer;
  position: absolute;
  bottom: 0px;
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  margin: 15px;
  top: 10px;
  right: 10px;
  border-radius: 15px;
  background-color: black;
  color: #fff;

  h1 {
    font-family: Montserrat, sans-serif;
    font-size: 30px;
  }
`;

const SideBar = ({ isOpen, toggleCart, handleCheckout }) => {
  const { cart, clearCart, removeFromCart, updateQuantity } =
    useContext(CartContext);

  const handleQuantityChange = (productId, quantity) => {
    const newQuantity = parseInt(quantity, 10);
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const checkout = () => {
    handleCheckout();
    clearCart();
    toggleCart();
  };

  return (
    <Sidebar isOpen={isOpen}>
      <CloseButton onClick={toggleCart}>X</CloseButton>
      <h2>
        Carrinho
        <div>de compras</div>
      </h2>
      {cart.map((product) => (
        <CardProduct key={product.id}>
          <Image src={product.photo} alt="photo" />
          <ProductInfo>
            <p>{product.name}</p>
            <QuantityInput
              type="number"
              min="1"
              value={product.quantity}
              onChange={(e) => handleQuantityChange(product.id, e.target.value)}
            />
            <h4>R${(product.price * product.quantity).toFixed(2)}</h4>
          </ProductInfo>
          <RemoveButton onClick={() => removeFromCart(product.id)}>
            X
          </RemoveButton>
        </CardProduct>
      ))}
      <TotalPrice>
        <h1>
          Total: R${" "}
          {cart
            .reduce(
              (total, product) =>
                total + parseFloat(product.price * product.quantity),
              0
            )
            .toFixed(2)}
        </h1>
      </TotalPrice>
      <CheckoutButton onClick={checkout}>
        <h1>Finalizar Compra</h1>
      </CheckoutButton>
    </Sidebar>
  );
};

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleCart: PropTypes.func.isRequired,
  handleCheckout: PropTypes.func.isRequired,
};

export default SideBar;
