export const formatDateTime = (dateString : any) => {
    const date = new Date(dateString);

    // Daftar bulan dalam bahasa Indonesia
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Format tanggal
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Format waktu
    // const hours = String(date.getHours()).padStart(2, "0");
    // const minutes = String(date.getMinutes()).padStart(2, "0");
    // const seconds = String(date.getSeconds()).padStart(2, "0");

    // Gabungkan menjadi format yang diinginkan
    return `${day} ${month} ${year}`;
};

export const formatDateString = (dateString : any) => {
    const date = new Date(dateString);

    // Daftar bulan dalam bahasa Indonesia
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Format tanggal
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Gabungkan menjadi format yang diinginkan
    return `${day} ${month} ${year} `;
};