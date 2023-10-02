const dropdowns = document.querySelectorAll(".dropdown");
const button = document.querySelector('.center-button');
let summoner = document.querySelector('.custom-input');
const consoleOutput = document.querySelector('.consoleOutput')

const key = "RGAPI-8d3a51c3-7007-4d6f-929c-d5ee1e6bcaa9" //ÆHH JEG HATER RIOT

dropdowns.forEach((dropdown) => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      
      options.forEach((otherOption) => {
        otherOption.classList.remove("active");
      });

      option.classList.add("active");
    });

    
  });
  summoner.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      // Prevent the default Enter key behavior (e.g., submitting a form)
      event.preventDefault();
      // Trigger the button click event
      button.click();
    }
  });
  button.addEventListener("click",async ()=>{
       let server = "euw1";
        if(selected.innerHTML == "NA") server == "NA1";
        else if(selected.innerHTML == "OCE") server = "OC1"
        else if(selected.innerHTML == "EUNE") server = "EUN1"
        else if(selected.innerHTML == "KR") server = "KR"
       const result = await fetchSumByName(summoner.value,server)
       consoleOutput.innerText =  result
      
  });
  
});


async function fetchSumByName(name,server){
    //if(name.includes(" ")) name = name.split(" ").join("")
   
    let repsonse = "meow";
    server = server.toLowerCase();

    try {
        const link = "https://"+server+".api.riotgames.com/lol/summoner/v4/summoners/by-name/"+name+"?api_key="+key
        response = await fetch(link);
    
       
    }catch{
        return "invalid name or api-key is dead";
    }
    let data = await response.json();
    const link2 = "https://"+server+".api.riotgames.com/lol/league/v4/entries/by-summoner/"+ data.id + "?api_key=" + key;
    const response2 = await fetch(link2);
    data = await response2.json();
    let indeks = 0;
    if(data.length==0){
        return "this player has not played ranked"
    }
   else if(data.length==1&&data[0]["queueType"]=="RANKED_FLEX_SR"){
       return "This player has only played Ranked flex"
    } else if(data[0]["queueType"] == "RANKED_FLEX_SR"){
        indeks = 1;
    }
    const rank = data[indeks]["tier"]+" " + data[indeks]["rank"];
    wins = data[indeks]['wins'];
    losses = data[indeks]['losses'];
    games = wins + losses;

    wr = Math.round(wins/games *100,1);
    return name + " has " + wins + " win(s) and " + losses +  " loss(es) this season. Giving a winrate of " + wr+"%. Their rank right now is " + rank + " - " + data[indeks]['leaguePoints']+ " LP";
}


