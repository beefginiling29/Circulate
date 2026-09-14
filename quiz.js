const questions = [
  {q:"What does oxygenated blood mean?",a:["Blood with carbon dioxide","Blood with a high amount of oxygen","Blood without red blood cells","Blood that is moving towards the heart"],c:1},
  {q:"Where does the blood become oxygenated?",a:["Heart","Kidneys","Lungs","Liver"],c:2},
  {q:"Which chamber receives deoxygenated blood from the body?",a:["Left atrium","Right atrium","Left ventricle","Right ventricle"],c:1},
  {q:"Which chamber pumps deoxygenated blood to the lungs?",a:["Right ventricle","Left ventricle","Right atrium","Left atrium"],c:0},
  {q:"Which blood vessels carry deoxygenated blood to the lungs?",a:["Pulmonary veins","Pulmonary arteries","Aorta","Vena cava"],c:1},
  {q:"Which chamber pumps oxygenated blood to the body?",a:["Right atrium","Right ventricle","Left atrium","Left ventricle"],c:3},
  {q:"Which blood vessels carry oxygenated blood from the lungs to the heart?",a:["Pulmonary veins","Pulmonary arteries","Vena cava","Aorta"],c:0},
  {q:"Which blood vessels bring deoxygenated blood from the body to the heart?",a:["Aorta","Pulmonary veins","Pulmonary arteries","Vena cava"],c:3},
  {q:"What gas does blood pick up in the lungs?",a:["Carbon dioxide","Oxygen","Hydrogen","Helium"],c:1},
  {q:"What gas does blood carry away from body cells?",a:["Hydrogen","Oxygen","Helium","Carbon dioxide"],c:3},
  {q:"What is the main job of the heart?",a:["Digest food","Pump blood","Produce oxygen","Remove waste"],c:1},
  {q:"What carries oxygen in the blood?",a:["Platelets","White blood cells","Red blood cells","Plasma"],c:2},
  {q:"Which blood vessels carry blood away from the heart?",a:["Veins","Arteries","Capillaries","Venules"],c:1},
  {q:"Which blood vessels carry blood toward the heart?",a:["Arteries","Veins","Capillaries","Arterioles"],c:1},
  {q:"What happens to deoxygenated blood in the lungs?",a:["It picks up oxygen","It loses all its blood cells","It becomes water","It stops moving"],c:0},
  {q:"What happens to oxygenated blood when it reaches body cells?",a:["It picks up oxygen","It delivers oxygen","It becomes a vein","It goes directly back to the lungs"],c:1},
  {q:"Which chamber does blood enter after traveling through the vena cava?",a:["Left atrium","Left ventricle","Right ventricle","Right atrium"],c:3},
  {q:"Which chamber receives oxygenated blood from the pulmonary veins?",a:["Right atrium","Right ventricle","Left atrium","Left ventricle"],c:2},
  {q:"Which blood vessel carries oxygenated blood from the left ventricle to the body?",a:["Vena cava","Pulmonary artery","Pulmonary vein","Aorta"],c:3},
  {q:"What happens when oxygenated blood reaches the body's cells?",a:["It delivers oxygen to the cells","It picks up more oxygen","It travels back to the lungs","It becomes a pulmonary artery"],c:0}
];

function shuffle(array){
  const copy=[...array];
  for(let i=copy.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [copy[i],copy[j]]=[copy[j],copy[i]];
  }
  return copy;
}

const selected = shuffle(questions).slice(0,5);
let current=0, score=0, answered=false;

const area=document.getElementById("quizArea");
const next=document.getElementById("nextButton");
const progress=document.getElementById("progress");
const scoreBox=document.getElementById("score");
const finalResult=document.getElementById("finalResult");

function render(){
  answered=false;
  next.disabled=true;
  next.textContent=current===4 ? "Finish Quiz" : "Next Question";
  progress.textContent=`Question ${current+1} of 5`;
  const item=selected[current];

  area.innerHTML=`<div class="question">${item.q}</div>
    <div class="answers">${item.a.map((answer,i)=>`<button class="answer" data-index="${i}">${String.fromCharCode(65+i)}) ${answer}</button>`).join("")}</div>`;

  area.querySelectorAll(".answer").forEach(btn=>{
    btn.addEventListener("click",()=>choose(Number(btn.dataset.index)));
  });
}

function choose(index){
  if(answered) return;
  answered=true;
  const correct=selected[current].c;
  area.querySelectorAll(".answer").forEach((btn,i)=>{
    btn.disabled=true;
    if(i===correct) btn.classList.add("correct");
    if(i===index && i!==correct) btn.classList.add("wrong");
  });
  if(index===correct) score++;
  scoreBox.textContent=`Score: ${score}`;
  next.disabled=false;
}

next.addEventListener("click",()=>{
  if(!answered) return;
  if(current<4){current++;render();}
  else{
    area.innerHTML="";
    next.classList.add("hidden");
    finalResult.classList.remove("hidden");
    finalResult.innerHTML=`You scored <strong>${score}/5</strong>.<br><small>Refresh the page to receive five new randomized questions.</small>`;
    progress.textContent="Quiz complete";
  }
});

render();
