/*
    General website javascript methods
*/

/*  Input:  None
*   Output: None
*   Desc:   Loops through all HTML elements looking for the attribute "html-include"
            It then attemps to load the file in the parameter
            <div html-include="nav.html"></div>

    https://www.w3schools.com/howto/howto_html_include.asp
*/
function includeHTML(title = undefined) {
    var z, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (let i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("html-include");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("html-include");
            includeHTML(title);
          }
        };
        if(title != undefined)
            document.title = title;

        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }

/*  Input:  time int, url string
*   Output: None
*   Desc:   Waits the desired seconds and then redirects to the url, counting down every second
*/
function redirectTimer(time, url)
{
    let timed = document.getElementById("timedText");
    let interval = setInterval(function()
    {
      timed.innerHTML = "You will be redirected to the home page in " + time + " seconds";
      time--;
      console.log(time);

      if(time <= 0)
      {
        clearInterval(interval);
        window.location.replace(url);
      }
    }, 1000);
}