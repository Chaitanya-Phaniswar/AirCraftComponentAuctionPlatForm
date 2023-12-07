const faker = require('faker');
const mongoose = require('mongoose');
const Branch =require('./Branch')
const Course =require('./Course')
const  Detail =require('./Detail')
const Student =require('./Student');
const bcrypt =require('bcrypt');
const Teacher = require('./Teacher');
const Admin = require('./Admin') // assuming you have these models defined

// Connect to the database
mongoose.connect('mongodb://localhost:27017/important', { useNewUrlParser: true });

// Generate 4 branches with ids CSE, ECE, AIDS, MECH
const branches = [
  { branchId: 'CSE', branchName: 'Computer Science and Engineering' },
  { branchId: 'ECE', branchName: 'Electronics and Communication Engineering' },
  { branchId: 'AIDS', branchName: 'Artificial Intelligence and Data Science' },
  { branchId: 'MECH', branchName: 'Mechanical Engineering' }
];

// Generate 8 semesters and 150 students for each branch
const semesters = 4;
const studentsPerSemester = 50;

// Helper function to generate student IDs based on branch and semester
function generateStudentId(branchId, semester) {
  const halfSemester = Math.ceil(semester / 2);
  return `${branchId}${halfSemester}${faker.random.alphaNumeric(4).toUpperCase()}`;
}

async function seedDatabase() {
  // Create the branches
  const createdBranches = await Branch.create(branches);

  // Create the courses for each branch
  const courses = [];
  for (let i = 0; i < createdBranches.length; i++) {
    const branch = createdBranches[i];
    const branchCourses = [];
    const courses=[]
    for (let j = 1; j <= semesters; j++) {
      for(let p=1;p<=9;p++){
      const course = await Course.create({
        courseId: `${branch.branchId}${j}0${p}`,
        courseTitle: `${branch.branchId} Course ${j}0${p}`,
        courseYear: j,
        branch: branch.branchId
      });
      courses.push(course)
      branchCourses.push(course);
      await course.save()
    }
      // Generate students for each course
      students=[]
      for (let k = 1; k <= studentsPerSemester; k++) {
        const details = await Detail.create({
          name: faker.name.findName(),
          proffesion: 'Student',
          dob: faker.date.past(20),
          phone: faker.phone.phoneNumber(),
          email: faker.internet.email()
        });
        await details.save()
        var str = "" + k
        var pad = "0000"
        var ans = pad.substring(0, pad.length - str.length) + str
        const student = await Student.create({
          studentId: `${branch.branchId}${j}${ans}`,
          studentName: details.name,
          currentYear: j,
          clgEmail: `${branch.branchId.toLowerCase()}${j}${ans}@iiitk.ac.in`,
          branch: branch.branchId,
          courses: courses,
          details: details
        });
        students.push(student)
        details.refer=student
        await details.save()
        await student.save()
      }
    }
  
    // Create teachers for each branch
    teachers=[]
    for (let l = 1; l <= 10; l++) {
      const details = await Detail.create({
        name: faker.name.findName(),
        proffesion: 'Teacher',
        dob: faker.date.past(28),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email()
      });
      await details.save()
      const teacher = await Teacher.create({
        teacherId: `${branch.branchId}TEACHER${l}`,
        role: 'Professor',
        details: details,
        courses: [],
        teacherName: details.name,
        branch: branch.branchId
      });
      teachers.push(teacher)
      await teacher.save()
    }

    for(let q=0;q<courses.length;q++){
      let teac=[]
      for(let i=0;i<3;i++){
          let mic=Math.floor(Math.random()*teachers.length)
          teac.push(teachers[mic])
          teachers[mic].courses.push(courses[q])
          await teachers[mic].save()
      }
      console.log(teac)
      courses[q].teacher=teac
      courses[q].students=students
      await courses[q].save()

    } 

    branch[courses]=branchCourses;
    await branch.save()
    console.log('Branch 1 completed')
  }

  console.log('Sample data generated successfully');
}
async function createAdmin(){
  const password="IIITDMKurnool"
  const hash = await bcrypt.hash(password,10)
  const admin= await Admin.create({
    email: 'admin2@iiitk.ac.in',
    password: hash
  })
  admin.save()
  console.log(admin,"created")
}
//createAdmin()
//seedDatabase();
//)
// async function createUser(){
//   const students = await Student.find({})
//   for(let i=0;i<1;i++){
//     const res =await fetch('http://localhost:3001/users/register',{
//       method: "POST",
//       headers: {"Content-Type": "application/json"},
//       method: "POST",
//       body : JSON.stringify({email: students[i].clgEmail,proffession:'Student',password: students[i].studentID})
//     })
//     console.log(await res.json())
//   }
//   return 0
// }
