import { useQuery } from "react-query";
import axios from "axios";
import styled from "styled-components";
import { motion } from "framer-motion";
import ShoppingSVG from "../assets/shopping.svg";
import Skeleton from "../shared/Skeleton";
import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from '../contexts/CartContext';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 80px;
`;

const ProductGrid = styled.div`
  width: 938px;
  height: 650px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const Product = styled(motion.div)`
  border: 0cap.5px solid #ccc;
  border-radius: 10px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const ProductInfo = styled.div`
  padding: 16px;
  flex-grow: 1;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
`;

const NameAndPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ProductName = styled.p`
  font-family: Montserrat, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  width: 124px;
  height: 38px;
  margin: 0;
  opacity: 1;
`;

const ProductPriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 30px;
  background-color: black;
  border-radius: 5px;
`;

const ProductPrice = styled.p`
  font-family: Montserrat, sans-serif;
  font-size: 13px;
  font-weight: 700;
  line-height: 15px;
  text-align: center;
  color: #fff;
  opacity: 1;
`;

const ProductDescription = styled.p`
  width: 192px;
  height: 25px;
  font-family: Montserrat, sans-serif;
  font-size: 10px;
  font-weight: 300;
  line-height: 12px;
  text-align: left;
  margin: 0;
  opacity: 1;
`;

const BuyButtonBackground = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f52ba;
  color: #fff;
  width: 100%;
  height: 32px;
  margin-bottom: 0px;
  cursor: pointer;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;

  img {
    margin-right: 5px;
  }
`;

const fetchProducts = async () => {
  const { data } = await axios.get(
    "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=8&sortBy=id&orderBy=ASC"
  );
  return data.products;
};

const ProductList = () => {
  const { addToCart } = useContext(CartContext);
  const { data, error, isLoading } = useQuery("products", fetchProducts);

  if (isLoading) return <Skeleton />;

  if (error) return <div>Error loading products</div>;


  return (
    <Container>
      <ProductGrid>
        {data.map((product) => (
          <Product key={product.id}>
            <ImageContainer>
              <Image src={product.photo} alt={product.name} />
            </ImageContainer>
            <ProductInfo>
              <NameAndPriceContainer>
                <ProductName>{product.name}</ProductName>
                <ProductPriceContainer>
                  <ProductPrice>{`R$${product.price}`}</ProductPrice>
                </ProductPriceContainer>
              </NameAndPriceContainer>
              <ProductDescription>{product.description}</ProductDescription>
            </ProductInfo>
            <BuyButtonBackground onClick={() => addToCart(product)}>
              <img src={ShoppingSVG} alt="ShoppingSVG" />
              Comprar
            </BuyButtonBackground>
          </Product>
        ))}
      </ProductGrid>
    </Container>
  );
};

ProductList.propTypes = { 
  addToCart: PropTypes.func.isRequired,
};

export default ProductList;
