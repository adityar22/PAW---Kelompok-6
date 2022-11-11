const menu = document.getElementById('menuside');
const sidebar = document.getElementsByClassName('sidebar')[0];
const mainsite = document.getElementsByClassName('main-site')[0];

const btnCal = document.getElementById('btnCal');
const calview = document.getElementsByClassName('task-cal')[0];

const btnList = document.getElementById('btnList');
const listview = document.getElementsByClassName('task-list')[0];

menu.addEventListener('click', function(){
    sidebar.classList.toggle('hide');
    mainsite.classList.toggle('hide');
})

btnCal.addEventListener('click', function(){
    listview.classList.toggle('hidden');
    calview.classList.toggle('hidden');
    btnCal.classList.toggle('hidden');
    btnList.classList.toggle('hidden');
})

btnList.addEventListener('click', function(){
    listview.classList.toggle('hidden');
    calview.classList.toggle('hidden'); 
    btnCal.classList.toggle('hidden');
    btnList.classList.toggle('hidden');  
})