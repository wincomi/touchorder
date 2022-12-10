import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    let time = dayjs();
    const currentTime = time.format('YYYY-MM-DD HH:mm');
    const method = req.method;

    if (method == "GET") {
        const userId = req.query.userId;
        const storeId = req.query.storeId;
        const tableId = req.query.tableId;

        // 가게에서 예약 조회 - 현재 시간 이후 값 조회 == 현재 ~ 미래
        if (storeId != null) {
            const result = await prisma.$queryRaw`SELECT store.name, user.user_name as user_name, reserve.* FROM store, reserve, user WHERE (reserve.store_table_id = ${tableId}) AND (store.store_id = reserve.store_id) AND (user.user_id = reserve.user_id) AND (reserve.store_id = ${storeId}) AND (reserve.reserve_date >= ${currentTime}) order by reserve.reserve_date asc`;
            res.status(200).json(result);
            return;
        }

        // 사용자가 예약 조회
        // 전체 내역 조회 - 과거, 미래 모두
        if (userId != null) {
            const result = await prisma.$queryRaw`SELECT store.name, reserve.* FROM store, reserve WHERE (store.store_id = reserve.store_id) AND (reserve.user_id = ${userId})`;
            res.status(200).json(result);
            return;
        }
        res.status(400).json({message:"잘못된 형식의 요청"});
    }

    // 예약하기
    else if (method == "POST")
    {
        const storeId : number = Number(req.body.storeId);
        const userId : number = Number(req.body.userId);
        const numOfPeople : number = Number(req.body.numOfPeople);
        const storeTableId :number = Number(req.body.storeTableId);
        const reserveDate = req.body.reserveDate;   // '2022-12-23 HH:MM' 형식으로 와야함

        // 다른거는 크게 검사 안하고 숫자 값인지와 시간만 검사
        // 안정성이 비교적 낮음
        if (isNaN(storeId) || isNaN(userId) || isNaN(numOfPeople) || isNaN(storeTableId)){
            res.status(400).json({message:"양식에 맞는 값을 입력해주세요"});
            return;
        }

        // 시간 포맷 검사
        // YYYY-MM-DD HH:mm
        let dateTimePattern:RegExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1]) (0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/; 
        if ( !dateTimePattern.test(reserveDate) ) {
            res.status(400).json({message:"시간 양식이 맞지 않습니다."});
            return;
        }

        // 현재 시점보다 과거인지 시간 검사
        if ( reserveDate < currentTime) {
            res.status(400).json({message:"예약 시각은 현재 시간 보다 이전일 수 없습니다."});
            return;
        }

        // 테이블 상태 검사
        const searchTableStatus:any = await prisma.$queryRaw`SELECT status FROM store_table WHERE table_id = ${storeTableId}`;
        if (searchTableStatus[0].status != 0) // 사용 가능이 아닌 경우
        {
            res.status(400).json({message:"예약할 수 없습니다."});
            return;
        }

        // 해당 테이블 같은 시간에 이미 예약된 상태인지 확인
        const searchTableReservation : any = await prisma.$queryRaw`SELECT * FROM reserve WHERE (store_table_id = ${storeTableId}) AND (reserve_date = ${reserveDate})`;
        // ({where:{store_table_id:storeTableId, reserve_date:reserveDate}})
        console.log(searchTableReservation)
        if (searchTableReservation[0] != null) {
            res.status(400).json({message:"해당 테이블은 이미 누군가 예약했습니다."});
            return;
        }

        // 예약
        await prisma.$queryRaw`INSERT INTO reserve(store_id, user_id, store_table_id, reserve_date, num_of_people) 
                                    VALUES(${storeId}, ${userId}, ${storeTableId}, ${reserveDate}, ${numOfPeople})`;
        res.status(200).json({message:"예약 완료"});
    }
    else {
        res.status(400).json({message:"잘못된 요청"});
    }

}

