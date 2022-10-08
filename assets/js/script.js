const menu = document.getElementById('menuside');
const sidebar = document.getElementsByClassName('sidebar')[0];

const btnCal = document.getElementById('btnCal');
const calview = document.getElementsByClassName('task-cal')[0];

const btnList = document.getElementById('btnList');
const listview = document.getElementsByClassName('task-list')[0];

menu.addEventListener('click', function(){
    sidebar.classList.toggle('hide');  
})

btnCal.addEventListener('click', function(){
    listview.classList.toggle('hide');
    calview.classList.toggle('hide');  
})

btnList.addEventListener('click', function(){
    listview.classList.toggle('hide');
    calview.classList.toggle('hide');   
})