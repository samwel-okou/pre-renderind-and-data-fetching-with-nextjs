import path from "path";
import fs from "fs";
import { Fragment } from "react";

const ProductDetailPge = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productid = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productid);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,

    // [
    //   { params: { pid: "p1" } },
    //   //   { params: { pid: "p2" } },
    //   //   { params: { pid: "p3" } },
    // ],
    fallback: true,
  };
}

export default ProductDetailPge;
