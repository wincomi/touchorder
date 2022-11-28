import React from 'react';
import { useQRCode } from 'next-qrcode';
import { useRouter } from 'next/router';


function QRCodePage({tables}) {
  const { Canvas } = useQRCode();
  const router = useRouter();
  const STORE_URL = `${process.env.NEXT_PUBLIC_URL}/stores/${router.query.store_id}`
  process.env.NEXT_PUBLIC_URL
  
  //console.log(tables);
  if (tables != null) {
    tables.map((table)=>{
      console.log(table)
    });
  }
  

  return (
    <>
      <p > QR 코드 가게 : {router.query.store_id} </p>,
      <Canvas
        text={`${STORE_URL}`}
        options={{
          level: '',
          margin: 3,
          scale: 5,
          width: 200,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        }}
      />
    </>
  );
}

export default QRCodePage;


