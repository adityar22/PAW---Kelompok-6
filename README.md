<h1 align="center">
  📝 T'Man - Task Management System
</h1>
<p align="center">Web App using Express + MongoDB | Pengembangan Aplikasi Web</p>

## ❓ Tentang Aplikasi
Aplikasi ini merupakan aplikasi berbasis web yang membantu pengguna dalam mengelola task berdasarkan skala prioritas dan deadline. Fitur utama dalam aplikasi ini yaitu adalah CRUD
- C (Create) -> Membuat task User yang terdiri dari Nama task, Deskripsi task, Deadline, dan Prioritas
- R (Read)   -> Menampilkan daftar task User yang sudah ditambahkan
- U (Update) -> Memperbarui task User yang dipilih
- D (Delete) -> Menghapus task User yang dipilih

## Halaman dan Fitur
- (Login dan Sign Up)<br>
Untuk dapat menggunakan aplikasi ini, pengguna diharuskan membuat akun terlebih dahulu, untuk selanjutnya dapat login menggunakan akun tersebut.<br>
- (Manage Tasks)<br>
Pada halaman ini, user dapat mengelola task yg berisikan judul, deskripsi, deadline, prioritas, dan status. Selain itu, halaman ini juga memiliki beberapa fitur tambahan seperti searching, pagination, dan sorting.<br>
- (Manage Notes)<br>
Halaman notes untuk mengelola catatan. Berisi judul, konten, dan tag. Terdapat fitur filtering / searching.<br>
- (Manage User Profile)<br>
Halaman account yang berisikan informasi profile user yang terhubung dengan akun saat login.<br>

## 👥 Anggota Kelompok 6 
- [Aditya Ramadhan (20/460535/TK/51124)](https://www.github.com/adityar22)
- [Fachrizal Bayu Nugroho (19/446775/TK/49880)](https://github.com/fachrizalbayunugroho)
- [Richard Harryson (20/456378/TK/50508)](https://www.github.com/RichardC0de)
- [Rizky Intan Nurlita (20/456379/TK/50509)](https://www.github.com/rizkyintan)
- [Saddan Syah Akbar (20/460566/TK/51155)](https://www.github.com/saddansyah)

## 💾 Documentation
- [Presentation Slide - T'Man (Task Management System)](https://www.canva.com/design/DAFSMW6FTNQ/1u5KgZ6RQxInhRnGJ9Pazw/view?utm_content=DAFSMW6FTNQ&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)

## Setting Up Project
- Install required dependencies:

```````````
npm install
```````````

- Run the program:

```````````
npm start
```````````

## Folder Structure (frontend)
``````````
- public               # bisa diakses public
- src
  - index.js           # react bootstrapper
  - App.js             # routing pages
  - asset              # asset non-public (gambar, font, dll)
  - components
    - elements         # component element satuan
    - layouts          # component layout
    - templates        # component template yang dapat digunakan berulang kali
  - contexts
  - hooks              # react hook
  - pages              # halaman - halaman
``````````
