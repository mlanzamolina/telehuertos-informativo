import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const Details = () => {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Headers for the API request
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        myHeaders.append('x-api-key', 'YXBpa2V5X21zcHNfdHJhbWl0ZXM=');

        // API endpoint URL for POST request
        const apiUrl = 'http://des.sanpedrosula.hn:8082/MultiTeles/index.php/post/detalle';

        // Fetch item details based on the 'id' parameter using POST method and specified headers
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: myHeaders,
          body: `idPost=${id}`,
          redirect: 'follow',
        });

        if (response.ok) {
          const data = await response.json();
          setItemDetails(data[0]);
        } else {
          console.error('Error fetching item details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchData();
  }, []);

return (
    <>
        {itemDetails ?  <h1>HI {itemDetails.categoria}</h1> : <h1>no hay</h1>}
    </>
);
};
  export default Details;