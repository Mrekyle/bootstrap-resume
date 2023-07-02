function fetchGitHubInformation (event) {
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
        $.getJSON(`https://api.github.com/users/${username}`) // Accessing the apis address to find the username that has been requested
    ).then(
        function (response) { 
            var userData = response; // Storing the response in the variable to allow us to display that on the webpage easier 
            $('#gh-user-data').html(userInformationHtml(userData))
        }, function(errorResponse) { // Incase the user doest exist or there was a problem, We then set the html to display an error message to the user of the page
            if(errorResponse.status === 404) { // Checking the error status that was returned from the api to the webpage
                $('#gh-user-data').html(
                    `<h2 style="padding-top:20px>Error: User was not found... Please try again</h2>`)
            } else { // Incase the error was not a 404 response
                console.log(errorResponse)
                $('#gh-user-data').html( // Then telling the user what error has been returned. 
                    `<h2 style="padding-top: 20px>Error: ${errorResponse.responseJSON.message}</h2>`
                )
            }
        }
    )
}

function userInformationHtml () {
    
}