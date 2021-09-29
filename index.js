// Your code here
//See all characters names in a `div` with the id of `"character-bar"`. 
//Create a `span` tag with the character's name and add it the `div#character-bar`
//once you have retrieved the character data from the server. 
//You will need to make a GET request to the following endpoint to retrieve the character data:


const BASE_URL = "http://localhost:3000/characters"
let dataHolder;
const characterBar = document.getElementById("character-bar")
const voteForm = document.getElementById("votes-form")
const detailBoxName = document.getElementById("name")
const detailBoxImage = document.getElementById("image")
const detailBoxVotes = document.getElementById("vote-count")
function init(){
    getData(BASE_URL)
    voteForm.addEventListener("submit", addVotes)
    
}
init();
function getData(BASE_URL){
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(data => dataFeeder(data))
}
function dataFeeder(data){
    makeDataGlobal(data);
    data.forEach(appendDisplayNames);
    loadFirstChild(data);
}
function makeDataGlobal(data){
    dataHolder = [...data]
    return dataHolder;
}
function appendDisplayNames(data){
    const divElement = document.createElement("NewDiv")
    const cBBreak = document.createElement("BR")
    const newImage = document.createElement("IMAGE")
    const newElement = document.createElement("TAG")
    newElement.id = `${data.id}`
    const cBSpan = document.createElement("SPAN")
    cBSpan.textContent = data.name
    characterBar.append(divElement)
    divElement.append(newElement)
  newElement.append(newImage)
    newElement.append(cBBreak)
    newElement.append(cBSpan)
    newElement.addEventListener("click", () => displayClickedChar(data))
}
//When the character in the `div#character-bar` is clicked, display the character's details in the `div#detailed-info`. 
//You can either use the character information from your first request, or make a new request to this
//endpoint to get the character's details:

function loadFirstChild(data){
    detailBoxName.textContent = data[0].name
    detailBoxImage.src = data[0].image
    detailBoxVotes.textContent = data[0].votes
}

function displayClickedChar(data){
    detailBoxName.textContent = data.name
    detailBoxImage.src = data.image
    detailBoxVotes.textContent = data.votes
    featuredCharacter = data
    return featuredCharacter;
}

//When the `form#votes-form` is submitted, add the number of votes from
//the input field to the character displayed in the `div#detailed-info`. **No
//persistence is needed**.

function addVotes(event){
    event.preventDefault();
    let voteInput = document.getElementById("votes").value
    let intialVotesCount = parseInt(detailBoxVotes.textContent)
    let newVoteCount = intialVotesCount + parseInt(voteInput)
    detailBoxVotes.textContent = newVoteCount
    event.target.reset();
}