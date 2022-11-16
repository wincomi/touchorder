import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// 400 bad request
// 200 no result

const viewMyReview = async (req: NextApiRequest, res: NextApiResponse) => {
  const user_id : Number = Number(req.query.user_id)


  switch (req.method) {
    
  // user_id로 내 리뷰 찾기
  case "GET":
    if(!isNaN(user_id)){
      const MyView = await prisma.review.findMany({
        where: {
          user_id: user_id
        },
        orderBy: [
          {regdate: 'desc'},
          {rating: 'desc'} // 최근 등록일 + 평점순 정렬
          ],
        });
        if (MyView != null) {
          res.status(200).send(MyView)
        } else {
          res.status(400).json({
            "message": "store_id에 해당하는 store가 없습니다."
          })
        }
    }
    else {
          // 만약 store_id에 숫자가 아닌 다른 값이 들어갈 경우 400 Bad Request
          res.status(400).json({
          "message": "store_id는 숫자로 요청해야합니다."
          })
      }
      break

  // 리뷰 생성
  case "POST":
    const createReview = await prisma.review.create({
      data: {
        user_id: Number(user_id),
        store_id: Number(req.body.store_id),
        menu_id: Number(req.body.menu_id),
        rating: Number(req.body.rating),
        content: req.body.content,
        image_url1: req.body.img1, 
        image_url2: req.body.img2, 
        image_url3: req.body.img3, //!= null ? req.body.img3 : undefined,
      },
    });
  
    res.status(200).json(createReview)
    break

  // 리뷰 수정
  case "PUT":
    const updateReview = await prisma.review.update({
      where:{
        review_id: req.body.review_id,
        //user_id: user_id,  //외래키 지정 후 시도
      },
      data: {
        rating: Number(req.body.rating),
        content: req.body.content,
        image_url1: req.body.img1, 
        image_url2: req.body.img2, 
        image_url3: req.body.img3, 
      },
    });
    res.status(200).json(updateReview)
    break

  // 리뷰 삭제
  case "DELETE":
    const deleteReview = await prisma.review.delete({
      where: {
        review_id: Number(req.body.review_id),
        //user_id: user_id,  //외래키 지정 후 시도
      },
    });
    res.status(200).json(deleteReview)
    break
  }

}
export default viewMyReview;