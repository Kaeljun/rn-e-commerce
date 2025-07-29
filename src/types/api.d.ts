type User = {
  id: string;
  name: string;
  email: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Order = {
  id: number;
  userId: number;
  productIds: number[];
  totalAmount: number;
};
