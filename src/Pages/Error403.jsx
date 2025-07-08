import Error from "../components/Error";

export default function Error403(){
    return(
        <div>
          <Error jenis="Error 403 Forbidden" jenis2="403"
          deskripsi="Kamu tidak memiliki izin untuk mengakses halaman ini" 
          gambar="img/403.png"/>
        </div>
    )
}