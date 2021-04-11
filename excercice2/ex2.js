getUser(1,(user)=>{
    getRepositories(user.gitHubUsername,(repos,levelNumber)=>{
         getBrunch(repos[levelNumber],(brunch)=>{
            if (brunch == "master")
                postCommit(newVersion,(committed)=>{
            if(committed)
                console.log("The new version is committed");
            else
            console.log("The new version is not committed");
            })
        })
    })
});

// Callback :
getUser(1, function (user) {
    getRepositories(user.gitHubUsername, function (repos,levelNumber) {
        getBrunch(repos[levelNumber], function (brunch) {
            if (brunch == "master")
                postCommit(newVersion,function (committed) {
                    if(committed)
                        console.log("The new version is committed");
                    else
                        console.log("The new version is not committed");
            })
        })
    })
});

// Promise
getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getBrunch(repos[levelNumber]))
    .then(brunch => {
        if(brunch == "master")
            postCommit(newVersion)})
    .then(committed => {
        if(committed)
            console.log("The new version is committed");
        else
            console.log("The new version is not committed");
    }).catch(err=> console.log('Error : ',err));

// async await
async function handleCommit(gitUser, levelNumber, newVersion) {
    try {
        const user = await getUser(gitUser);
        const repos = await getRepositories(user.gitHubUsername);
        const brunch = await getBrunch(repos[levelNumber]);
        if(brunch == "master") {
            const committed = await postCommit(newVersion);
            if(committed)
                console.log("The new version is committed");
             else
                console.log("The new version is not committed");
        }
    } catch (error) {
        console.log('Error :',error)
    } 
}

