import multer from "multer";
const storage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cd(null,"uploads");
    },
    filename:(req,file,cb)=>{
        cd(
            null,
            Date.now()+"-"+file.originalname
        );
    }
});
const upload = multer({
    storage
});
export default upload;
