import StudentsPicker from '../components/StudentsPicker'
import StudentsTable from '../components/StudentsTable'
import {fetchStudentData, fetchSchoolData, fetchLegalguardianData} from '..utils'
import { useState , useEffect} from 'react'

const studentsDataComponent = () =>{
    const [studentsData, setStudentsData] = useState([])
    const [schoolsData, setSchoolsData] = useState([])
    const [legalguardiansData, setlegalguardiansData] = useState([])

    useEffect(() => {
        onStudentsPick();
      }, []);

    const onStudentsPick = async (studentIds) =>{
        for(const studentId of studentIds){
            const studentData = await fetchStudentData(studentId)
            setStudentsData([...studentsData, studentData])
            for(const student of studentData){
                const {schoolId, legalguardianId} = student
                const schoolData = await fetchSchoolData(schoolId)
                setSchoolsData([...schoolsData, schoolData])
                const legalguardianData = await fetchLegalguardianData(legalguardianId)
                setlegalguardiansData([...legalguardiansData, legalguardianData])
            }
        }
    }

    return(
        <>
            <StudentsPicker onPickHandler={onStudentsPick}/>
            <StudentsTable
                studentsData={studentsData}
                schoolsData={schoolsData}
                LegalguardiansData={legalguardiansData}
            />
        </>
    )
}

export default studentsDataComponent