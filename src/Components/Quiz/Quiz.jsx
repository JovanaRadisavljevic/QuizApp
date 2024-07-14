import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/Data';

//npm run dev - za pokretanje

const Quiz = () => {

  let [index,setIndex]= useState(0);
  let [question,setQuestion]=useState(data[index]);
  let [lock,setLock]=useState(false);
  let [score,setScore]= useState(0);

  //hocu kad klikenm na netacan odgovor da tacan dogovor bude highlight-ovan
  //zasto pravim nove varijable
  let Option1=useRef(null);
  let Option2=useRef(null);
  let Option3=useRef(null);
  let Option4=useRef(null);
  let optionArray= [Option1,Option2,Option3,Option4];

  //kad dodjem do 5.pitanja i kliknem na next forma nestane jer nema pitanja
  let [result,setResult] = useState(false);


  const checkAnswer = (e,ans) => {
    if(lock===false){
      if(question.ans===ans){
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev=>prev+1);
      }
      else{
        e.target.classList.add("wrong");
        setLock(true);
        optionArray[question.ans-1].current.classList.add("correct");
      }
    }
    
  }

  const next = () => {
    if(lock===true){
      if(index === data.length-1){//kad dodjem do kraja
        setResult(true);
        return 0; //jer kad vrati 0 nece da se izvrsi nista ispod
      }
      setIndex(++index);
      setQuestion(data[index]);//sad je vec povecan indeks
      setLock(false);//jer sad otvaram novo pitanje
      //ako samo ostavim oavko kod onda mi se pojavljuje tacan odgovor svuda
      //moram da promenim tacan i netacan classList 
      optionArray.map((option)=>{
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      })
    }
  }

  const restart = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result? <>
        <h2>Vaš rezultat: {score} / {data.length}</h2>
        <button onClick={restart}>Reset</button>
      </>:<><h2>{index+1}. {question.pitanje}</h2>
      <ul>
        <li ref={Option1} onClick={(e)=>{checkAnswer(e,1)}}>{question.opcija1}</li>
        <li ref={Option2} onClick={(e)=>{checkAnswer(e,2)}}>{question.opcija2}</li>
        <li ref={Option3} onClick={(e)=>{checkAnswer(e,3)}}>{question.opcija3}</li>
        <li ref={Option4} onClick={(e)=>{checkAnswer(e,4)}}>{question.opcija4}</li>
      </ul>
      <button onClick={next}>Sledeće pitanje</button>
      <div className="index">{index+1} od {data.length} pitanja</div></>}
    </div>
  )
}

export default Quiz
