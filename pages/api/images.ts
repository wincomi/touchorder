        
import { NextApiHandler, NextApiRequest } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

// Disallow body parsing, consume as stream
export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => { 
  const options: formidable.Options = {};
  if (saveLocally) {
    // 업로드 경로
    options.uploadDir = path.join(process.cwd(), "/public/images");
    // 파일 이름 설정 - 현재 시간 + _ + 원본 파일 이름
    options.filename = (name:any, ext:any, path:any, form:any) => {
      return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024; // 파일 최대 크기 설정
  const form = formidable(options);


  return new Promise((resolve, reject) => {
    form.parse(req, (err:any, fields:any, files:any) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "POST") {
    /*
    // 폴더 없을 경우 생성
    try {
      await fs.readdir(path.join(process.cwd() + "/public", "/images"));
    } catch (error) {
      await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
    }
    */
    const result:any = (await readFile(req, true));  // 요청, local 저장 : true
    
    try {
      // console.log(result);     // 해당 주석 지우지 말 것
      // console.log(result.files.myImage); // 기억용
      console.log(result.files.myImage.newFilename); // 기억용 지우지 말 것
      const newFileName = result.files.myImage.newFilename;
      res.status(200).json({ fileName: newFileName });
    } catch(err) {
      res.status(400).json({err});
    }
    
  }
  // 파일 삭제
  else if (req.method == "DELETE") {
    try {
      // console.log(process.cwd());
      const filePath = path.join(process.cwd()+`/public/images/${req.query.img}`);
      await fs.unlink(filePath);  // 삭제 수행
      res.status(200).json({message:"파일 삭제", target: req.query.img});
    } catch (err) {
      console.log(err);
      res.status(400).json({message:"삭제 실패", err});
      return;
    }
  } else {
    res.status(400).json({message:"잘못된 요청"});
  }
};

export default handler;