import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import './App.css';

function App() {
  const [subjects, setSubjects] = useState([
    { subjectName: 'CT', units: 5, midterms: 96.5, finals: 94.0, average: 95.25, grade: 1.25, weight: 2.5 },
    { subjectName: 'STATS', units: 3, midterms: 95.65, finals: 95.65, average: 95.65, grade: 1.25, weight: 3.75 },
    { subjectName: 'FINMAN', units: 3, midterms: 96.66, finals: 94.0, average: 95.33, grade: 1.25, weight: 3.75 },
    { subjectName: 'BPM', units: 3, midterms: 97.96, finals: 98.04, average: 98.0, grade: 1.0, weight: 3.0 },
    { subjectName: 'RIZAL', units: 3, midterms: 95.38, finals: 90.0, average: 92.69, grade: 1.5, weight: 4.5 },
    { subjectName: 'ISPM', units: 3, midterms: 95.55, finals: 95.0, average: 95.28, grade: 1.25, weight: 3.75 },
    { subjectName: 'GENSOC', units: 2, midterms: 88.38, finals: 96.0, average: 92.19, grade: 1.5, weight: 3.0 },
    { subjectName: 'APPDEV', units: 3, midterms: 99.5, finals: 98.0, average: 98.75, grade: 1.0, weight: 3.0 },
  ]);

  useEffect(() => {
    const newSubjects = subjects.map(subject => {
      const average = ((subject.midterms + subject.finals) / 2).toFixed(2);
      const grade = calculateGrade(parseFloat(average));
      const weight = (subject.units * grade).toFixed(2);
      return { ...subject, average, grade, weight };
    });
    setSubjects(newSubjects);
  }, [subjects]);

  const handleInputChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = field === 'subjectName' ? value : parseFloat(value) || 0;
    setSubjects(newSubjects);
  };

  const addSubject = () => {
    setSubjects([...subjects, { subjectName: '', units: 0, midterms: 0, finals: 0, average: 0, grade: 0, weight: 0 }]);
  };

  const deleteSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const calculateGrade = (average) => {
    if (average >= 98) return 1.0;
    if (average >= 95) return 1.25;
    if (average >= 92) return 1.5;
    if (average >= 89) return 1.75;
    if (average >= 85) return 2.0;
    if (average >= 83) return 2.25;
    return 2.5;
  };

  const calculateTotalUnits = () => {
    return subjects.reduce((acc, subject) => acc + subject.units, 0);
  };

  const calculateTotalWeight = () => {
    return subjects.reduce((acc, subject) => acc + parseFloat(subject.weight), 0).toFixed(2);
  };

  const calculateGWA = () => {
    const totalUnits = calculateTotalUnits();
    const totalWeightedGrades = subjects.reduce((acc, subject) => acc + subject.units * subject.grade, 0);
    return totalUnits ? (totalWeightedGrades / totalUnits).toFixed(2) : 0;
  };

  return (
    <div className="App p-8 relative min-h-screen" style={{ backgroundColor: 'white' }}>
      <div className="p-8" style={{ padding: '56px', boxShadow: '0px 3px 6px rgba(0,0,0,0.16)', borderRadius: '4px' }}>
        <h3 className="text-3xl font-bold mb-4">Grade Calculator</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Units</th>
                <th className="border px-4 py-2">Midterms</th>
                <th className="border px-4 py-2">Finals</th>
                <th className="border px-4 py-2">Average</th>
                <th className="border px-4 py-2">Grade</th>
                <th className="border px-4 py-2">Weight</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded"
                      value={subject.subjectName}
                      onChange={(e) => handleInputChange(index, 'subjectName', e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full px-2 py-1 border rounded"
                      value={subject.units}
                      onChange={(e) => handleInputChange(index, 'units', e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full px-2 py-1 border rounded"
                      value={subject.midterms}
                      onChange={(e) => handleInputChange(index, 'midterms', e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      className="w-full px-2 py-1 border rounded"
                      value={subject.finals}
                      onChange={(e) => handleInputChange(index, 'finals', e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2 text-center">{subject.average}</td>
                  <td className="border px-4 py-2 text-center">{subject.grade}</td>
                  <td className="border px-4 py-2 text-center">{subject.weight}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => deleteSubject(index)}
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="border px-4 py-2 font-bold">Total Units: {calculateTotalUnits()}</td>
                <td colSpan="5" className="border px-4 py-2 font-bold text-right">
                  General Weighted Average: {calculateGWA()}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={addSubject}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Subject
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
