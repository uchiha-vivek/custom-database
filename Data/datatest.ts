
import Database from "./Database ";
const db  = new Database()

const testdata1 = db.create({firstName:"Vivek",lastName:"Sharma",branch:"Metallurgy"})
const testdata2 = db.create({firstName:"Prit",lastName:"Mehta",branch:"ECE"})
const testdata3 = db.create({firstName:"Harsh",lastName:"Raj",branch:"Computer-Science"})
// More sample test cases can be added here

// different methods can be tested and can be viewed in console
const fetchRecord = db.read(testdata1.id)
console.log(fetchRecord)


const updateRecord = db.update(testdata1.id,{lastName:'Kumar'})
console.log(updateRecord)

const allRecords = db.getAll()
console.log(allRecords)


const deleteRecord = db.delete(testdata2.id)
console.log(deleteRecord)