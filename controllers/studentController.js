import Student from "../models/Student.js"
// let students=[
//     {
//         id:105,
//         studentName:"Meghana",
//         email:"megha@gmail.com",
//         phone:"8945623176",
//         branch:"CSE",
//         cgpa:9.0
//     },
//      {
//         id:106,
//         studentName:"sahasra",
//         email:"sahasra@gmail.com",
//         phone:"4561237896",
//         branch:"CSE",
//         cgpa:9.0
//     },
//      {
//         id:107,
//         studentName:"gayathri",
//         email:"gayathri@gmail.com",
//         phone:"7894562315",
//         branch:"CSE",
//         cgpa:9.0
//     }
// ]
export async function getStudents(req,res){
    // res.status(200).json(students);
    try{
        const sortField=req.query.sort || "studentName";
        const order=req.query.order || "asc";
        const sortOrder=order ==="asc"?1:-1; 
        const page=Number(req.query.page);
        const limit=Number(req.query.limit)||10;
        const skip=(page-1)*limit;
        //counting students from mongo db
        const totalStudents=await Student.countDocuments();
        const totalPages=Math.ceil(totalStudents/limit);
        const students=await Student.find()
        .sort({
            [sortField]:sortOrder
        })
        .skip(skip)//ignores previous records
        .limit(limit);//return only required records
        res.status(200).json({
            success:true,
            students,
            currentPage:page,
            totalPages,
            totalStudents
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }

};

export async function getStudentById(req,res){
    //read id from url
    // const id=Number(req.params.id);
    // //search the student
    // const student=students.find(
    //     (student)=>student.id===id
    // );
    try{
        const student=await Student.findById(req.params.id);
              //if student is not found
         if(!student){
        return res.status(404).json({
            success:false,
            message:"student not found"
        });
    };
    res.status(200).json({
        success:true,
        student
    })
        
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
            

        })
    }
  
//     //return student
//     res.status(200).json({
//         success:true,
//         student
//     });
};

//adding a student
export async function addStudent(req,res){
    // //read the json data--react form
    // const student=req.body;
    // //check for the duplicate id
    // const existingStudent=students.find(
    //     (s)=>s.id===student.id
    // );
    // if(existingStudent){
    //     return res.status(400).json({
    //         success:false,
    //         message:"student id already exist",
    //         student

    //     });
    // };


    // //add into the array
    // students.push(student);
    try{
        const image=req.file?
        req.file.filename: "";
        const student=await Student.create({
            studentName,
            email,
            phone,
            branch,
            cgpa,
            image
        })
        //create a new document in mongodb
        // const student=await Student.create(req.body);
        res.status(201).json({
            success:true,
            message:"student registered successfully",
            student
        })
    }
    catch(error){
    res.status(500).json({
        success:false,
        message:error.message,
    
    });
}
};
//updating a student
export async function updateStudent(req,res){
    // const id=Number(req.params.id);
    // const updatedStudent=req.body;
    // let studentFound=false;
    // students=students.map((student)=>{
    //     if(student.id===id){
    //         studentFound=true;
    //         return{
    //             ...students,
    //             ...updateStudent
    //         };
    //     }
    //     return student;
    // });
    try{
        const student =await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
            runValidators:true
        }

        );
        
    if(!student){
        return res.status(400).json({
            success:false,
            message:"student not found"
        })
    }
    res.status(200).json({
        success:true,
        message:"student updated successfully",
        student

    });
}catch(error){
    res.status(500).json({
        success:false,
        message:error.message,
    });
}
};
//delete student
export async function deleteStudent(req,res){
    try{
        const student =await Student.findByIdAndDelete(req.params.id);
        if(!student){
            return res.status(404).json({
                success:false,
                message:"student not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"student deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
//     const id=Number(req.params.id);
//     const student=students.find(
//         (student)=>student.id===id
//     );
//     if(!student){
//         return res.status(400).json({
//             success:false,
//             message:"student not found"

//         });
//     };
//     students=students.filter(
//         (student)=>student.id!==id
//     );
//     res.status(200).json({
//         success:true,
//         message:"student deleted successfully"
//     });

};

export const searchStudents=async(req,res)=>{
    try{
    const search =req.query.q ||"";
    if(!search.trim()){
        const students=await Student.find();
        return res.json({
            success:true,
            students
        })
    }
    const students=await Student.find({
        studentName:{
            //matches thee student data
            $regex:search,
            //ignore uppercase and lowercase
            $options:"i"
        },
           branch:{
            //matches thee student data
            $regex:search,
            //ignore uppercase and lowercase
            $options:"i"
        },
           email:{
            //matches the student data
            $regex:search,
            //ignore uppercase and lowercase
            $options:"i"
        }

    })
    res.status(200).json({
        success:true,
        students
    });
}
catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}