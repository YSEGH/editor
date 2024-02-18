import axios from "axios";
import "./App.css";
import { MouseEvent, useEffect, useRef, useState } from "react";
import Editor from "./components/Editor/Editor";
import DashboardEditor from "./components/DashboardEditor/DashboardEditor";

const imgUrl =
  "https://cdn.discordapp.com/attachments/1202694746225770559/1206647748682588170/ysegh_Une_fourmie_qui_joue_au_basket_f675b66a-7d46-4ef6-96ac-f96678648057.png?ex=65dcc549&is=65ca5049&hm=9e96d7a8d4a7789892a280eb45ac2412f6cbb66d44abfbd9fed65f301d18fe7b&";

interface imgAttributes {
  x: number;
  y: number;
  height: number;
  width: number;
}
function App() {
  const inputPrompt = useRef("");
  const [images, setImages] = useState<any[]>([]);

  const createOrderHandler = async () => {
    const order = {
      recipient: {
        name: "John Smith",
        company: "John Smith Inc",
        address1: "19749 Dearborn St",
        address2: "string",
        city: "Chatsworth",
        state_code: "CA",
        state_name: "California",
        country_code: "US",
        country_name: "United States",
        zip: "91311",
        phone: "33690988776",
        email: "ysegh.dev@gmail.com",
        tax_number: "123.456.789-10",
      },
      items: [
        {
          name: "Test de commande 1",
          variant_id: 6879,
          retail_price: 29.99,
          quantity: 1,
          files: [
            {
              type: "default",
              url: "https://cdn.discordapp.com/attachments/1202694746225770559/1206647748682588170/ysegh_Une_fourmie_qui_joue_au_basket_f675b66a-7d46-4ef6-96ac-f96678648057.png?ex=65dcc549&is=65ca5049&hm=9e96d7a8d4a7789892a280eb45ac2412f6cbb66d44abfbd9fed65f301d18fe7b&",
              position: {
                area_width: 1000,
                area_height: 1000,
                width: 500,
                height: 500,
                top: 0,
                left: 500,
              },
              filename: "shirt1.png",
              visible: true,
            },
            {
              type: "mockup",
              url: "https://cdn.discordapp.com/attachments/1202694746225770559/1206647748682588170/ysegh_Une_fourmie_qui_joue_au_basket_f675b66a-7d46-4ef6-96ac-f96678648057.png?ex=65dcc549&is=65ca5049&hm=9e96d7a8d4a7789892a280eb45ac2412f6cbb66d44abfbd9fed65f301d18fe7b&",
              filename: "shirt1.png",
              position: {
                area_width: 1000,
                area_height: 1000,
                width: 400,
                height: 400,
                top: 500,
                left: 500,
              },
              visible: true,
            },
          ],
        },
      ],
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/store/printful/orders",
        order
      );
      console.log(response);
    } catch (error) {
      console.error("Erreur lors de la récupération du variant:", error);
    }
  };
  const onClickPromptHandler = async () => {
    try {
      const response = await axios.post("http://localhost:9000/store/prompt", {
        prompt: inputPrompt.current,
      });
      setImages([...response.data, ...images]);
    } catch (error: any) {
      console.log(error);
    }
  };
  /*   useEffect(() => {
    const fetchVariant = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/store/printful/store/variants/@65cb292fd43044"
        );
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du variant:", error);
      }
    };

    fetchVariant();
  }, []); */

  /*  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/store/printful/store/products/@65ca5764535565"
        );
        console.log(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    };

    fetchProducts();
  }, []); */

  const createProductHandler = async () => {
    const product = {
      sync_product: {
        name: "Poster Test 2",
        is_ignored: false,
        thumbnail:
          "https://files.cdn.printful.com/products/171/6872_1527678721.jpg",
      },
      sync_variants: [
        {
          variant_id: 6872,
          retail_price: "29.99",
          files: [
            {
              type: "default",
              url: "https://cdn.discordapp.com/attachments/1202694746225770559/1206647748682588170/ysegh_Une_fourmie_qui_joue_au_basket_f675b66a-7d46-4ef6-96ac-f96678648057.png?ex=65dcc549&is=65ca5049&hm=9e96d7a8d4a7789892a280eb45ac2412f6cbb66d44abfbd9fed65f301d18fe7b&",
              position: {
                area_width: 1000,
                area_height: 1000,
                width: 400,
                height: 400,
                top: 500,
                left: 500,
              },
              filename: "shirt1.png",
              visible: true,
            },
            {
              type: "mockup",
              url: "https://cdn.discordapp.com/attachments/1202694746225770559/1206647748682588170/ysegh_Une_fourmie_qui_joue_au_basket_f675b66a-7d46-4ef6-96ac-f96678648057.png?ex=65dcc549&is=65ca5049&hm=9e96d7a8d4a7789892a280eb45ac2412f6cbb66d44abfbd9fed65f301d18fe7b&",
              filename: "shirt1.png",
              position: {
                area_width: 1000,
                area_height: 1000,
                width: 400,
                height: 400,
                top: 500,
                left: 500,
              },
              visible: true,
            },
          ],
        },
      ],
    };

    try {
      const response = await axios.post(
        `http://localhost:9000/store/printful/store/products/`,
        product
      );
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la création des produits:", error);
    }
  };

  const imageAttributes = useRef<imgAttributes | null>(null);
  const getImageEditorAttributs = (attributes: imgAttributes) => {
    imageAttributes.current = attributes;
  };

  return (
    <div className="app">
      {/* <input
        type="text"
        onChange={(e) => (inputPrompt.current = e.target.value)}
      />
      <button onClick={onClickPromptHandler}>PROMPT</button>
      <button onClick={createProductHandler}>Create product</button>
      <button onClick={createOrderHandler}>Create order</button>
      <button onClick={createOrderHandler}>Get Image Details</button>

      <div>
        {images.map((image: any, i) => (
          <ImgElement
            key={i}
            src={image.base64}
            id={image.id}
            msgId={image.msgId}
          />
        ))}
      </div> */}
      <div
        className="menu"
        style={{ height: 50, width: "100vw", background: "grey" }}
      ></div>
      <DashboardEditor />
    </div>
  );
}

const ImgElement = ({ src, id, msgId }: any) => {
  const onClickUpscaleHandler = async (e: MouseEvent<any>) => {
    try {
      /*  const response: any = await axios.post("http://localhost:3000/upscale", {
        msgId: (e.target as HTMLImageElement).dataset.msgid,
        flags: 0,
        customId: (e.target as HTMLImageElement).dataset.id,
      }); */

      /*  const response: any = await axios.get(
        "http://localhost:9000/store/printful/product",
        {
          data: {
            height: 120,
          },
        }
      ); */

      const response: any = await axios.delete(
        `http://localhost:9000/store/image`,
        {
          params: { filename: "test-1.png" },
        }
      );

      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <img
      style={{
        width: 1024,
        height: 1024,
        objectFit: "contain",
        cursor: "pointer",
      }}
      src={src}
      data-id={id}
      data-msgid={msgId}
      onClick={onClickUpscaleHandler}
      alt=""
    />
  );
};

export default App;
