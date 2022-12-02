import SellerLayout from "@components/seller/SellerLayout"
import HeaderTitle from "@components/seller/HeaderTitle"
import Setup from "./setup"
import { useState } from "react"
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const [storeData, getStoreData]=useState([]);
    
    const store_id = req.body.store_id
    const 
    const items = await ;
    
    return (
      <SellerLayout>
        <p className="text-muted">현재 기능 준비 중입니다 :)</p>
        <Setup>

        </Setup>
      </SellerLayout>
    )
}