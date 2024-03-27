"use client";

import { getBase64 } from "@/utils/base64ecoder";
import { useState } from "react";

type Props = {
  name: string;
  label: string;
  initValue?: string | undefined;
  onChange?: (newValue: string | undefined) => void;
  className?: string;
};

export default function ImagePasteZone(props: Props) {
  const [imgData, setImgData] = useState<string | undefined>();

  // const pasteImg = async () => {
  //   // try {
  //   //   const clipboardItems = await navigator.clipboard.read();
  //   //   const blobOutput = await clipboardItems[0].getType("image/png");
  //   //   const data = URL.createObjectURL(blobOutput);
  //   //   setImgData(data);
  //   // } catch (e) {
  //   //   console.log(e);
  //   // }

  //   navigator.clipboard.read().then((clipboardItems) => {

  //   });

  //   try {
  //     const blobOutput = await clipboardItems[0].getType("image/png");
  //     const data = URL.createObjectURL(blobOutput);
  //     setImgData(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handlePaste = (clipboardData: DataTransfer) => {
    if (clipboardData?.files.length) {
      const fileObject = clipboardData.files[0];
      // const file = {
      //   getRawFile: () => fileObject,
      //   name: fileObject.name,
      //   size: fileObject.size,
      //   uid: guid(),
      //   status: 2,
      //   progress: 0,
      // };

      // const filesState = this.state.files.map((f) => ({ ...f }));
      // filesState.push(file);

      // this.setState({ files: filesState });
      console.info(fileObject);
      const objectUrl = URL.createObjectURL(fileObject);
      console.info(objectUrl);
      // setImgData(objectUrl);
      getBase64(fileObject)
        .then((base64) => {
          console.info("Base64 of file", base64);
          setImgData(base64);
          if (props.onChange) {
            props.onChange(base64);
          }
        })
        .catch((err) => console.error("Failed to get Base64 from file", err));
    } else {
      alert(
        "No image data was found in your clipboard. Copy an image first or take a screenshot."
      );
    }
  };

  return (
    <div className={props.className}>
      <label
        htmlFor={props.name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      {!imgData && (
        <input
          type="text"
          name={props.name}
          id={props.name}
          onPaste={(e) => handlePaste(e.clipboardData)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="Insert image"
        />
      )}
      {imgData && <img src={imgData} />}
    </div>
  );
}
