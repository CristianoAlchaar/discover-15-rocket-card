const user = "diego3g"
const URL = "https://api.github.com/users/" + user;

const profileName = document.querySelector('div#card header h2');
const profileImg = document.querySelector('img#profile-img');
const profileFollowers = document.querySelector('span#followers');
const profileFollowing = document.querySelector('span#following');
const profileRepositories = document.querySelector('span#repositories');
const profileCompany = document.querySelector('span#company');
const profileLocation = document.querySelector('span#location');
const generateBackgroundButton = document.getElementById('btn-generate-background');

async function getProfileData(urlProfile) {
    try {
      const response = await axios.get(urlProfile);
      return(response.data) 
    } catch (error) {
      console.error(error)
    }
  }

async function loadProfileDataOnScreen(urlProfile) {
    const profileData = await getProfileData(urlProfile);
    profileName.innerHTML = profileData.login;
    profileImg.src = profileData.avatar_url;
    profileFollowers.innerHTML = profileData.followers + " seguidores";
    profileFollowing.innerHTML = profileData.following + " seguindo";
    profileRepositories.innerHTML = profileData.public_repos + " repositórios";
    profileCompany.innerHTML = profileData.company;
    profileLocation.innerHTML = profileData.location;
}

function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}

function changeBackground(){
    const cardProfile = document.getElementById("card");
    let randomColor = generateRandomColor();
    cardProfile.style.borderColor = randomColor;
}

loadProfileDataOnScreen(URL);

generateBackgroundButton.addEventListener("click", () => {changeBackground()});
