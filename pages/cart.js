/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import {RevealWrapper} from "next-reveal";
import {useSession} from "next-auth/react";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2){
    text-align: right;
  }
  table tr.subtotal td{
    padding: 15px 0;
  }
  table tbody tr.subtotal td:nth-child(2){
    font-size: 1.4rem;
  }
  tr.total td{
    font-weight: bold;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;
  const [shippingFee, setShippingFee] = useState(null);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', {ids:cartProducts})
        .then(response => {
          setProducts(response.data);
        })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
axios.get('/api/settings?name=shippingFee').then(res => {
      setShippingFee(res.data.value);
    })
  }, []);
  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get('/api/address').then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
    });
  }, [session]);
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayment() {
    const response = await axios.post('/api/checkout', {
      name,email,city,postalCode,streetAddress,country,
      cartProducts,
    });
 if (response.data.success) {
      setIsSuccess(true);
      clearCart();
    }
  
    // if (response.data.url) {
    //   window.location = response.data.url;
    // }
  }
  let productsTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    productsTotal += price;
  }
  async function confirmationStep() {
    setConfirm(true);
  }

  if (confirm) {
    return (
      <>
        <Header />
      <Center>
        <ColumnsWrapper>
          <RevealWrapper delay={0}>
            <Box>
              <h2>Cart</h2>
              {!cartProducts?.length && (
                <div>Your cart is empty</div>
              )}
              {products?.length > 0 && (
                <Table>
                  <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                  </thead>
                  <tbody>
                  {products.map(product => (
                    <tr>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt=""/>
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                      </td>
                      <td>
                        ${cartProducts.filter(id => id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr className="subtotal">
                    <td colSpan={2}>Products</td>
                    <td>${productsTotal}</td>
                  </tr>
                  <tr className="subtotal">
                    <td colSpan={2}>Shipping</td>
                    <td>${shippingFee}</td>
                  </tr>
                  <tr className="subtotal total">
                    <td colSpan={2}>Total</td>
                    <td>${productsTotal + parseInt(shippingFee || 0)}</td>
</tr>
                  </tbody>
                </Table>
              )}
            </Box>
          </RevealWrapper>
          {!!cartProducts?.length && (
            <RevealWrapper delay={100}>
              <Box>
                <h2>Order information</h2>
                <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>{name}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{email}</td>
                    </tr>
                    <tr>
                      <td>City:</td>
                      <td>{city}</td>
                    </tr>
                    <tr>
                      <td>Postal Code:</td>
                      <td>{postalCode}</td>
                    </tr>
                    <tr>
                      <td>Street Address:</td>
                      <td>{streetAddress}</td>
                    </tr>
                    <tr>
                      <td>Country:</td>
                      <td>{country}</td>
                    </tr>
                  </tbody>
                <Button black block
                        onClick={goToPayment}>
                  Confirm
                </Button>
              </Box>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
      </>
    )
  }
if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <RevealWrapper delay={0}>
            <Box>
              <h2>Cart</h2>
              {!cartProducts?.length && (
                <div>Your cart is empty</div>
              )}
              {products?.length > 0 && (
                <Table>
                  <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                  </thead>
                  <tbody>
                  {products.map(product => (
                    <tr>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt=""/>
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <Button
                          onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        ${cartProducts.filter(id => id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr className="subtotal">
                    <td colSpan={2}>Products</td>
                    <td>${productsTotal}</td>
                  </tr>
                  <tr className="subtotal">
                    <td colSpan={2}>Shipping</td>
                    <td>${shippingFee}</td>
                  </tr>
                  <tr className="subtotal total">
                    <td colSpan={2}>Total</td>
                    <td>${productsTotal + parseInt(shippingFee || 0)}</td>
 </tr>
                  </tbody>
                </Table>
              )}
            </Box>
          </RevealWrapper>
          {!!cartProducts?.length && (
            <RevealWrapper delay={100}>
              <Box>
                <h2>Order information</h2>
                <Input type="text"
                       placeholder="Name"
                       value={name}
                       name="name"
                       onChange={ev => setName(ev.target.value)} />
                <Input type="text"
                       placeholder="Email"
                       value={email}
                       name="email"
                       onChange={ev => setEmail(ev.target.value)}/>
                <CityHolder>
                  <Input type="text"
                         placeholder="City"
                         value={city}
                         name="city"
                         onChange={ev => setCity(ev.target.value)}/>
                  <Input type="text"
                         placeholder="Postal Code"
                         value={postalCode}
                         name="postalCode"
                         onChange={ev => setPostalCode(ev.target.value)}/>
                </CityHolder>
                <Input type="text"
                       placeholder="Street Address"
                       value={streetAddress}
                       name="streetAddress"
                       onChange={ev => setStreetAddress(ev.target.value)}/>
                <Input type="text"
                       placeholder="Country"
                       value={country}
                       name="country"
                       onChange={ev => setCountry(ev.target.value)}/>
                <Button black block
                        onClick={goToPayment}>
                        
                  Continue to payment
                </Button>
              </Box>
