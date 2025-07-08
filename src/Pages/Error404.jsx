import Error from "../components/Error";

export default function Error404() {
  return(
          <div>
            <Error jenis="Error 404 Not Found" jenis2="404"
            deskripsi="Halaman yang kamu cari tidak ditemukan. Mungkin URL-nya salah atau sudah tidak tersedia" 
            gambar="img/404.png"/>
          </div>
      )
  
}
