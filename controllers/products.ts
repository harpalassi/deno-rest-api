import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types.ts";

let products: Product[] = [
  {
    id: "1",
    name: "first product",
    description: "its the first",
    price: 30.99,
  },
  {
    id: "2",
    name: "second product",
    description: "its the second",
    price: 99.99,
  },
  {
    id: "3",
    name: "third product",
    description: "its the third",
    price: 104.99,
  },
];

// @desc    Get all products
// @route   GET /api/v1/products

const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @desc    get single product
// @route   GET /api/v1/product/:id

const getProduct = (
  { response, params }: { params: { id: string }; response: any },
) => {
  const product: Product | undefined = products.find((product) =>
    product.id === params.id
  );

  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: "No product found",
    };
  }
};

// @desc    add single product
// @route   POST /api/v1/product/:id

const addProduct = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      message: "No data",
    };
  } else {
    const product: Product = body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  }
};

// @desc    Update single product
// @route   PUT /api/v1/product/:id

const updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const product: Product | undefined = products.find((product) =>
    product.id === params.id
  );

  if (product) {
    const body = await request.body();

    const updateData: { name?: string; description?: string; price?: number } =
      body.value;

    products = products.map((product) =>
      product.id === params.id ? { ...product, ...updateData } : product
    );
    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      message: "No product found",
    };
  }
};

// @desc    delete single product
// @route   DELETE /api/v1/product/:id

const deleteProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  products = products.filter((product) => product.id !== params.id);
  response.body = {
    success: true,
    message: "Product removed!",
  };
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
