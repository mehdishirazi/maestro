let Token;


async function FetchAPI(url, method='LIST', data = {}, headers={}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    //mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': Token
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    //body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  let x = await response.json();
  return x
}


async function Login(){
    Token = document.getElementById('name').value;
    posts = await FetchAPI('https://milestone-maestro.carrene.com/apiv1/projects?');
    console.log(posts);
    let elem = document.getElementById('input');
    elem.parentNode.removeChild(elem); 
    issue_show()
}

function project_show(){    
}
