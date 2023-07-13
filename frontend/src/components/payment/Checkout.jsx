import { useNavigate, useParams } from "react-router";
import tyreImage from '../../assets/images/tyres.png';
import carHLImage from '../../assets/images/carHL.png';

const PRODUCTS = [
  {
    id: 0,
    name: 'Typres',
    price: 800,
    currencyUnit: '$',
    inStock: 200,
    imgSrc: tyreImage
  },
  {
    id: 1,
    name: 'Car Headlight',
    price: 300,
    currencyUnit: '$',
    inStock: 150,
    imgSrc: carHLImage
  }
]

export default function Checkout() {
  const { id } = useParams();

  const product = PRODUCTS.find(e => e.id === id);

  return (
    <div className="product-checkout d-flex justify-content-center align-item-center">
      <div>
        checkout
        </div>
    </div>
  )
}