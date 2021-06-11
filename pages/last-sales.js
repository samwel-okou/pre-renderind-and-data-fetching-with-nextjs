import React from "react";
import useSWR from "swr";
import { useEffect, useState } from "react";

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://next-course-94baf-default-rtdb.firebaseio.com/sales.json"
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];

      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://next-course-94baf-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  //   if (isLoading) {
  //     return <p>Data is loading data...</p>;
  //   }

  if (error) {
    return <p>Fails To Load</p>;
  }

  if (!data && !sales) {
    return <p>Data is loading data...</p>;
  }

  //   if (!sales) {
  //     return <p>No Sales Yet</p>;
  //   }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username}- ${sale.volume}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    "https://next-course-94baf-default-rtdb.firebaseio.com/sales.json"
  );
  const data = await response.json();

  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: { sales: transformedSales },
    // revalidate: 10,
  };
}

export default LastSalesPage;
