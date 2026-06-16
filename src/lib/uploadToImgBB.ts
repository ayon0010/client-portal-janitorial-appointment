export async function uploadToImageBB(file: File) {

    console.log(file, 'file');

    const formData = new FormData();
    formData.append("image", file);

    console.log(formData);


    const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await response.json();

    if (!data.success) {
        throw new Error(data.error?.message);
    }

    return data.data.url;
}