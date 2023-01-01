const database = Object.create(null)

firebase.auth().onAuthStateChanged((user) => {
    //Deal with newly logged in user
    console.log(user)
    console.log("A user just logged in")
    if (user) {
      //You're logged in
      playerId = user.uid;
      playerRef = firebase.database().ref(`players/${playerId}`);

      const name = createName();

      playerRef.set({
        id: playerId,
        name: name,
        direction: "left",
        color: randomFromArray(playercolors),
        x:3,
        y:9,

        coins: 0,
      })

      //Remove me from Firebase when I disconnect
      playerRef.onDisconnect().remove();
      
      //Begin the game now that we are signed in
      initGame();

    } else {
      //You're logged out
    }
});

export default Object.freeze(database)