const level = document.getElementById('level');
const button = document.getElementById('button');
const wordinput = document.getElementById('word-input');
const message = document.getElementById('message');
const time = document.getElementById('time');
const score = document.getElementById('score');
const word_true = document.getElementById('word-true');
const word_false = document.getElementById('word-false');
const word_left = document.getElementById('word-left');

var cur_level;
var cur_time;
var cur_score;
var cur_word;

window.onload = reset();
button.addEventListener('click',animate);

function animate(){
  let timer=3;
  const classname = [ 'btn btn-info','btn btn-success', 'btn btn-warning', 'btn btn-danger'];
  button.innerHTML= " Starts in " + timer + "...";
  button.className= classname[timer];
  const clear = window.setInterval(()=>{
    button.innerHTML= " Starts in " + --timer + "...";
    button.className= classname[timer]; 
    if(timer===0) {
      button.innerHTML= "Race Started";
      button.className= classname[0]; 
      button.disabled = true;
      wordinput.readOnly = false;
      start_race();
      clearInterval(clear);
    }
  },1000);
}
function start_race(){
  wordinput.addEventListener('input', Race_in);
  setInterval(countdown, 1000);
}
function Race_in() {
  if (match_words()) {
    cur_score++;
    if(cur_score%3 === 0 && cur_level<10) cur_level++;
    cur_time = 11-cur_level;
    wordinput.value = '';
    random_word();
    update();
  }
}
function reset(){
  cur_level = 1;
  cur_time = 11-cur_level;
  cur_score = 0;
  button.innerHTML="NEW RACE";
  wordinput.readOnly=true;
  update();
  random_word();
}
function update(){
  score.innerHTML=cur_score;
  level.innerHTML=cur_level;
  time.innerHTML=cur_time;
}
function match_words(){
  display_word();
  if(cur_word === wordinput.value) return true;
  else return false;
}
function display_word(){
  let input_word=wordinput.value;
  let good='',bad='',left='',i = 0, isbad = false;
  while(i<cur_word.length){
    if(i<input_word.length){
      if(input_word[i]===cur_word[i] && !isbad) good+=cur_word[i];
      else {
        bad+=cur_word[i];
        isbad = true;
      }
    }
    else left+=cur_word[i];
    i++;
  }
  word_true.innerHTML=good;
  word_false.innerHTML=bad;
  word_left.innerHTML=left;
}
function countdown() {
  if (cur_time > 0) {
    cur_time--;
  } else if (cur_time === 0) {
    message.innerHTML = "Time UP !!! NEW Race Will Reload Shortly!";
    wordinput.readOnly = true;
    setTimeout(() => {
      document.location.reload();
    },5000);
  }
  time.innerHTML = cur_time;
}
function random_word(){
  const words = ['lowGPA', 'Resume', 'python', 'react.js', 'node.js', 'execute', 'angular.JS', 'codeChef', 'CodeForces', 'HackeRank', 'HackerEarth', 'Dasari', 'Srinivas', 'LeetCode', 'Google', 'microsoft', 'Delete', 'Internship', 'Margin', 'trust', 'border', 'Vscode', 'sublime', 'youtube', 'mobile', 'Asus', 'contest','placement', 'Package', 'Assignment', 'statue', 'generate', 'stubborn', 'stack', 'Overflow', 'geeks', 'developer', 'pubgm', 'hero', 'javascript', 'typerace', 'wordbreak', 'bootstrap', 'siblings', 'instagram', 'gmail', 'Break', 'laughter', 'graph','github', 'space', 'html_css','amazon', 'walmart', 'friends' ];
  cur_word = words[Math.floor(Math.random() * words.length)];
  display_word();
}
