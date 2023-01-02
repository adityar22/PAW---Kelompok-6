<h1 align="center">
  📝 T'Man - Task Management System
</h1>
<p align="center">Web App using MERN + Tailwind CSS tech stack | Pengembangan Aplikasi Web</p>

## 📃Table of Contents
- Tentang Aplikasi
- Halaman dan Fitur
- Anggota Kelompok 6
- Documentation 
- Setting Up Project
- Folder Structure


## ❓ Tentang Aplikasi
T'Man adalah aplikasi berbasis web yang membantu pengguna dalam mengelola task berdasarkan skala prioritas dan deadline. Selain itu, T'Man juga membantu pengguna untuk mencatat segala hal melalui fitur quick notesnya.

## ✅ Halaman dan Fitur
- ### Login dan Sign Up<br>
Untuk dapat menggunakan aplikasi ini, pengguna diharuskan membuat akun terlebih dahulu, untuk selanjutnya dapat login menggunakan akun tersebut.<br>
- ### Manage Tasks<br>
Pada halaman ini, user dapat mengelola task yg berisikan judul, deskripsi, deadline, prioritas, dan status. Selain itu, halaman ini juga memiliki beberapa fitur tambahan seperti searching, pagination, dan sorting.<br>
- ### Manage Notes<br>
Halaman notes untuk mengelola catatan. Berisi judul, konten, dan tag. Terdapat fitur filtering / searching.<br>
- ### Manage User Profile<br>
Halaman account yang berisikan informasi profile user yang terhubung dengan akun saat login.<br>
- ### Calendar Task View<br>
Terdapat calendar view untuk melihat tugas-tugas pada hari yang bersangkutan.<br>
- ### Pomodoro (additional coming soon 🚧)
- ### Announce Under Maintenance Page (coming soon)

## 👥 Anggota Kelompok 6
- [Aditya Ramadhan (20/460535/TK/51124)](https://www.github.com/adityar22)
- [Fachrizal Bayu Nugroho (19/446775/TK/49880)](https://github.com/fachrizalbayunugroho)
- [Richard Harryson (20/456378/TK/50508)](https://www.github.com/RichardC0de)
- [Rizky Intan Nurlita (20/456379/TK/50509)](https://www.github.com/rizkyintan)
- [Saddan Syah Akbar (20/460566/TK/51155)](https://www.github.com/saddansyah)

## 💾 Documentation
- [Presentation Slide - T'Man (Task Management System)](https://www.canva.com/design/DAFSMW6FTNQ/1u5KgZ6RQxInhRnGJ9Pazw/view?utm_content=DAFSMW6FTNQ&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)
- [UI Wireframe](https://www.figma.com/file/p4vjT4oBKqxJkXcNWI9Z7r/PAW-6-UI%2FUX?node-id=0%3A1)
- [Postman API Documentation](https://documenter.getpostman.com/view/24472733/2s8YzRz3jc)

<hr/>

## ⚙ Setting Up Project
### Backend (has built-in frontend)
- Install required dependencies:
```````````
npm install
```````````
- Run the program:
```````````
npm start
```````````
### Frontend
- Go to frontend directory:
``````````
cd frontend
``````````
- Install required dependencies:
```````````
npm install
```````````
- Run the program:
```````````
npm start
```````````
- Build to static files:
``````````
npm build
``````````

## 📁 Folder Structure
```
- frontend             # frontend folder
- server
  - controller         # all server-side logic and backend services
  - database           # mongooso to mongodb connection 
  - helper             # helpers functions
  - middleware         # express middleware function
  - model              # non-relational database schema for mongodb
  - routes             # endpoints of the controllers
- index.js             # server initialization
- config.env           # environment variables
- package.json         # dependency and npm scripts
```
### Folder Structure (frontend)
``````````
- public               # bisa diakses public
- src
  - index.js           # react bootstrapper
  - App.js             # routing pages
  - asset              # asset non-public (gambar, font, dll)
  - components
    - calendar         # calendar view
    - events           # for managing events
    - notes            # for taking notes
    - public           # additional features
    - tasks            # for managing tasks
  - contexts           # react context + reducer
  - hooks              # react hook 
  - pages              # halaman - halaman
``````````
## 📍 API Routes
Base URL:
```
tman-app.vercel.app
```
Endpoints:
```
/api/tasks             # API for task (login token required)
/api/notes             # API for notes (login token required)
/api/user              # API for users 
  /login               # API for login (POST)
  /signup              # API for signup (POST)
  /profile             # API to get and update user profile (GET, PUT)
```
<br>
