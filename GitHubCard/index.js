const cardContainer = document.querySelector('.cards');

axios
	.get('https://api.github.com/users/indiMjc')
	.then(response => {
		cardContainer.appendChild(CardMaker(response.data));
	})
	.catch(error => {
		console.log('The data was not returned', error);
	});

axios
	.get('https://api.github.com/users/indiMjc/followers')
	.then(response => {
		response.data.forEach(user => {
			axios.get(user.url)
        	.then(response => {
				cardContainer.appendChild(CardMaker(response.data));
			});
		});
	})
	.catch(error => {
		console.log('The data was not returned', error);
  });

function CardMaker(userData) {
	// create elements
	let card = document.createElement('div');
	let userImg = document.createElement('img');
	let cardInfo = document.createElement('div');
	let user = document.createElement('h3');
	let userName = document.createElement('p');
	let location = document.createElement('p');
	let profile = document.createElement('p');
	let profileLink = document.createElement('a');
	let follower = document.createElement('p');
	let followingCount = document.createElement('p');
	let bio = document.createElement('p');

	// add classes
	card.classList.add('card');
	cardInfo.classList.add('card-info');
	user.classList.add('name');
	userName.classList.add('username');

	// populate elements
	userImg.src = userData.avatar_url;
	user.textContent = userData.name;
	userName.textContent = userData.login;
	location.textContent = `Location: ${userData.location}`;
	profile.textContent = `Profile: `;
	profileLink.textContent = userData.html_url;
	profileLink.href = userData.html_url;
	follower.textContent = `Followers: ${userData.followers}`;
	followingCount.textContent = `Following: ${userData.following}`;
	bio.textContent = `Bio: ${userData.bio}`;

	// structure/assemble the elements
	card.appendChild(userImg);
	card.appendChild(cardInfo);
	cardInfo.appendChild(user);
	cardInfo.appendChild(userName);
	cardInfo.appendChild(location);
	cardInfo.appendChild(profile);
	profile.appendChild(profileLink);
	cardInfo.appendChild(follower);
	cardInfo.appendChild(followingCount);
	cardInfo.appendChild(bio);

	return card;
}

  
/*
Alternative solution (comment out lines 3-25 and uncomment 85-127):
  
Vocabulary:  Promises, Promise.all(), async/await, IFFE (Immediately Invoked Function Expression), destructuring

Refactored .then().catch() example above using Promise.all, async/await and IFFE.

The function is wrapped ( ... )();  This is called an IFFE.  When the compiler reads this .js file, it will 
invoke the function immediately. Before the function keyword, we tell the compiler that this is an asynchronous 
function with the 'async' keyword.
*/
// (async function getData() {
// 	// The code we are trying to run is wrapped in a try { ... } block, followed by the catch () { ... } below
// 	try {		
// 		/*
// 		The destructured array represents the response from each of the axios calls, 
// 		the first value is from the first axios call.  We tell the compiler to wait 
// 		on the values returned from these Promises with the 'await' keyword.  
// 		Promise.all() wraps these promises into a single function call.  These values 
// 		that are returned as Promises can be accessed by referencing the variable 
// 		names from the destructured array.  
		
// 		We could also invoke the Promises individually, each with the 'await' keyword, 
// 		ex: const myUserData = await axios.get('https://api.github.com/users/indiMjc');
// 		*/
// 		const [myUserData, myFollowersData] = await Promise.all([
// 			axios.get('https://api.github.com/users/indiMjc'),
// 			axios.get('https://api.github.com/users/indiMjc/followers')
// 		]);

// 		cardContainer.appendChild(CardMaker(myUserData.data));

// 		/*
// 		Since we're doing axios calls inside this loop, we tell the compiler that this is an 
// 		asynchronous function with the 'async' keyword before the loop callback paramater
// 		*/
// 		myFollowersData.data.forEach(async user => {
// 			/*
// 			We tell the compiler to wait on the response from this axios call with the 'await' 
// 			keyword and declare the response as a variable 'getFollower'
// 	  		*/
// 			const getFollower = await axios.get(user.url);

// 			cardContainer.appendChild(CardMaker(getFollower.data));
// 		});
// 	/*
// 	The catch block has a parameter representing potential errors that may be thrown when 
// 	attempting to return the Promises from above.  Inside of this block we handle exceptions/errors.  
// 	Ignoring the catch block will throw warnings in the console if the Promise fails to resolve.
// 	*/
// 	} catch (err) {
// 		console.log('Data was not returned', err);
// 	}
// })();