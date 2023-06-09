/**
 * Displays the user information onto the DOM model. For the end user of the site to see.
 * Giving links to all users Repo's.  
 * 
 * Taking one parameter which its whats returned from the github API. Which allows us to display
 * What we are intending
 */
function userInformationHtml (user) {
    console.log(user) // Showing all the returned properties of the user object
    return `
    <h2 style="padding-top: 20px">${user.name}
        <span class="small-name">
            (@<a style="padding-top: 20px" target="_blank" href="${user.html_url}">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}" alt="Github user: ${user.name}" width="80px" height="80px">
            </a>
        </div>
        <p>
            Followers: ${user.followers} - Following: ${user.following} <br> Repo's: ${user.public_repos}
        </p>
    </div>`
}

/**
 * Displays the selected user repo information on the DOM model.
 * If the user doesn't have any repos, a message will be displayed letting the user
 * know this information 
 */
function repoInformationHtml(repos) {
    // Checking to see if the user has no public repos
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    // Creating the list items of each repo using the map method
    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });


    // Displaying the list items created on the DOM
    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul class="repo-list clearfix">
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}
/** 
 * Fetches the user information from the github API. Returning that to the request
 * And storing that for us to manipulate and show to the end user of the site. 
 * Also checking for any errors and responding accordingly.
 */
function fetchGitHubInformation (event) {
    // Clearing any data that was left behind from a previous search
    $('#gh-user-data').html('')
    $('#gh-repo-data').html('')

    var username = $('#gh-username').val()
    if (!username) { 
        $('#gh-user-data').html(`<h2 style="padding-top: 20px">Please enter a Github username</h2>`)
        return;
    }
    $('#gh-user-data').html(`
        <div id="loader">
            <img style="padding-top: 20px" src="assets/css/loader.gif" alt="Loading the user" />
        </div>`)
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`), // Accessing the apis address to find the username that has been requested
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) { 
            var userData = firstResponse[0]; // Storing the response in the variable to allow us to display that on the webpage easier 
            var userRepoData = secondResponse[0];
            $('#gh-user-data').html(userInformationHtml(userData))
            $('#gh-repo-data').html(repoInformationHtml(userRepoData))
        }, function(errorResponse) { // Incase the user doest exist or there was a problem, We then set the html to display an error message to the user of the page
            if(errorResponse.status === 404) { // Checking the error status that was returned from the api to the webpage
                $('#gh-user-data').html(
                    `<h2 style="padding-top:20px>Error: User was not found... Please try again</h2>`)
            } else if (errorResponse.status === 403) { // Github api throttle limit
              var resetTime = new Date(errorResponse.getResponseHeader('X-RateLimit-Reset')*1000)  // Lets us know when we can use the api again once the time has been reset.
              $('#gh-user-data').html(`<h4 style="padding-top 20px">Too many requests. Please try again at: ${resetTime.toLocaleTimeString()}</h4>`)
            } else { // Incase the error was not a 404 response
                console.log(errorResponse)
                $('#gh-user-data').html( // Then telling the user what error has been returned. 
                    `<h2 style="padding-top: 20px>Error: ${errorResponse.responseJSON.message}</h2>`
                )
            }
        }
    )
}

$(document).ready(fetchGitHubInformation) 
// Has the page automatically filled with the users information that is set by the developer when the page is fully loaded.
// So that it is not just a blank page waiting on the users interactions