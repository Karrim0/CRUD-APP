var userSiteName = document.getElementById('siteName');
var userSiteUrl = document.getElementById('siteUrl');
var dataContainer =[]
var addButton = document.getElementById('addButton') ;
var updateButton = document.getElementById('updateButton') ;
var searchButtton = document.getElementById('searchButtton');
var indexUpdate = 0
if (localStorage.getItem('userSiteData') != null )
{
    dataContainer = JSON.parse(localStorage.getItem('userSiteData'))
    displayData()
}
function addData()
{
    if( validationName() == true )
        {
            var userSiteData = {
            name: userSiteName.value ,
            url : userSiteUrl.value ,
        }
            dataContainer.push(userSiteData);
            localStorage.setItem('userSiteData' , JSON.stringify(dataContainer))
            clearData ();
            displayData ();
    }
}
function displayData ()
{
    var cartona =''
    for( var i = 0 ; i < dataContainer.length  ; i++ )
    {
        cartona += 
        `
        <tr>
            <td>${i+1}</td>
            <td>${dataContainer[i].name}</td>
            <td>${dataContainer[i].url}</td>
            <td><button onclick="window.open('${dataContainer[i].url}' , '_blank')" class="btn  btn-success  text-white">Visit</button></td>
            <td><button onclick=" setData(${i})" class="btn btn-warning  text-white">Update</button></td>
            <td><button onclick="deleteSite(${i})" class="btn bg-danger text-white">Delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = cartona ;
    
}
function deleteSite (num)
{
    dataContainer.splice(num,1)
    localStorage.setItem('userSiteData' , JSON.stringify(dataContainer))
    displayData()
}
function setData(index)
{
    curentInput = dataContainer[index]
    indexUpdate = index ;
    userSiteName.value = curentInput.name
    userSiteUrl.value = curentInput.url
    addButton.classList.add('d-none');
    updateButton.classList.remove('d-none');
}
function updateData()
{
    var userSiteData = {
        name: userSiteName.value ,
        url : userSiteUrl.value ,
    }
    dataContainer.splice(indexUpdate , 1 , userSiteData )
    localStorage.setItem('userSiteData' , JSON.stringify(dataContainer))
    clearData ();
    displayData ();

}
function clearData ()
{
    userSiteName.value = ''
    userSiteUrl.value = ''
    addButton.classList.remove('d-none');
    updateButton.classList.add('d-none');
}
function searchData ()
{
    var term = searchButtton.value;
    var cartona =''
    for( var i = 0 ; i < dataContainer.length  ; i++ )
        {
            if (dataContainer[i].name.toLowerCase().includes(term.toLowerCase()))
            {
                cartona += 
            `
            <tr>
                <td>${i+1}</td>
                <td>${dataContainer[i].name}</td>
                <td>${dataContainer[i].url}</td>
                <td><button onclick="window.open('${dataContainer[i].url}' , '_blank')" class="btn  btn-success  text-white">Visit</button></td>
                <td><button onclick=" setData(${i})" class="btn btn-warning  text-white">Update</button></td>
                <td><button onclick="deleteSite(${i})" class="btn bg-danger text-white">Delete</button></td>
                </tr>
            `
            }
            
        }
        document.getElementById('tbody').innerHTML = cartona ;
        
}
function validationName ()
{
    regexName = /^[A-z][a-z]{2,12}$/
    if ( regexName.test(userSiteName.value) == true)
    {
        userSiteName.classList.add('is-valid')
        userSiteName.classList.remove('is-invalid')
        return true ;
    }
    else
    {
        userSiteName.classList.add('is-invalid')
        userSiteName.classList.remove('is-valid')
        return false ;
    }
}
function validationUrl ()
{
    var Massege = document.getElementById('validMassege')
    regexUrl = /^(https?:\/\/)?(w{3}\.)?[\w\d]*\.([a-zA-Z]*\.)?([a-zA-Z]*)\/?$$/
    if ( regexUrl.test(userSiteUrl.value) == true)
    {
        userSiteUrl.classList.add('is-valid')
        userSiteUrl.classList.remove('is-invalid')
        return true ;
    }
    else
    {
        userSiteUrl.classList.add('is-invalid')
        userSiteUrl.classList.remove('is-valid')
        Massege.classList.remove('d-non')
        return false ;
        
    }
}