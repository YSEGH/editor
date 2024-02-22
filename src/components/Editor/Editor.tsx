import React, { useRef } from "react";
import FilerobotImageEditor from "react-filerobot-image-editor";

const Editor = () => {
  const editorRef = useRef(null);

  const getCurrentImageData = () => {
    const currentImgData = (editorRef as any).current();
    console.log(currentImgData);
  };

  return (
    <div className="editor">
      <FilerobotImageEditor
        getCurrentImgDataFnRef={editorRef}
        source="https://cdn.discordapp.com/attachments/1202694746225770559/1206647748682588170/ysegh_Une_fourmie_qui_joue_au_basket_f675b66a-7d46-4ef6-96ac-f96678648057.png?ex=65dcc549&is=65ca5049&hm=9e96d7a8d4a7789892a280eb45ac2412f6cbb66d44abfbd9fed65f301d18fe7b&"
        showCanvasOnly
        savingPixelRatio={100}
        previewPixelRatio={100}
        Crop={{
          ratio: 1 / 1,
          noPresets: true,
        }}
      />
      <button onClick={getCurrentImageData}>Test</button>
    </div>
  );
};

export default Editor;
