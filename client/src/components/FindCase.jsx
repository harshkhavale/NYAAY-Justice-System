import React, { useState } from 'react'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import Result from './Result';
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentCase, setDocuments } from '../state';
const FindCase = () => {
  const dispatch = useDispatch();
  const currentCase = useSelector((state) => state.currentCase);
  const token = useSelector((state) => state.token);
  const [text, setText] = useState("");
  const [result, setResult] = useState();
  const [docs, setDocs] = useState([]);

  const getData = () => {
    fetchCase();
    getDocs();

  }
  const fetchCase = async () => {
    const response = await fetch(
      `http://localhost:5001/api/case/${text}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log("finded case: ", data);
    setResult(data);
    dispatch(setCurrentCase({ currentCase: data }));
  };

  const getDocs = async () => {
    const resp = await fetch(
      `http://localhost:5001/api/document/${text}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const docs = await resp.json();
    console.log("finded docs: ", docs);
    setDocs(docs);
    dispatch(setDocuments({ documents: docs }));
  }
  return (
    <div>

      <div className="findcase shadow-md p-8 rounded-md">
        <p className=' text-xl'>Find Case By CNR (Case Number Record)</p>
        <div className=' flex items-center gap-2'>
          <input type="text" value={text} placeholder='AABB012563982002' onChange={(e) => setText(e.target.value)} className=' border border-slate-500 text-xl rounded-md p-2' />
          <button className=' bg-slate-400 border rounded-md my-4  border-slate-500 text-white p-2' onClick={
            getData}>Find <ContentPasteSearchIcon /> </button>
        </div>

      </div>
      <Result caseData={result} docData={docs} />
    </div>

  )
}

export default FindCase
