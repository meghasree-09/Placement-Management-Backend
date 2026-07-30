import express from "express";
import { 
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
    searchStudents

 } from "../controllers/studentController.js";
import upload from "../middleware/upload.js";
import { auth } from "../middleware/authMiddleware.js";

 


//used to create remaining routes(router object)
const router = express.Router();

//searching route
router.get("/search",
    auth,
    searchStudents);
//get all the students 
router.get("/",
    auth ,
    getStudents);
//getstudent by id
router.get("/:id",
    auth,
    getStudentById)
//post add student
router.post("/",
    auth,
    upload.single("image"),
    addStudent)
//put updating a studemt
router.put("/:id",
    auth,
    updateStudent)
//delete deleting a student
router.delete("/:id",
    auth,
    deleteStudent);
//company route






export default router;